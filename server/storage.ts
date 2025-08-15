import { type User, type InsertUser, type Section, type InsertSection, type Prompt, type InsertPrompt, type UserProgress, type InsertUserProgress } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Section methods
  getAllSections(): Promise<Section[]>;
  getSection(id: string): Promise<Section | undefined>;
  getSectionBySlug(slug: string): Promise<Section | undefined>;
  createSection(section: InsertSection): Promise<Section>;
  
  // Prompt methods
  getPromptsBySection(sectionId: string): Promise<Prompt[]>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
  
  // Progress methods
  getUserProgress(userId: string): Promise<UserProgress[]>;
  getUserProgressForSection(userId: string, sectionId: string): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(userId: string, sectionId: string, updates: Partial<UserProgress>): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private sections: Map<string, Section>;
  private prompts: Map<string, Prompt>;
  private userProgress: Map<string, UserProgress>;

  constructor() {
    this.users = new Map();
    this.sections = new Map();
    this.prompts = new Map();
    this.userProgress = new Map();
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize the 7 core sections
    const sectionsData = [
      {
        title: "Unblock Your Personal Power",
        slug: "personal-power",
        description: "Transform limiting beliefs and unlock your entrepreneurial potential. Build the mindset foundation for brand success.",
        icon: "fas fa-unlock-alt",
        color: "#ff0095",
        phase: 1,
        promptCount: 15,
        insights: [
          "Before your brand gets dressed, designed, or developed, it needs a why so strong it shakes you awake.",
          "Write a manifesto that gives you goosebumps. That's the kind of energy your brand needs."
        ]
      },
      {
        title: "Unpack Your Big Idea", 
        slug: "big-idea",
        description: "It all starts with a big idea. Not a logo. Not a product. A pulse. Discover your why that shakes you awake.",
        icon: "fas fa-lightbulb",
        color: "#00b4d8",
        phase: 2,
        promptCount: 12,
        insights: [
          "This isn't about what you do. It's about the ripple effect of doing it.",
          "If you don't feel what you stand for, no one else will."
        ]
      },
      {
        title: "Unearth Market Trends",
        slug: "market-trends", 
        description: "Spot the trends before they hit. If you're chasing trends, you're already behind. See what's coming with real data.",
        icon: "fas fa-chart-line",
        color: "#007acc",
        phase: 3,
        promptCount: 18,
        insights: [
          "If you see the wave, you're already late.",
          "Use tools like Glimpse or Exploding Topics to surf the trend before it becomes a tidal wave."
        ]
      },
      {
        title: "Unlock Competitor Secrets",
        slug: "competitor-secrets",
        description: "Become the magician. You don't need to blend in. You need to break the mold. Find your edge and make it sharp.",
        icon: "fas fa-search",
        color: "#a855f7",
        phase: 4,
        promptCount: 14,
        insights: [
          "You don't copy the spell—you become the magician.",
          "Build a swipe file that's equal parts goldmine and battle plan."
        ]
      },
      {
        title: "Uncover Your Audience",
        slug: "audience",
        description: "Speak to the one. You're not for everyone—and that's your superpower. Get uncomfortably specific about your dream clients.",
        icon: "fas fa-users",
        color: "#10b981",
        phase: 5,
        promptCount: 16,
        insights: [
          "Your dream clients aren't everyone—they're someone.",
          "Write copy like you're whispering their secret thoughts back to them."
        ]
      },
      {
        title: "Unveil Your New Brand",
        slug: "new-brand", 
        description: "Dress the part. Your visuals are your brand's outfit—every pixel, palette, and photo tells a story. Look unforgettable.",
        icon: "fas fa-palette",
        color: "#f59e0b",
        phase: 6,
        promptCount: 22,
        insights: [
          "Looking 'professional' isn't enough. You've got to look unforgettable.",
          "Create a mood board that feels like your brand just walked into the room with purpose."
        ]
      },
      {
        title: "Flawlessly Execute to Win",
        slug: "execute",
        description: "Cast systems that scale. Systems are spells you cast once but feel forever. Make your brand work while you rest.",
        icon: "fas fa-rocket",
        color: "#ef4444",
        phase: 7,
        promptCount: 20,
        insights: [
          "Consistency isn't boring when it's beautiful and scalable.",
          "Build once, launch everywhere, and let your brand work while you rest."
        ]
      }
    ];

    sectionsData.forEach(sectionData => {
      const section: Section = {
        id: randomUUID(),
        ...sectionData,
        insights: sectionData.insights || null,
        createdAt: new Date()
      };
      this.sections.set(section.id, section);
      
      // Add sample prompts for each section
      this.addSamplePrompts(section.id, section.slug);
    });
  }

  private addSamplePrompts(sectionId: string, sectionSlug: string) {
    const promptsMap = {
      'personal-power': [
        {
          title: "Mindset Foundation Assessment",
          description: "Identify and overcome the mental barriers holding you back from building a powerful brand.",
          type: "textarea",
          required: true,
          placeholder: "What limiting beliefs about success, visibility, or worthiness are currently holding you back?",
          order: 1
        },
        {
          title: "Vision Clarity Check", 
          description: "Define the crystal-clear vision that will drive your brand forward.",
          type: "textarea",
          required: true,
          placeholder: "Describe your ideal business and life 3 years from now in vivid detail...",
          order: 2
        },
        {
          title: "Success Mindset Rating",
          description: "Rate your current confidence in achieving your business vision.",
          type: "range",
          required: true,
          placeholder: "Rate from 1-10",
          order: 3
        }
      ],
      'big-idea': [
        {
          title: "Core Purpose Discovery",
          description: "Uncover the deeper 'why' that will magnetize your audience.",
          type: "textarea", 
          required: true,
          placeholder: "What problem in the world keeps you awake at night wanting to solve it?",
          order: 1
        },
        {
          title: "Impact Vision Statement",
          description: "Define the ripple effect your business will create.",
          type: "textarea",
          required: true, 
          placeholder: "Complete this: 'Because of my work, people will...'",
          order: 2
        },
        {
          title: "Passion Sustainability Test",
          description: "Assess your long-term commitment to this vision.",
          type: "select",
          required: true,
          options: ["Still passionate after 10 years", "Passionate for 5-7 years", "Passionate for 2-3 years", "Uncertain about longevity"],
          order: 3
        }
      ],
      'market-trends': [
        {
          title: "Industry Evolution Analysis",
          description: "Map out where your industry is heading in the next 2-3 years.",
          type: "textarea",
          required: true,
          placeholder: "What major shifts do you see coming in your industry?",
          order: 1
        },
        {
          title: "Opportunity Gap Identification", 
          description: "Spot the white space your brand can dominate.",
          type: "textarea",
          required: true,
          placeholder: "What gaps or unmet needs do you notice in your market?",
          order: 2
        },
        {
          title: "First-Mover Advantage Assessment",
          description: "Evaluate your timing advantage in the market.",
          type: "select",
          required: true,
          options: ["Completely new space", "Early adopter advantage", "Proven market with my twist", "Saturated but differentiated"],
          order: 3
        }
      ],
      'competitor-secrets': [
        {
          title: "Competitor Intelligence Audit",
          description: "Analyze what your top 3 competitors are doing right and wrong.",
          type: "textarea",
          required: true,
          placeholder: "List your top 3 competitors and their biggest strengths/weaknesses...",
          order: 1
        },
        {
          title: "Differentiation Strategy",
          description: "Define how you'll stand apart from the competition.", 
          type: "textarea",
          required: true,
          placeholder: "What unique angle will make you the obvious choice over competitors?",
          order: 2
        },
        {
          title: "Market Position Statement",
          description: "Craft your distinctive market positioning.",
          type: "textarea",
          required: true,
          placeholder: "Complete: 'Unlike [competitors], we are the only [category] that [unique benefit]'",
          order: 3
        }
      ],
      'audience': [
        {
          title: "Ideal Client Deep Dive",
          description: "Get uncomfortably specific about your dream client.",
          type: "textarea",
          required: true,
          placeholder: "Describe your ideal client's demographics, psychographics, and daily challenges...",
          order: 1
        },
        {
          title: "Pain Point Mapping",
          description: "Identify the exact frustrations your audience faces.",
          type: "textarea", 
          required: true,
          placeholder: "What keeps your ideal client awake at 3am worrying?",
          order: 2
        },
        {
          title: "Dream Outcome Definition",
          description: "Clarify the transformation your audience craves.",
          type: "textarea",
          required: true,
          placeholder: "What does success look like for your ideal client 1 year after working with you?",
          order: 3
        }
      ],
      'new-brand': [
        {
          title: "Brand Personality Definition",
          description: "Define the human characteristics of your brand.",
          type: "textarea",
          required: true,
          placeholder: "If your brand were a person at a party, how would they act, speak, and dress?",
          order: 1
        },
        {
          title: "Visual Identity Direction",
          description: "Set the visual tone for your brand identity.",
          type: "select",
          required: true,
          options: ["Luxury & Premium", "Modern & Minimalist", "Bold & Energetic", "Warm & Approachable", "Tech & Futuristic"],
          order: 2
        },
        {
          title: "Brand Voice & Tone",
          description: "Establish how your brand communicates.",
          type: "textarea",
          required: true,
          placeholder: "Describe your brand's communication style with 5 specific adjectives and examples...",
          order: 3
        }
      ],
      'execute': [
        {
          title: "Launch Strategy Blueprint",
          description: "Map out your go-to-market strategy.",
          type: "textarea",
          required: true,
          placeholder: "Outline your 90-day launch plan with specific milestones...",
          order: 1
        },
        {
          title: "Systems & Automation Plan",
          description: "Design systems that scale without you.",
          type: "textarea",
          required: true,
          placeholder: "What processes need to be systematized first for maximum impact?",
          order: 2
        },
        {
          title: "Success Metrics Definition",
          description: "Define how you'll measure brand success.",
          type: "textarea",
          required: true,
          placeholder: "What 3-5 key metrics will indicate your brand strategy is working?",
          order: 3
        }
      ]
    };

    const sectionPrompts = promptsMap[sectionSlug as keyof typeof promptsMap] || [];
    
    sectionPrompts.forEach(promptData => {
      const prompt: Prompt = {
        id: randomUUID(),
        sectionId,
        ...promptData,
        description: promptData.description || null,
        options: promptData.options || null,
        placeholder: promptData.placeholder || null,
        required: promptData.required || false,
        createdAt: new Date()
      };
      this.prompts.set(prompt.id, prompt);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Section methods
  async getAllSections(): Promise<Section[]> {
    return Array.from(this.sections.values()).sort((a, b) => a.phase - b.phase);
  }

  async getSection(id: string): Promise<Section | undefined> {
    return this.sections.get(id);
  }

  async getSectionBySlug(slug: string): Promise<Section | undefined> {
    return Array.from(this.sections.values()).find(section => section.slug === slug);
  }

  async createSection(insertSection: InsertSection): Promise<Section> {
    const id = randomUUID();
    const section: Section = { 
      ...insertSection, 
      id, 
      createdAt: new Date() 
    };
    this.sections.set(id, section);
    return section;
  }

  // Prompt methods
  async getPromptsBySection(sectionId: string): Promise<Prompt[]> {
    return Array.from(this.prompts.values())
      .filter(prompt => prompt.sectionId === sectionId)
      .sort((a, b) => a.order - b.order);
  }

  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const id = randomUUID();
    const prompt: Prompt = { 
      ...insertPrompt, 
      id,
      description: insertPrompt.description || null,
      options: insertPrompt.options || null,
      placeholder: insertPrompt.placeholder || null,
      required: insertPrompt.required || false,
      createdAt: new Date() 
    };
    this.prompts.set(id, prompt);
    return prompt;
  }

  // Progress methods
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values())
      .filter(progress => progress.userId === userId);
  }

  async getUserProgressForSection(userId: string, sectionId: string): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values())
      .find(progress => progress.userId === userId && progress.sectionId === sectionId);
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = randomUUID();
    const progress: UserProgress = { 
      ...insertProgress, 
      id,
      completedPrompts: insertProgress.completedPrompts || 0,
      responses: insertProgress.responses || null,
      isCompleted: insertProgress.isCompleted || false,
      lastUpdated: new Date() 
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(userId: string, sectionId: string, updates: Partial<UserProgress>): Promise<UserProgress> {
    const existing = await this.getUserProgressForSection(userId, sectionId);
    if (!existing) {
      throw new Error('Progress not found');
    }
    
    const updated: UserProgress = {
      ...existing,
      ...updates,
      lastUpdated: new Date()
    };
    
    this.userProgress.set(existing.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
