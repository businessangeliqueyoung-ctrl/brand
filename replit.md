# Digital Branding Blueprint Application

## Overview

This is a comprehensive digital branding blueprint application built as a full-stack web platform. The application guides users through seven structured phases of brand development, providing strategic prompts, progress tracking, and PDF generation capabilities. It's designed to help entrepreneurs and business owners transform their vision into a magnetic digital presence through a systematic, phase-by-phase approach.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React SPA**: Built with React 18+ using TypeScript and Vite for fast development and building
- **Routing**: Client-side routing implemented with Wouter for lightweight navigation
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Custom design system built on Radix UI primitives with Tailwind CSS for styling
- **Component Architecture**: Modular component structure with reusable UI components in `/components/ui/`
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring a neon/cyberpunk aesthetic with dark navy backgrounds

### Backend Architecture
- **Express Server**: RESTful API server with TypeScript support
- **Development Setup**: Hot module replacement with Vite integration for seamless full-stack development
- **API Structure**: Clean separation between routes, storage layer, and business logic
- **Storage Abstraction**: Interface-based storage system with in-memory implementation for development
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes

### Data Storage Solutions
- **Database ORM**: Drizzle ORM with PostgreSQL as the target database
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts` with Zod validation
- **Data Models**: Four main entities - Users, Sections, Prompts, and UserProgress
- **Migration Support**: Drizzle Kit for database migrations and schema changes
- **Development Storage**: Memory-based storage implementation with seeded data for development

### Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **User Management**: Basic user authentication with username/password system
- **Progress Tracking**: User-specific progress tracking across sections and prompts

### External Dependencies
- **Database**: Neon serverless PostgreSQL for production deployment
- **PDF Generation**: jsPDF for client-side PDF generation of section reports
- **UI Components**: Extensive Radix UI component library for accessibility
- **Development Tools**: 
  - Replit integration with development banner and error overlay
  - TypeScript for type safety across the full stack
  - ESLint and Prettier for code quality (configured via components.json)

### Key Features
- **Seven-Phase System**: Structured brand development through sequential phases
- **Dynamic Prompts**: Customizable prompt system with various input types (text, textarea, select, range, checkbox)
- **Progress Visualization**: Real-time progress tracking with architectural-themed indicators
- **PDF Exports**: Generate comprehensive reports based on user responses
- **Responsive Design**: Mobile-first approach with full responsive capabilities
- **Real-time Sync**: Progress automatically saves and syncs across sessions

The application follows a modern full-stack architecture with clear separation of concerns, type safety throughout, and a focus on user experience with comprehensive branding tools and progress tracking capabilities.