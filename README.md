# Suulp - Hotel SaaS Platform

An award-winning, modern SaaS platform for hotel management featuring CMS, CRM, and AI-powered support capabilities.

## Features

- **Advanced CMS** - Manage all your property content with ease
- **Powerful CRM** - Build lasting guest relationships
- **AI Support Agents** - 24/7 voice-enabled customer support
- **Real-time Analytics** - Comprehensive insights into operations
- **Enterprise Security** - Bank-grade encryption and compliance
- **Lightning Fast** - Optimized for speed and performance
- **Team Collaboration** - Seamless workflows for your entire staff
- **Smart Automation** - Automate repetitive tasks

## Tech Stack

### Frontend
- **Next.js 16.1** - Modern React framework with App Router
- **React 19** - Latest React with server components
- **TypeScript 5.7** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Framer Motion 12.2** - Advanced animations
- **GSAP 3.12.2** - Timeline animations and ScrollTrigger
- **Playfair Display + Poppins** - Premium typography

### Backend
- **Supabase** - PostgreSQL database with auth
- **Supabase Auth** - Email/password authentication
- **Next.js API Routes** - Serverless backend functions

### Tools & Libraries
- **react-hook-form 7.53** - Form state management
- **zod 3.24** - Schema validation
- **lucide-react 0.460** - Icon library
- **shadcn/ui** - Customizable UI components

## Project Structure

```
suulp/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── about/page.tsx           # About page
│   ├── features/page.tsx        # Features page
│   ├── pricing/page.tsx         # Pricing page
│   ├── contact/page.tsx         # Contact page
│   ├── login/page.tsx           # Login page
│   ├── signup/page.tsx          # Sign up page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── sitemap.ts               # SEO sitemap
├── components/
│   ├── navbar.tsx               # Navigation component
│   └── footer.tsx               # Footer component
├── hooks/
│   └── use-auth.ts              # Auth state hook
├── lib/
│   └── supabase.ts              # Supabase client
├── public/
│   ├── images/                  # Optimized images
│   └── robots.txt               # SEO robots file
├── scripts/
│   └── setup-database.sql       # Database schema
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies

```

## Getting Started

