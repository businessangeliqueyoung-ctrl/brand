import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProgressSchema, updateUserProgressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all sections
  app.get("/api/sections", async (req, res) => {
    try {
      const sections = await storage.getAllSections();
      res.json(sections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sections" });
    }
  });

  // Get section by slug
  app.get("/api/sections/:slug", async (req, res) => {
    try {
      const section = await storage.getSectionBySlug(req.params.slug);
      if (!section) {
        return res.status(404).json({ message: "Section not found" });
      }
      res.json(section);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch section" });
    }
  });

  // Get prompts for a section
  app.get("/api/sections/:sectionId/prompts", async (req, res) => {
    try {
      const prompts = await storage.getPromptsBySection(req.params.sectionId);
      res.json(prompts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch prompts" });
    }
  });

  // Get user progress
  app.get("/api/users/:userId/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Get user progress for specific section
  app.get("/api/users/:userId/progress/:sectionId", async (req, res) => {
    try {
      const progress = await storage.getUserProgressForSection(
        req.params.userId,
        req.params.sectionId
      );
      if (!progress) {
        return res.status(404).json({ message: "Progress not found" });
      }
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // Create user progress
  app.post("/api/users/:userId/progress", async (req, res) => {
    try {
      const validatedData = insertUserProgressSchema.parse({
        ...req.body,
        userId: req.params.userId
      });
      const progress = await storage.createUserProgress(validatedData);
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create progress" });
    }
  });

  // Update user progress
  app.patch("/api/users/:userId/progress/:sectionId", async (req, res) => {
    try {
      const validatedData = updateUserProgressSchema.parse(req.body);
      const progress = await storage.updateUserProgress(
        req.params.userId,
        req.params.sectionId,
        validatedData
      );
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
