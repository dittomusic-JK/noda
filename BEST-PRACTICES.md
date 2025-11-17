# NODA Intelligence - Best Practices

## 1. Next.js 15 Best Practices

### Project Structure
```
app/                    # App Router pages
├── (public)/          # Public routes group
│   ├── page.tsx       # Home page
│   ├── solutions/     
│   ├── use-cases/     
│   ├── blog/          
│   └── about/         
├── (admin)/           # Admin routes group
│   └── admin/         
├── api/               # API routes
├── layout.tsx         # Root layout
└── globals.css        # Global styles

components/            # Reusable components
├── ui/               # Base UI components
├── layout/           # Layout components (Nav, Footer)
├── sections/         # Page sections
└── forms/            # Form components

lib/                  # Utilities and helpers
├── db/              # Database utilities
├── api/             # API clients
├── utils/           # Utility functions
└── hooks/           # Custom React hooks

types/               # TypeScript types
├── models.ts        # Database models
├── api.ts           # API types
└── components.ts    # Component prop types

prisma/              # Prisma schema and migrations
├── schema.prisma
└── migrations/

public/              # Static assets
├── images/
├── fonts/
└── icons/
```

### App Router Patterns

**1. Use Server Components by Default**
```tsx
// app/page.tsx - Server Component (default)
export default async function HomePage() {
  const data = await fetchData() // Direct DB/API calls
  return <div>{data.title}</div>
}
```

**2. Client Components Only When Needed**
```tsx
// components/ui/interactive-button.tsx
'use client'
import { useState } from 'react'

export function InteractiveButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

**3. Server Actions for Forms**
```tsx
// app/contact/page.tsx
import { submitContact } from './actions'

export default function ContactPage() {
  return (
    <form action={submitContact}>
      <input name="email" />
      <button type="submit">Submit</button>
    </form>
  )
}

// app/contact/actions.ts
'use server'
export async function submitContact(formData: FormData) {
  const email = formData.get('email')
  // Handle submission
  revalidatePath('/contact')
}
```

**4. Route Grouping**
```
app/
├── (public)/          # Doesn't affect URL
│   ├── layout.tsx     # Shared layout for public pages
│   └── page.tsx       # /
├── (admin)/
│   └── admin/         # /admin
│       └── page.tsx
```

**5. Metadata API**
```tsx
// app/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NODA Intelligence',
  description: 'AI for Government',
  openGraph: {
    title: 'NODA Intelligence',
    description: 'AI for Government',
    images: ['/og-image.png'],
  },
}
```

**6. Dynamic Metadata**
```tsx
// app/use-cases/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const useCase = await db.useCase.findUnique({ where: { slug: params.slug } })
  return {
    title: useCase.title,
    description: useCase.meta_description,
  }
}
```

**7. Loading and Error States**
```tsx
// app/blog/loading.tsx
export default function Loading() {
  return <Skeleton />
}

// app/blog/error.tsx
'use client'
export default function Error({ error, reset }) {
  return <div>Error: {error.message}</div>
}
```

**8. Static vs Dynamic Rendering**
```tsx
// Static by default
export default async function Page() { }

// Force dynamic
export const dynamic = 'force-dynamic'

// Revalidate every hour
export const revalidate = 3600

// Incremental Static Regeneration
export async function generateStaticParams() {
  const useCases = await db.useCase.findMany()
  return useCases.map((uc) => ({ slug: uc.slug }))
}
```

---

## 2. TypeScript Best Practices

### Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"]
    }
  }
}
```

### Type Patterns

**1. Define Component Props**
```tsx
// types/components.ts
export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
}

// components/ui/button.tsx
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  ...props 
}: ButtonProps) {
  return <button {...props}>{children}</button>
}
```

**2. Database Model Types**
```tsx
// types/models.ts
export interface UseCase {
  id: string
  slug: string
  title: string
  challenge: string
  solution: string
  benefits: string[]
  seo_keywords: string[]
  meta_description: string
  hero_image: string
  cta_label: string
  pdf_download_url?: string
  created_at: Date
  updated_at: Date
}

// Use Prisma generated types
import { UseCase as PrismaUseCase } from '@prisma/client'
export type UseCase = PrismaUseCase
```

**3. API Response Types**
```tsx
// types/api.ts
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
}
```

**4. Utility Types**
```tsx
// Pick specific fields
type UseCaseSummary = Pick<UseCase, 'id' | 'slug' | 'title' | 'meta_description'>

// Omit fields
type UseCaseInput = Omit<UseCase, 'id' | 'created_at' | 'updated_at'>

// Partial for updates
type UseCaseUpdate = Partial<UseCase>

// Make specific fields required
type UseCaseRequired = UseCase & Required<Pick<UseCase, 'pdf_download_url'>>
```

**5. Never Use `any`**
```tsx
// ❌ Bad
function processData(data: any) { }

// ✅ Good
function processData<T>(data: T) { }
// or
function processData(data: unknown) {
  if (typeof data === 'string') {
    // Type narrowing
  }
}
```

---

## 3. Prisma Best Practices

