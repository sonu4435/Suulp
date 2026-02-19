# Suulp Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser / Client                      │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┴────────────┐
         │                        │
    ┌────▼────────────────────────▼─────┐
    │     Next.js Frontend (App Router)   │
    │ ─────────────────────────────────  │
    │ • Page Components                   │
    │ • Animations (Framer/GSAP)         │
    │ • Client Components                 │
    │ • Navigation & Forms                │
    └────┬────────────────────────────┬──┘
         │                            │
    ┌────▼─────────────┐     ┌───────▼────────────┐
    │  API Routes      │     │  Static Content    │
    │  ──────────      │     │  ──────────────    │
    │ • Auth endpoints │     │ • Images           │
    │ • Contact form   │     │ • Sitemap          │
    │ • User data      │     │ • Robots.txt       │
    └────┬─────────────┘     └───────┬────────────┘
         │                            │
    ┌────▼────────────────────────────▼──────────────┐
    │      Supabase Backend (PostgreSQL)              │
    │ ──────────────────────────────────────────────  │
    │ • Authentication (Auth Service)                  │
    │ • Database (PostgreSQL)                          │
    │ • Real-time Subscriptions                        │
    │ • Row Level Security (RLS)                       │
    └────┬───────────────────────────────────────────┘
         │
    ┌────▼────────────────┐
    │  Data Storage        │
    │  ────────────────   │
    │ • users table       │
    │ • contact_messages  │
    │ • subscriptions     │
    └─────────────────────┘
```

## Layer Architecture

### Layer 1: Presentation (Frontend)

```
Browser
  ↓
Next.js 16.1 (App Router)
  ├─ Layout (Root)
  │  ├─ Navbar Component
  │  ├─ Page Content
  │  └─ Footer Component
  └─ Routes
     ├─ / (Landing)
     ├─ /about
     ├─ /features
     ├─ /pricing
     ├─ /contact
     ├─ /login
     └─ /signup
```

### Layer 2: Logic (Business)

```
React Components
  ├─ Server Components
  │  ├─ Layout wrapper
  │  └─ Metadata provider
  └─ Client Components
     ├─ Interactive pages
     ├─ Form components
     └─ Animation components
```

### Layer 3: Data (Backend)

```
Supabase
  ├─ Authentication
  │  └─ Email/Password auth
  ├─ Database
  │  ├─ users
  │  ├─ contact_messages
  │  └─ hotel_subscriptions
  └─ Realtime
     └─ Subscription updates
```

## Component Hierarchy

```
<RootLayout>
  ├─ <head> (Metadata)
  ├─ <Navbar />
  │  ├─ Logo
  │  ├─ Navigation Links
  │  ├─ Auth Buttons
  │  └─ Mobile Menu
  ├─ <Page Content>
  │  ├─ Hero Section
  │  ├─ Feature Cards
  │  ├─ Image Gallery
  │  ├─ Forms
  │  └─ CTA Buttons
  ├─ <Footer />
  │  ├─ Brand Info
  │  ├─ Links
  │  └─ Social Media
  └─ <Analytics />
```

## Data Flow

### Authentication Flow

```
User Input (Email/Password)
         ↓
    Form Component
         ↓
   Validation (zod)
         ↓
    Supabase Auth
         ↓
    JWT Token
         ↓
    Local Storage / Cookie
         ↓
    useAuth Hook
         ↓
    Navbar Updates
         ↓
    User State
```

### Contact Form Flow

```
User Input
    ↓
Form Validation (zod)
    ↓
API Route (/api/contact)
    ↓
Supabase Insert
    ↓
contact_messages Table
    ↓
Success Message
    ↓
Form Reset
```

### Page Rendering Flow

```
Request
  ↓
Next.js Router
  ↓
Page Component (RSC/Client)
  ↓
Data Fetching (if needed)
  ↓
Component Rendering
  ↓
Hydration
  ↓
Client-side Interactivity
  ↓
