# Employee Directory Application

## Overview

This is a full-stack web application built with React and Express that showcases performance optimization techniques for multi-API data aggregation. The app demonstrates an employee directory with real-time search, filtering, and performance monitoring capabilities. It integrates multiple external APIs (Twitter, IMDB, Wikipedia) to enrich employee profiles while maintaining optimal loading times and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application uses React with TypeScript, built on Vite for fast development and optimized builds. The UI framework is based on shadcn/ui components with Radix UI primitives, providing accessible and customizable components. The application implements React Query (TanStack Query) for efficient data fetching, caching, and synchronization with automatic retry logic and stale-time management.

Key architectural patterns include:
- **Component-based architecture** with reusable UI components
- **Custom hooks** for data fetching and business logic separation
- **Error boundaries** and suspense for graceful error handling and loading states
- **Debounced search** to optimize API calls during user input
- **Skeleton loading states** for improved perceived performance

### Backend Architecture
The server is built with Express.js and TypeScript, using ES modules for modern JavaScript features. The API follows RESTful conventions with comprehensive error handling middleware and request logging. The storage layer uses an in-memory implementation with a well-defined interface, allowing for easy migration to persistent databases.

Core backend features:
- **RESTful API design** with proper HTTP status codes and error responses
- **Request/response logging** with performance timing
- **Data validation** using Zod schemas
- **CORS handling** and security middleware
- **Environment-based configuration** for development and production

### Data Storage Solutions
Currently implements an in-memory storage system using Map data structures for fast lookups and operations. The storage interface is abstracted to support future migration to PostgreSQL with Drizzle ORM. The schema is defined with proper TypeScript types and Zod validation schemas for runtime type safety.

Database design includes:
- **Employee entities** with comprehensive profile information
- **API metrics tracking** for performance monitoring
- **Normalized API source status** tracking (success/error/timeout states)
- **Prepared schema** for PostgreSQL migration with Drizzle ORM

### Authentication and Authorization
The current implementation does not include authentication mechanisms, focusing instead on performance optimization and API aggregation techniques. The architecture is prepared for future authentication integration through middleware patterns.

## External Dependencies

### UI Framework
- **Radix UI** - Accessible component primitives for complex UI patterns
- **shadcn/ui** - Pre-built component library with consistent design system
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Lucide React** - Icon library with consistent styling

### State Management and Data Fetching
- **TanStack React Query** - Server state management with caching and synchronization
- **React Hook Form** - Form state management with validation
- **Wouter** - Lightweight routing solution for single-page navigation

### Development Tools
- **Vite** - Fast build tool with hot module replacement
- **TypeScript** - Type safety and enhanced developer experience
- **ESBuild** - Fast JavaScript bundler for production builds
- **Drizzle Kit** - Database migration and schema management tools

### Database and ORM
- **Drizzle ORM** - Type-safe SQL query builder and ORM
- **@neondatabase/serverless** - Serverless PostgreSQL driver for Neon
- **Drizzle Zod** - Runtime validation integration with database schemas

### External API Integration
The application is designed to integrate with multiple external APIs:
- **Twitter API** - Social media profile enrichment
- **IMDB API** - Entertainment industry profile data
- **Wikipedia API** - Biographical and professional information

### Performance Monitoring
- **Custom metrics tracking** for Time to Interactive (TTI) measurements
- **API response time monitoring** across multiple data sources
- **Search performance optimization** with debouncing and caching strategies