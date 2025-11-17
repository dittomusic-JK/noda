# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**NODA Intelligence** is a Next.js 15 B2G (Business-to-Government) marketing website showcasing AI solutions for government organizations. It features a custom CMS for content management, integrates with HubSpot for lead management, and emphasizes SEO optimization for government-focused use cases.

**Stack:** Next.js 15 (App Router) • TypeScript • Tailwind CSS 4 • Prisma • PostgreSQL • NextAuth • Vercel

## Common Commands

### Development
```bash
npm run dev              # Start dev server on port 3003
npm run build            # Build for production (includes Prisma generation)
npm start                # Start production server
```

### Type Checking & Linting
```bash
npm run type-check       # TypeScript type checking without build
npm run lint             # Run ESLint
```

### Testing
```bash
npm run test             # Run unit tests (Vitest)
npm run test:watch       # Run tests in watch mode
npm run test:e2e         # Run end-to-end tests (Playwright)
```

### Database (Prisma)
```bash
npm run prisma:generate  # Generate Prisma client after schema changes
npm run prisma:migrate   # Create and apply migration (production workflow)
npm run prisma:push      # Push schema changes (development - faster, no migration files)
npm run prisma:studio    # Open Prisma Studio GUI for database inspection
npm run prisma:seed      # Run seed script (prisma/seed.ts)
```

**Important:** The dev port is **3003** (not the default 3000). The build command automatically runs `prisma generate` before building.

## Architecture

### Next.js 15 App Router Structure

This project uses Next.js 15's App Router with a clean separation between public pages, admin pages, and API routes:

```
app/
├── page.tsx                    # Home page
├── layout.tsx                  # Root layout with providers
├── use-cases/
│   ├── page.tsx               # Use cases listing
│   └── [slug]/page.tsx        # Dynamic use case detail pages
├── blog/
│   ├── page.tsx               # Blog listing
│   └── [slug]/page.tsx        # Dynamic blog post pages
├── solutions/                  # Solutions landing
├── about/                      # About page
├── careers/                    # Careers (Greenhouse integration)
├── contact/                    # Contact form
├── demo/                       # Demo request page
├── privacy/                    # Privacy policy
├── terms/                      # Terms of service
├── admin/
│   └── login/                  # Admin login (NextAuth)
└── api/
    ├── auth/[...nextauth]/     # NextAuth API routes
    ├── contact/                # Contact form submission
    └── demo/                   # Demo form submission
```

### Component Organization

```
components/
├── ui/              # Base UI components (Button, Card, Badge, Input, etc.)
├── layout/          # Layout components (Nav, Footer, Container)
├── sections/        # Reusable page sections (Hero, CTA, Features, etc.)
├── forms/           # Form components (ContactForm, DemoForm, etc.)
├── admin/           # Admin-specific components
└── providers/       # React context providers
```

### Library Organization

```
lib/
├── db/
│   ├── prisma.ts        # Prisma client singleton
│   └── queries.ts       # Database query helpers
├── utils/
│   ├── cn.ts            # Tailwind class merging utility
│   ├── sanitize.ts      # Input sanitization
│   └── analytics.ts     # Analytics event tracking
├── integrations/
│   └── hubspot.ts       # HubSpot CRM integration
├── auth/
│   └── config.ts        # NextAuth configuration
└── env.ts               # Environment variable validation (Zod)
```

### Database Models (Prisma)

The database schema includes 6 main models:

1. **Page** - Static content pages with SEO metadata
2. **Post** - Blog posts with tags and publication dates
3. **UseCase** - Government AI use cases (primary content type)
4. **CaseStudy** - Client success stories with metrics
5. **ContactSubmission** - Form submissions with HubSpot sync tracking
6. **AdminUser** - Admin authentication with role-based access

Key patterns:
- All content models have `published` boolean flags
- SEO fields: `meta_description`, `og_image_url`, `slug` (unique)
- Timestamps: `created_at`, `updated_at` (auto-managed)
- Arrays: `tags[]`, `benefits[]`, `seo_keywords[]` (PostgreSQL arrays)

## Development Patterns

### Server Components First

Use Server Components by default. Only add `'use client'` when you need:
- React hooks (useState, useEffect, etc.)
- Browser APIs
- Event handlers
- Third-party libraries requiring client-side rendering

### Server Actions for Forms

Use Server Actions instead of API routes for form submissions:

```tsx
// app/contact/actions.ts
'use server'
export async function submitContact(formData: FormData) {
  // Process form, save to DB, sync to HubSpot
  revalidatePath('/contact')
}
```