### Schema Design
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Page {
  id               String   @id @default(cuid())
  slug             String   @unique
  title            String
  content          String   @db.Text
  meta_description String?
  og_image_url     String?
  canonical_url    String?
  published        Boolean  @default(false)
  created_at       DateTime @default(now())
  updated_at       DateTime @updatedAt
  created_by       String?
  updated_by       String?

  @@index([slug])
  @@index([published])
  @@map("pages")
}

model Post {
  id               String   @id @default(cuid())
  slug             String   @unique
  title            String
  excerpt          String?
  content          String   @db.Text
  author           String
  published_at     DateTime?
  meta_description String?
  og_image_url     String?
  tags             String[]
  published        Boolean  @default(false)
  created_at       DateTime @default(now())
  updated_at       DateTime @updatedAt

  @@index([slug])
  @@index([published])
  @@index([published_at])
  @@map("posts")
}

model UseCase {
  id               String   @id @default(cuid())
  slug             String   @unique
  title            String
  challenge        String   @db.Text
  solution         String   @db.Text
  benefits         String[]
  seo_keywords     String[]
  meta_description String
  hero_image       String
  cta_label        String   @default("Book a Demo")
  pdf_download_url String?
  published        Boolean  @default(false)
  order            Int      @default(0)
  created_at       DateTime @default(now())
  updated_at       DateTime @updatedAt

  @@index([slug])
  @@index([published])
  @@index([order])
  @@map("use_cases")
}

model ContactSubmission {
  id         String   @id @default(cuid())
  name       String
  email      String
  company    String?
  message    String   @db.Text
  source     String?  // UTM source
  synced_to_hubspot Boolean @default(false)
  hubspot_id String?
  created_at DateTime @default(now())

  @@index([email])
  @@index([created_at])
  @@map("contact_submissions")
}
```

### Database Client Pattern
```tsx
// lib/db/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### Query Patterns
```tsx
// lib/db/queries.ts
import { prisma } from './prisma'

// Use select to fetch only needed fields
export async function getUseCaseSummaries() {
  return prisma.useCase.findMany({
    where: { published: true },
    select: {
      id: true,
      slug: true,
      title: true,
      meta_description: true,
      hero_image: true,
    },
    orderBy: { order: 'asc' },
  })
}

// Use transactions for related operations
export async function createPostWithTracking(data: PostInput) {
  return prisma.$transaction(async (tx) => {
    const post = await tx.post.create({ data })
    await tx.auditLog.create({
      data: {
        action: 'create_post',
        resource_id: post.id,
        timestamp: new Date(),
      },
    })
    return post
  })
}

// Use raw queries sparingly
export async function complexQuery() {
  return prisma.$queryRaw`
    SELECT * FROM posts 
    WHERE published = true 
    ORDER BY published_at DESC 
    LIMIT 10
  `
}
```

---

## 4. Security Best Practices

### Security Headers
```ts
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com *.google-analytics.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' data:;
      connect-src 'self' *.google-analytics.com *.hubspot.com;
      frame-src 'self' *.youtube.com;
    `.replace(/\s{2,}/g, ' ').trim(),
  },
]

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
```

### Rate Limiting Middleware
```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function middleware(request: NextRequest) {
  // Rate limit API routes
  if (request.nextUrl.pathname.startsWith('/api/contact')) {
    const ip = request.ip ?? '127.0.0.1'
    const { success } = await ratelimit.limit(ip)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }
  }

  // Admin authentication check
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('session')
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],
}
```

### Environment Variables
```bash
# .env.local
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..." # For migrations

# API Keys (never commit)
HUBSPOT_API_KEY="your-key"
RECAPTCHA_SECRET_KEY="your-key"
GREENHOUSE_API_KEY="your-key"

# Auth
SESSION_SECRET="your-secret"
ADMIN_PASSWORD_HASH="your-hash"

# Analytics
NEXT_PUBLIC_GA_ID="G-XXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"

# Rate limiting
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="your-token"
```

```ts
// lib/env.ts - Validate env vars at build time
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  HUBSPOT_API_KEY: z.string().min(1),
  SESSION_SECRET: z.string().min(32),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
})

export const env = envSchema.parse(process.env)
```

### Input Sanitization
```ts
// lib/utils/sanitize.ts
import DOMPurify from 'isomorphic-dompurify'

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href'],
  })
}

export function sanitizeInput(input: string): string {
  return input.trim().slice(0, 1000) // Limit length
}
```

---

## 5. Performance Best Practices

### Image Optimization
```tsx
// Always use next/image
import Image from 'next/image'

export function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="NODA Intelligence"
      width={1920}
      height={1080}
      priority // Above-the-fold images
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}

// For dynamic images
<Image
  src={useCase.hero_image}
  alt={useCase.title}
  width={800}
  height={600}
  loading="lazy"
/>
```

### Font Optimization
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

### Code Splitting
```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('@/components/heavy-component'), {
  loading: () => <Skeleton />,
  ssr: false, // Skip SSR for client-only components
})

