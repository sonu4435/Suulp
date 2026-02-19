# Suulp - Complete Setup Guide

This guide walks you through setting up the Suulp SaaS platform from scratch.

## Step 1: Prerequisites

Make sure you have:
- Node.js 18 or higher (check with `node --version`)
- npm, yarn, pnpm, or bun package manager
- A Supabase account (free at https://supabase.com)
- A text editor (VS Code recommended)

## Step 2: Clone & Install

```bash
# Clone the repository (or download the ZIP)
git clone https://github.com/yourusername/suulp.git
cd suulp

# Install dependencies
pnpm install
# Alternative: npm install
```

## Step 3: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New project"
3. Fill in the project details:
   - Name: "Suulp"
   - Database Password: Create a strong password
   - Region: Choose closest to your location
4. Wait for the project to be created (2-3 minutes)

## Step 4: Get Supabase Credentials

1. In your Supabase project, go to **Settings** > **API**
2. Copy these values:
   - **Project URL** (starts with https://xxx.supabase.co)
   - **Anon Key** (long string starting with eyJ...)
3. Keep these secure - don't share them

## Step 5: Setup Environment Variables

1. In your project root, copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-long-anon-key-here
   ```

3. Save the file

## Step 6: Setup Database Schema

1. In Supabase, go to **SQL Editor**
2. Create a new query
3. Copy-paste the contents of `scripts/setup-database.sql`
4. Click **Run**

This creates three tables:
- `users` - User profiles
- `contact_messages` - Contact form submissions
- `hotel_subscriptions` - Subscription records

## Step 7: Run Development Server

```bash
pnpm dev
```

You should see:
```
> suulp@1.0.0 dev
> next dev

  ▲ Next.js 16.1.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

## Step 8: Test the Application

1. Open http://localhost:3000 in your browser
2. You should see the Suulp landing page
3. Test navigation:
   - Click "About", "Features", "Pricing" - should load pages
   - Click "Get Started" - should go to signup
   - Try the contact form - should submit to database

## Step 9: Test Authentication

### Sign Up Flow
1. Click "Get Started" or go to /signup
2. Fill in the form:
   - Full Name: Your name
   - Hotel Name: Test Hotel
   - Email: your-email@example.com
   - Password: Secure password (8+ chars)
3. Click "Create Account"
4. Check your email for confirmation
5. Click the confirmation link

### Sign In Flow
1. Go to /login
2. Enter your email and password
3. Click "Sign In"
4. You should be logged in (navbar shows "Logout")

## Step 10: Test Contact Form

1. Go to /contact
2. Fill in the form:
   - Name: Test Name
   - Email: test@example.com
   - Subject: Test Subject
   - Message: Test message
3. Click "Send Message"
4. In Supabase, go to **Table Editor** > **contact_messages**
5. Your message should appear there

## Troubleshooting

### "Missing Supabase credentials" Error
- Check `.env.local` has correct values
- Make sure you didn't add spaces or quotes around values
- Restart the dev server after changing env vars

### "Failed to load images"
- Images are stored in `/public/images/`
- If missing, they were automatically generated
- Check that image files exist in that folder

### "Supabase connection failed"
- Check your internet connection
- Verify Supabase project is active
- Check if SUPABASE_URL and ANON_KEY are correct
- Make sure they're in `.env.local` not `.env`

### "Port 3000 already in use"
```bash
# Use a different port
pnpm dev -- -p 3001
```

### "Module not found" Error
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

## Customization

### Change Brand Colors

Edit `app/globals.css` and modify the CSS variables:
```css
--primary: #d4af37;      /* Gold accent */
--background: #0f1729;   /* Dark navy background */
--secondary: #2d4a7c;    /* Royal blue */
```

### Change Typography

Edit `app/globals.css` and modify the @theme section:
```css
--font-sans: 'Poppins', sans-serif;
--font-serif: 'Playfair Display', serif;
```

### Add New Pages

1. Create folder: `app/new-page/`
2. Create file: `app/new-page/page.tsx`
3. Copy structure from existing pages
4. Add route to navbar in `components/navbar.tsx`

### Customize Animations

All animations use Framer Motion and GSAP:
- Framer Motion - Component animations, transitions
- GSAP - Advanced timeline animations
- ScrollTrigger - Scroll-based animations

Edit the animation variants in each component.

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to https://vercel.com and sign in with GitHub

3. Click "Add New" > "Project"

4. Select your GitHub repository

5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

6. Click "Deploy"

Your site will be live at `https://suulp.vercel.app`

### Deploy to Other Platforms

#### Netlify
1. Connect your GitHub repository
2. Build command: `pnpm build`
3. Publish directory: `.next`
4. Add environment variables
5. Deploy

#### AWS Amplify
1. Connect GitHub
2. Build settings auto-detected
3. Add environment variables
4. Deploy

## Database Backup

### Backup Your Data

```bash
# Using Supabase CLI
supabase db push

# Or through Supabase Dashboard
# Settings > Database > Backups
```

### Restore Data

```bash
supabase db pull
```

## Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Keep keys secret** - Don't share your Supabase keys
3. **Use strong passwords** - Minimum 12 characters
4. **Enable 2FA** - On your Supabase account
5. **Update dependencies** - Run `pnpm update` regularly
6. **Use HTTPS** - Always use HTTPS in production

## Performance Optimization

### Local Development
```bash
# Start with faster builds
SKIP_ENV_VALIDATION=true pnpm dev
```

### Production Build
```bash
pnpm build
pnpm start
```

### Analyze Bundle Size
```bash
pnpm build --analyze
```

## Monitoring & Logging

### Check Logs
```bash
# Vercel (if deployed there)
vercel logs

# Local development
# Check browser console: F12
```

### Database Logs
- Supabase Dashboard > Logs
- Check for errors and slow queries

## API Documentation

The platform uses Next.js API routes. Current endpoints:

- `POST /api/contact` - Submit contact form (auto-created)

See `lib/supabase.ts` for available functions.

## Next Steps

1. **Customize branding** - Update colors and fonts
2. **Add more pages** - Create additional pages as needed
3. **Integrate payments** - Add Stripe for subscriptions
4. **Add AI features** - Integrate OpenAI for chat support
5. **Setup analytics** - Add Google Analytics
6. **Configure email** - Setup Resend for notifications

## Support & Resources

- **Documentation**: https://docs.suulp.com
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Framer Motion**: https://www.framer.com/motion/
- **GSAP Docs**: https://greensock.com/docs/

## Frequently Asked Questions

### Q: Can I use this for production?
A: Yes! The platform is production-ready with security, performance, and scalability built-in.

### Q: Can I change the design?
A: Absolutely! The design is fully customizable using Tailwind CSS and React components.

### Q: How many users can it handle?
A: The platform can handle thousands of concurrent users thanks to Supabase and Vercel's infrastructure.

### Q: Is it open source?
A: Check the LICENSE file for licensing information.

### Q: Can I white-label it?
A: Yes, you can customize all branding and deploy under your own domain.

---

**You're all set! Happy building with Suulp!** 🚀