### Prerequisites
- Node.js 18+ (recommended 20+)
- npm, yarn, pnpm, or bun
- Supabase account (https://supabase.com)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/suulp.git
   cd suulp
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Setup Supabase**
   - Create a new project at https://supabase.com
   - Get your project URL and anon key from Settings > API
   - Create a `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

4. **Setup Database Schema**
   - Go to Supabase SQL Editor
   - Run the SQL from `scripts/setup-database.sql`
   - This creates tables for users, contact messages, and subscriptions

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**
   - Navigate to http://localhost:3000
   - You should see the Suulp landing page

## Database Schema

### Tables

#### contact_messages
- `id` (UUID, Primary Key)
- `name` (Text)
- `email` (Text)
- `subject` (Text)
- `message` (Text)
- `status` (Text: 'new' | 'read' | 'responded')
- `created_at` (Timestamp)

#### hotel_subscriptions
- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key)
- `plan` (Text: 'starter' | 'professional' | 'enterprise')
- `status` (Text: 'active' | 'cancelled')
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

## Authentication

The platform uses Supabase Auth for secure authentication:

- **Sign Up** - Create new account with email/password
- **Sign In** - Authenticate with existing credentials
- **Protected Routes** - Navbar checks auth status and shows appropriate buttons
- **Session Management** - Automatic session handling

## Animations & Performance

- **GSAP ScrollTrigger** - Scroll-based animations for engaging experience
- **Framer Motion** - Page transitions and component animations
- **Image Optimization** - Next.js Image component with lazy loading
- **React Compiler** - Automatic optimization in Next.js 16
- **Code Splitting** - Automatic route-based code splitting
- **Minification** - SWC minification for smaller bundle size

## Design System

### Color Palette
- **Primary (Gold)** - #d4af37
- **Background (Dark Navy)** - #0f1729
- **Secondary (Royal Blue)** - #2d4a7c
- **Foreground (Light)** - #f5f5f5
- **Muted** - #4a5f8f

### Typography
- **Headings** - Playfair Display (elegant serif)
- **Body** - Poppins (modern sans-serif)
- **Mono** - Menlo / Courier (code)

### Spacing
- Uses Tailwind's standard spacing scale
- 4px base unit (px-1, py-2, etc.)

## Security Features

- **Encryption** - All data encrypted at rest and in transit
- **HTTPS Only** - Enforced SSL/TLS
- **Security Headers** - X-Frame-Options, X-Content-Type-Options, etc.
- **Input Validation** - zod schema validation
- **SQL Injection Protection** - Parameterized queries
- **CORS** - Properly configured cross-origin policies

## Performance Optimization

- **Image Format Support** - AVIF and WebP
- **Responsive Images** - Multiple device sizes
- **Lazy Loading** - Images load only when visible
- **CSS Minification** - Optimized Tailwind CSS
- **Code Splitting** - Route-based splitting
- **React Compiler** - Automatic memoization

## SEO Optimization

- **Meta Tags** - Proper og:, twitter: tags
- **Sitemap** - Auto-generated sitemap.ts
- **Robots.txt** - Search engine crawl rules
- **Structured Data** - JSON-LD ready
- **Open Graph** - Social media preview support
- **Mobile Friendly** - Responsive design

## Pages Overview

### Landing Page (`/`)
- Hero section with animated gradients
- Features showcase with 6 key features
- Image gallery with hotel imagery
- Pricing comparison cards
- Call-to-action sections
- Trust badges

### About Page (`/about`)
- Company story and mission
- Statistics (hotels, uptime, revenue)
- Company values
- Feature checklist
- Team showcase

### Features Page (`/features`)
- Detailed feature breakdown
- CMS, CRM, AI Support sections
- Additional features grid
- Tech stack display
- Feature comparison

### Pricing Page (`/pricing`)
- Three tier pricing (Starter, Professional, Enterprise)
- Monthly/Annual toggle with savings
- Feature comparison table
- FAQ section
- Popular badge on recommended plan

### Contact Page (`/contact`)
- Contact form with validation
- Contact information (email, phone, address)
- Success/error messaging
- Response time information

### Login Page (`/login`)
- Email and password input
- Forgot password link
- Remember me checkbox
- Sign up link
- Security badge

### Sign Up Page (`/signup`)
- Full name, hotel name, email input
- Password with confirmation
- Terms of service checkbox
- Free trial information
- Login link

## API Routes (Future)

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/contact` - Contact form submission
- `GET /api/user` - Get user profile
- `POST /api/subscriptions` - Create subscription
- `GET /api/analytics` - Get analytics data

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Import in Vercel dashboard
# Add environment variables
# Deploy
```

### Docker
```bash
# Build
docker build -t suulp .

# Run
docker run -p 3000:3000 suulp
```

## Development

### Running Tests
```bash
pnpm test
```

### Building
```bash
pnpm build
```

### Linting
```bash
pnpm lint
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Create a feature branch
2. Commit changes
3. Push to branch
4. Create Pull Request

## License

MIT License - see LICENSE file for details

## Support

- Email: support@suulp.com
- Documentation: https://docs.suulp.com
- Status: https://status.suulp.com

## Roadmap

- AI Voice Support Agents
- Multi-language Support (20+ languages)
- Mobile App (iOS/Android)
- Advanced Analytics Dashboard
- PMS Integrations
- Property Management Automation
- Guest Portal
- Review Management System

## Changelog

### v1.0.0 (Current)
- Initial release
- Core SaaS platform with CMS/CRM
- Authentication system
- Contact form
- Responsive design
- Animation framework

---

**Built with ❤️ by the Suulp Team**

For more information, visit [suulp.com](https://suulp.com)