// Dynamic import for libraries
const AnimatedSection = dynamic(
  () => import('@/components/animated-section').then((mod) => mod.AnimatedSection),
  { ssr: false }
)
```

### Script Loading Strategy
```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        
        {/* Load after interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js"
          strategy="afterInteractive"
        />
        
        {/* Lazy load */}
        <Script
          src="https://static.hotjar.com/c/hotjar.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
```

### Database Query Optimization
```tsx
// ❌ Bad - N+1 query
const posts = await prisma.post.findMany()
for (const post of posts) {
  const author = await prisma.user.findUnique({ where: { id: post.authorId } })
}

// ✅ Good - Use include/select
const posts = await prisma.post.findMany({
  include: { author: true },
})

// ✅ Better - Select only needed fields
const posts = await prisma.post.findMany({
  select: {
    id: true,
    title: true,
    author: {
      select: {
        name: true,
        avatar: true,
      },
    },
  },
})
```

---

## 6. Vercel Deployment Best Practices

### Project Configuration
```json
// vercel.json
{
  "buildCommand": "prisma generate && next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database-url"
  }
}
```

### Environment Variables Setup
```bash
# Add to Vercel dashboard
# Production
DATABASE_URL
HUBSPOT_API_KEY
SESSION_SECRET

# Preview & Development
DATABASE_URL (different db)
HUBSPOT_API_KEY (test mode)
```

### Caching Strategy
```tsx
// app/blog/page.tsx
export const revalidate = 3600 // Revalidate every hour

// app/use-cases/[slug]/page.tsx
export const revalidate = 86400 // Revalidate daily

// Force no cache for admin
export const dynamic = 'force-dynamic'
```

---

## 7. Testing Best Practices

### Unit Tests (Vitest)
```ts
// __tests__/utils/sanitize.test.ts
import { describe, it, expect } from 'vitest'
import { sanitizeInput } from '@/lib/utils/sanitize'

describe('sanitizeInput', () => {
  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello')
  })

  it('limits length', () => {
    const long = 'a'.repeat(2000)
    expect(sanitizeInput(long).length).toBe(1000)
  })
})
```

### E2E Tests (Playwright)
```ts
// e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test'

test('contact form submission', async ({ page }) => {
  await page.goto('/contact')
  
  await page.fill('input[name="name"]', 'John Doe')
  await page.fill('input[name="email"]', 'john@example.com')
  await page.fill('textarea[name="message"]', 'Test message')
  
  await page.click('button[type="submit"]')
  
  await expect(page.locator('.success-message')).toBeVisible()
})
```

---

## 8. Git Workflow

### Branch Strategy
```bash
main          # Production
├── staging   # Staging environment
└── dev       # Development

# Feature branches
git checkout -b feature/use-case-pages
git checkout -b fix/contact-form-validation
```

### Commit Messages
```bash
# Format: type(scope): message

feat(use-cases): add use case detail page
fix(contact): validate email format
docs(readme): update setup instructions
refactor(db): optimize query performance
perf(images): add blur placeholders
style(nav): improve mobile responsiveness
test(api): add contact form tests
chore(deps): update dependencies
```

### Pre-commit Hooks
```json
// package.json
{
  "scripts": {
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "pre-commit": "npm run lint && npm run type-check"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run pre-commit"
    }
  }
}
```

---

## 9. Accessibility Best Practices

### Semantic HTML
```tsx
// ✅ Good
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/solutions">Solutions</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Use Case Title</h1>
    <p>Content...</p>
  </article>
</main>

<footer>
  <p>&copy; 2025 NODA Intelligence</p>
</footer>
```

### ARIA Labels
```tsx
<button aria-label="Close dialog" onClick={onClose}>
  <X />
</button>

<input
  type="search"
  aria-label="Search use cases"
  placeholder="Search..."
/>
```

### Keyboard Navigation
```tsx
'use client'
import { useEffect } from 'react'

export function Modal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  return isOpen ? <div role="dialog" aria-modal="true">...</div> : null
}
```

---

## 10. Monitoring & Analytics

### Error Tracking
```tsx
// app/error.tsx
'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log to error tracking service
    console.error('Application error:', error)
  }, [error])

  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### Analytics Events
```tsx
// lib/analytics.ts
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
}

// Usage in components
import { trackEvent } from '@/lib/analytics'

export function CTAButton() {
  const handleClick = () => {
    trackEvent('cta_click', {
      location: 'use_case_page',
      label: 'Book a Demo',
    })
  }
  
  return <button onClick={handleClick}>Book a Demo</button>
}
```

---

## Summary Checklist

- [ ] Use Server Components by default
- [ ] TypeScript strict mode enabled
- [ ] Prisma client singleton pattern
- [ ] Security headers configured
- [ ] Rate limiting on API routes
- [ ] Environment variables validated
- [ ] Images use next/image
- [ ] Fonts optimized with next/font
- [ ] Scripts use next/script with proper strategy
- [ ] Database queries optimized (no N+1)
- [ ] Metadata API for SEO
- [ ] Accessibility: semantic HTML + ARIA
- [ ] Error boundaries implemented
- [ ] Analytics tracking configured
- [ ] Git workflow with meaningful commits
- [ ] Tests for critical paths
