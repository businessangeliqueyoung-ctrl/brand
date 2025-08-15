import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const sections = pgTable("sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  phase: integer("phase").notNull(),
  promptCount: integer("prompt_count").notNull(),
  insights: text("insights").array(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const prompts = pgTable("prompts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sectionId: varchar("section_id").notNull().references(() => sections.id),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // 'text', 'textarea', 'select', 'range', 'checkbox'
  required: boolean("required").default(false),
  options: text("options").array(), // for select type
  placeholder: text("placeholder"),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  sectionId: varchar("section_id").notNull().references(() => sections.id),
  completedPrompts: integer("completed_prompts").default(0),
  totalPrompts: integer("total_prompts").notNull(),
  responses: jsonb("responses"), // Store all prompt responses
  isCompleted: boolean("is_completed").default(false),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSectionSchema = createInsertSchema(sections).omit({
  id: true,
  createdAt: true,
});

export const insertPromptSchema = createInsertSchema(prompts).omit({
  id: true,
  createdAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastUpdated: true,
});

export const updateUserProgressSchema = insertUserProgressSchema.extend({
  responses: z.record(z.any()).optional(),
  completedPrompts: z.number().optional(),
  isCompleted: z.boolean().optional(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSection = z.infer<typeof insertSectionSchema>;
export type Section = typeof sections.$inferSelect;

export type InsertPrompt = z.infer<typeof insertPromptSchema>;
export type Prompt = typeof prompts.$inferSelect;

export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
