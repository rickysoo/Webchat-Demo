# AI Chatbot Application

## Overview

This is a full-stack AI chatbot application built with a React frontend and Express.js backend. The application features an embeddable chatbot widget that can be integrated into any website, with real-time chat functionality and a professional UI built using shadcn/ui components.

## System Architecture

The application follows a client-server architecture with clear separation of concerns:

**Monorepo Structure:**
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Shared TypeScript schemas and types
- Database configuration with Drizzle ORM

**Technology Stack:**
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Replit with autoscale deployment target

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui components for consistent design system
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite with React plugin and runtime error overlay

### Backend Architecture
- **API Framework**: Express.js with TypeScript
- **Request Validation**: Zod schemas for type-safe validation
- **Rate Limiting**: In-memory rate limiting (20 requests per minute per IP)
- **Database ORM**: Drizzle with PostgreSQL dialect
- **Session Management**: Simple in-memory storage with interface for future database integration

### Database Schema
The application uses three main entities:
- **Users**: Basic user authentication (id, username, password)
- **Chat Sessions**: Unique chat sessions with timestamps
- **Chat Messages**: Individual messages with role (user/assistant) and content

## Data Flow

1. **Chat Initialization**: Frontend generates unique session ID on component mount
2. **Message Flow**: User messages are sent to `/api/chat` endpoint with conversation history
3. **AI Processing**: Backend processes messages and integrates with AI service
4. **Response Handling**: Assistant responses are stored and returned to frontend
5. **State Management**: React Query handles caching and synchronization
6. **Persistence**: All chat data is stored in PostgreSQL via Drizzle ORM

## External Dependencies

### Production Dependencies
- **UI Components**: Extensive Radix UI primitives (@radix-ui/react-*)
- **Database**: Neon serverless PostgreSQL (@neondatabase/serverless)
- **Forms**: React Hook Form with Hookform resolvers
- **Date Handling**: date-fns for date utilities
- **Utilities**: clsx, class-variance-authority for styling utilities

### Development Tools
- **Build**: Vite with ESBuild for production builds
- **Database Migrations**: Drizzle Kit for schema management
- **Type Safety**: TypeScript with strict configuration

## Deployment Strategy

**Environment Configuration:**
- Node.js 20 runtime
- PostgreSQL 16 database
- Port 5000 for local development, port 80 for external access

**Build Process:**
1. Frontend: Vite builds React app to `dist/public`
2. Backend: ESBuild bundles server code to `dist/index.js`
3. Deployment: Replit autoscale with npm scripts

**Scripts:**
- `npm run dev` - Development with tsx server
- `npm run build` - Production build (frontend + backend)
- `npm run start` - Production server
- `npm run db:push` - Database schema deployment

**Features:**
- Hot module replacement in development
- Automatic dependency installation
- Environment variable management through Replit secrets

## Recent Changes

- June 16, 2025: Initial setup with React frontend and Express backend
- June 16, 2025: Added OpenAI GPT-4o-mini integration with rate limiting and validation
- June 16, 2025: Created minimal embeddable chatbot widget (/embed.js)
- June 16, 2025: Added external integration demo page (/demo)
- June 16, 2025: Implemented single-line website integration capability

## Deployment Features

**Embeddable Widget:**
- Single script tag integration: `<script src="your-domain.com/embed.js"></script>`
- Self-contained JavaScript with no external dependencies
- Configurable positioning, colors, and styling
- Mobile responsive design
- Professional UI with animations

**API Endpoints:**
- `/api/chat` - OpenAI chat completions with session management
- `/api/health` - Health check endpoint
- `/embed.js` - Embeddable widget script
- `/demo` - External integration demonstration

**Security Features:**
- Rate limiting (20 requests per minute per IP)
- Input validation and sanitization (500 char limit)
- Message history truncation (last 10 messages)
- Error handling with user-friendly messages

## User Preferences

Preferred communication style: Simple, everyday language.