HTML to Browser
```

## File Organization

```
suulp/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── sitemap.ts               # SEO sitemap
│   ├── about/
│   │   └── page.tsx
│   ├── features/
│   │   └── page.tsx
│   ├── pricing/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   └── signup/
│       └── page.tsx
│
├── components/                   # Reusable components
│   ├── navbar.tsx               # Navigation
│   └── footer.tsx               # Footer
│
├── hooks/                        # Custom React hooks
│   └── use-auth.ts              # Authentication hook
│
├── lib/                          # Utilities & helpers
│   └── supabase.ts              # Supabase client
│
├── public/                       # Static assets
│   ├── images/                  # Optimized images
│   │   ├── hotel-lobby.jpg
│   │   ├── hotel-room.jpg
│   │   ├── hotel-dashboard.jpg
│   │   ├── hotel-team.jpg
│   │   └── ai-support.jpg
│   └── robots.txt               # SEO
│
├── scripts/                      # Scripts & utilities
│   └── setup-database.sql       # Database schema
│
├── Configuration Files
│   ├── package.json             # Dependencies
│   ├── tsconfig.json            # TypeScript config
│   ├── tailwind.config.ts       # Tailwind config
│   ├── next.config.mjs          # Next.js config
│   ├── .env.example             # Env template
│   └── .env.local               # Your secrets (create)
│
└── Documentation
    ├── README.md                # Project overview
    ├── SETUP_GUIDE.md          # Installation guide
    ├── FEATURES.md             # Feature documentation
    ├── BUILD_SUMMARY.md        # What's included
    ├── QUICKSTART.md           # Quick start guide
    └── ARCHITECTURE.md         # This file
```

## Technology Stack Breakdown

### Frontend
```
Next.js 16.1
├─ React 19 (JSX)
├─ TypeScript 5.7 (Type Safety)
├─ Tailwind CSS 4.0 (Styling)
├─ Framer Motion 12.2 (Animations)
└─ GSAP 3.12.2 (Advanced Animations)
```

### Backend
```
Supabase
├─ PostgreSQL (Database)
├─ Auth Service (JWT)
├─ Realtime Subscriptions
├─ Row Level Security (RLS)
└─ RESTful API
```

### Supporting Libraries
```
react-hook-form 7.53 (Form Management)
zod 3.24 (Validation)
lucide-react 0.460 (Icons)
shadcn/ui (UI Components)
```

### Development Tools
```
Node.js Package Manager
├─ pnpm 8+ (Recommended)
├─ npm 9+
├─ yarn 3+
└─ bun 1+
```

## State Management

### Authentication State
```
Supabase Auth Library
        ↓
    JWT Token
        ↓
    useAuth Hook
        ↓
React Context (Ready)
        ↓
Component State
```

### Form State
```
User Input
    ↓
react-hook-form
    ↓
Form State
    ↓
Validation (zod)
    ↓
Submission State
```

### UI State
```
Mobile Menu Toggle
    ↓
useState
    ↓
Conditional Rendering
    ↓
Framer Motion Animation
```

## Data Models

### User Model
```typescript
type User = {
  id: UUID
  email: string
  full_name: string
  hotel_name: string
  created_at: timestamp
  updated_at: timestamp
}
```

### Contact Message Model
```typescript
type ContactMessage = {
  id: UUID
  name: string
  email: string
  subject: string
  message: string
  status: 'new' | 'read' | 'responded'
  created_at: timestamp
}
```

### Subscription Model
```typescript
type Subscription = {
  id: UUID
  user_id: UUID
  plan: 'starter' | 'professional' | 'enterprise'
  status: 'active' | 'cancelled'
  created_at: timestamp
  updated_at: timestamp
}
```

## API Structure

### Next.js API Routes (Ready)
```
/api
├─ /auth
│  ├─ signup
│  ├─ login
│  ├─ logout
│  └─ session
├─ /contact
│  └─ submit
├─ /user
│  ├─ profile
│  ├─ update
│  └─ subscriptions
└─ /subscriptions
   ├─ create
   ├─ update
   └─ cancel
```

### Supabase Direct (Currently Used)
```
Supabase Auth REST API
Supabase PostgREST API
Supabase Realtime API
```

## Performance Optimization

### Code Splitting
```
Next.js Automatic Route-Based Splitting
├─ Each page → separate bundle
├─ Shared code → extracted
├─ Unused code → removed
└─ Tree shaking enabled
```

### Image Optimization
```
Next.js Image Component
├─ Automatic format selection (AVIF/WebP)
├─ Responsive sizing
├─ Lazy loading
└─ Blur placeholder
```

### CSS Optimization
```
Tailwind CSS 4.0
├─ PurgeCSS removes unused styles
├─ Utility-first → minimal CSS
├─ No CSS-in-JS → faster rendering
└─ JIT compiler → instant updates
```

### JavaScript Optimization
```
React Compiler (Next.js 16)
├─ Automatic memoization
├─ Dead code elimination
├─ Bundle size reduction
└─ Faster re-renders
```

## Security Architecture

### Authentication
```
Email/Password Input
         ↓
    Validation
         ↓
   Supabase Auth
         ↓
  Password Hash (bcrypt)
         ↓
   JWT Token
         ↓
  Secure Storage