### Metadata Management

Use Next.js Metadata API for SEO:

```tsx
// Static metadata
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description',
}

// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const useCase = await prisma.useCase.findUnique({ where: { slug: params.slug } })
  return { title: useCase.title, description: useCase.meta_description }
}
```

### Database Query Patterns

**Always use the Prisma singleton from `lib/db/prisma.ts`:**

```tsx
import { prisma } from '@/lib/db/prisma'
```

**Select only needed fields to optimize performance:**

```tsx
const useCases = await prisma.useCase.findMany({
  where: { published: true },
  select: { id: true, slug: true, title: true, hero_image: true },
  orderBy: { order: 'asc' }
})
```

**Avoid N+1 queries** - use `include` or nested `select` instead of separate queries.

### Path Aliases

Use the `@/` alias for imports:

```tsx
import { Button } from '@/components/ui/button'
import { prisma } from '@/lib/db/prisma'
import { sanitizeInput } from '@/lib/utils/sanitize'
```

## Security & Middleware

### Security Headers

Security headers are configured in `next.config.ts` including CSP, HSTS, X-Frame-Options, etc. The CSP allows scripts from Google Analytics, GTM, HubSpot, and Hotjar.

### Rate Limiting

Rate limiting is **optional** and only active if Upstash Redis credentials are provided in `.env.local`. The middleware checks for credentials before enabling rate limiting on `/api/contact` routes.

### Admin Authentication

Admin routes (`/admin/*`) use NextAuth with JWT sessions. The middleware redirects unauthenticated users to `/admin/login`. Admin users are stored in the `AdminUser` model with bcrypt-hashed passwords.

## Integrations

### HubSpot CRM
- Contact form submissions sync to HubSpot via `lib/integrations/hubspot.ts`
- Submissions are also stored in `ContactSubmission` table as backup
- Check `synced_to_hubspot` flag to track sync status

### Analytics Stack
- **Google Tag Manager (GTM)** - Primary analytics container
- **Google Analytics 4 (GA4)** - Via GTM
- **Hotjar** - Behavior analytics via GTM
- **Facebook Pixel** - Retargeting via GTM

Event tracking helper available at `lib/utils/analytics.ts`.

### Ashby (Careers)
- Job listings embedded via Ashby iframe
- Direct embed from `https://jobs.ashbyhq.com/nodaintelligence`
- No API configuration needed (uses public job board)

## Testing Strategy

### Unit Tests (Vitest)
Test utilities and helper functions in `__tests__/` directory. Focus on:
- Input sanitization functions
- Utility functions (cn, analytics helpers)
- Database query helpers

### E2E Tests (Playwright)
Test critical user flows in `e2e/` directory:
- Contact form submission
- Use case page navigation
- Admin login flow

Run E2E tests before major deployments.

## Important Notes

### Content Management
- Use cases are the primary content type for SEO
- Each use case should have unique slugs following pattern: `/use-cases/[problem-domain]`
- Always set `published: true` for content to appear on the site
- Use the `order` field on UseCases to control display sequence

### Environment Variables
- Database requires both `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED` (for migrations)
- `NEXTAUTH_SECRET` must be 32+ characters for production
- Rate limiting is optional (requires Upstash Redis credentials)
- See `.env.example` for complete list

### Build Process
- The build command includes `prisma generate` automatically
- Always run `prisma:generate` locally after schema changes
- Use `prisma:push` in development, `prisma:migrate` before production deploys

### TypeScript
- Strict mode is enabled
- Never use `any` - use `unknown` with type guards or proper types
- Use Prisma-generated types: `import type { UseCase } from '@prisma/client'`

### Performance
- Use `next/image` for all images
- Use `next/font` for font optimization (fonts are configured in `app/layout.tsx`)
- Dynamic imports for heavy client components
- Script loading strategy: `afterInteractive` for GTM, `lazyOnload` for Hotjar

### Accessibility
- Target WCAG 2.1 AA compliance
- Use semantic HTML elements
- Include ARIA labels for icon-only buttons
- Ensure keyboard navigation works for modals and dropdowns

## Reference Documentation

Key documentation files in this repository:
- **SETUP.md** - Complete setup and installation guide
- **BEST-PRACTICES.md** - Comprehensive development best practices and patterns
- **PROJECT-STATUS.md** - Current project status and development roadmap
- **nodaintelligence-techspec.md** - Complete technical specification

For external documentation:
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