```

### Data Protection
```
Database
├─ Row Level Security (RLS)
├─ Parameterized Queries
├─ Input Validation (zod)
└─ Encryption at Rest
```

### Network Security
```
HTTPS/TLS Encryption
    ↓
Security Headers
├─ X-Frame-Options: DENY
├─ X-Content-Type-Options: nosniff
├─ X-XSS-Protection
└─ Referrer-Policy
```

## Deployment Architecture

### Development
```
Local Machine
    ↓
pnpm dev
    ↓
http://localhost:3000
```

### Production (Vercel)
```
GitHub Repo
    ↓
Vercel Build
├─ Install dependencies
├─ Build Next.js
├─ Run tests (optional)
└─ Deploy to Edge
    ↓
suulp.vercel.app
    ↓
CDN Distribution
    ↓
Global Access
```

### Alternative Deployments
```
Docker Container
    ↓
Cloud Platform
├─ AWS EC2
├─ Google Cloud Run
├─ Azure App Service
├─ Railway
├─ Render
└─ Self-Hosted
```

## Scaling Strategy

### Horizontal Scaling
```
Multiple Server Instances
    ↓
Load Balancer
    ↓
Auto-scaling Group
    ↓
Handle Traffic Spikes
```

### Vertical Scaling
```
Upgrade Server Resources
├─ More CPU
├─ More Memory
└─ Faster Storage
```

### Database Scaling
```
Supabase Managed
├─ Read Replicas
├─ Automatic Backups
├─ Point-in-time Recovery
└─ Connection Pooling
```

## Monitoring & Observability

### Error Tracking (Ready for Integration)
```
Browser Console
    ↓
Sentry / LogRocket
    ↓
Error Reports
    ↓
Stack Traces
    ↓
Alerts
```

### Performance Monitoring (Ready for Integration)
```
Web Vitals
├─ Core Web Vitals
├─ Custom Metrics
└─ Performance Events
    ↓
Analytics
    ↓
Dashboards
```

### Logging
```
Server Logs
├─ API requests
├─ Database queries
└─ Errors
    ↓
Log Aggregation
    ↓
Analysis & Alerts
```

## Testing Architecture (Ready)

### Unit Tests
```
Jest
    ↓
Individual Components
    ↓
Utilities
    ↓
Hooks
```

### Integration Tests
```
Testing Library
    ↓
Component Integration
    ↓
API Routes
    ↓
Database Queries
```

### E2E Tests
```
Cypress / Playwright
    ↓
User Workflows
    ↓
Full Flows
    ↓
Cross-browser
```

## Development Workflow

```
Feature Branch
    ↓
Local Development
    ↓
Testing
    ↓
Git Commit
    ↓
Pull Request
    ↓
Code Review
    ↓
Merge to Main
    ↓
Vercel Auto-deploy
    ↓
Production Live
```

## Environment Management

```
.env.local (Development)
├─ Local Supabase URL
├─ Local API keys
└─ Development settings

Production (Vercel)
├─ Production Supabase URL
├─ Production API keys
└─ Production settings
```

## Dependencies Graph

```
suulp
├─ next@16.1.6
│  ├─ react@19.2.4
│  ├─ react-dom@19.2.4
│  └─ typescript@5.7.2
├─ framer-motion@12.2.0
├─ gsap@3.12.2
├─ tailwindcss@4.0.8
├─ @supabase/supabase-js@2.48.0
├─ react-hook-form@7.54.1
├─ zod@3.24.1
└─ [other UI libraries]
```

## Build Pipeline

```
Source Code
    ↓
TypeScript Compilation
    ↓
Next.js Build
├─ Static Generation
├─ Server Rendering
├─ Client Hydration
└─ Asset Optimization
    ↓
Output (next/)
├─ HTML Files
├─ JS Bundles
├─ CSS Files
└─ Assets
    ↓
Deployment
```

---

**This architecture is scalable, maintainable, and production-ready!**
