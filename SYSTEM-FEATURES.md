# NODA Intelligence System Features

**High-Level Technical Specifications & Feature Documentation**

**Last Updated:** November 2025  
**Stack:** Next.js 15 • TypeScript • Tailwind CSS 4 • Prisma • PostgreSQL • NextAuth • Vercel  
**Architecture:** Hybrid SSR/SSG • Server Actions • Edge Functions

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Core Features](#2-core-features)
3. [Content Management System](#3-content-management-system)
4. [Public-Facing Features](#4-public-facing-features)
5. [Marketing & Lead Generation](#5-marketing--lead-generation)
6. [Analytics & Tracking](#6-analytics--tracking)
7. [Security & Authentication](#7-security--authentication)
8. [API & Integrations](#8-api--integrations)
9. [Performance & SEO](#9-performance--seo)
10. [Developer Experience](#10-developer-experience)

---

## 1. System Overview

### 1.1 Purpose

NODA Intelligence marketing website serves as a high-performance B2G (Business-to-Government) platform designed to:

- **Establish Authority:** Position NODA as a credible AI partner for government agencies
- **Generate Qualified Leads:** Convert visitors through strategic CTAs and form submissions
- **Enable Content Management:** Empower marketing team with self-service CMS capabilities
- **Drive SEO Performance:** Rank for government AI solution keywords
- **Provide Analytics:** Track user behavior and conversion funnel performance

### 1.2 Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                          │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│              Vercel Edge Network (CDN)                       │
│  • Static Assets  • Edge Functions  • Rate Limiting         │
└──────────────────┬──────────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js 15 Application                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  App Router (SSR/SSG Hybrid)                         │  │
│  │  • Public Pages (SSG with ISR)                       │  │
│  │  • Admin CMS (SSR with Auth)                         │  │
│  │  • API Routes (Server Actions + REST)                │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────┬──────────────────────────────────────────┘
                   │
          ┌────────┴─────────┐
          ▼                  ▼
┌──────────────────┐  ┌──────────────────┐
│  PostgreSQL DB   │  │  External APIs   │
│  (Vercel)        │  │  • HubSpot       │
│  • Prisma ORM    │  │  • Greenhouse    │
│  • Migrations    │  │  • Analytics     │
└──────────────────┘  └──────────────────┘
```

### 1.3 Technology Stack

| Layer          | Technology          | Purpose                              |
|----------------|---------------------|--------------------------------------|
| **Framework**  | Next.js 15          | React framework with App Router      |
| **Language**   | TypeScript          | Type-safe development                |
| **Styling**    | Tailwind CSS 4      | Utility-first CSS framework          |
| **Database**   | PostgreSQL          | Relational database                  |
| **ORM**        | Prisma              | Type-safe database client            |
| **Auth**       | NextAuth            | Authentication for admin CMS         |
| **Hosting**    | Vercel              | Serverless deployment platform       |
| **Animation**  | Framer Motion       | Declarative animations               |
| **Testing**    | Vitest + Playwright | Unit and E2E testing                 |

---

## 2. Core Features

### 2.1 Content Types

The system supports six primary content models:

#### 2.1.1 Use Cases
**Purpose:** Showcase government-specific AI applications for SEO and sales enablement

**Schema:**
```typescript
{
  id: string
  slug: string                    // URL-friendly identifier
  title: string                   // Page title
  challenge: string               // Problem statement
  solution: string                // NODA's solution
  benefits: string[]              // Array of benefits
  seo_keywords: string[]          // Target keywords
  meta_description: string        // SEO meta description
  hero_image: string              // Header image URL
  cta_label: string               // Call-to-action text
  pdf_download_url?: string       // Optional PDF resource
  published: boolean              // Visibility flag
  order: number                   // Display sequence
  created_at: DateTime
  updated_at: DateTime
}
```

**Features:**
- Dynamic routing via `/use-cases/[slug]`
- Automatic sitemap generation
- Schema.org Service markup
- Related use cases carousel
- PDF download tracking
- CTA conversion tracking

#### 2.1.2 Blog Posts
**Purpose:** Thought leadership and informational content for SEO

**Schema:**
```typescript
{
  id: string
  slug: string
  title: string
  excerpt?: string
  content: string                 // Rich text content
  author: string
  published_at?: DateTime
  meta_description?: string
  og_image_url?: string
  tags: string[]                  // Categorization
  published: boolean
  created_at: DateTime
  updated_at: DateTime
}
```

**Features:**
- Rich text editor (TipTap)
- Tag-based filtering
- Author profiles
- Related posts algorithm
- RSS feed generation
- Social sharing optimization

#### 2.1.3 Static Pages
**Purpose:** Generic content pages (About, Privacy, Terms)

**Schema:**
```typescript
{
  id: string
  slug: string
  title: string
  content: string
  meta_description?: string
  og_image_url?: string
  canonical_url?: string
  published: boolean
  created_by?: string
  updated_by?: string
  created_at: DateTime
  updated_at: DateTime
}
```

#### 2.1.4 Case Studies
**Purpose:** Customer success stories with quantifiable results

**Schema:**
```typescript
{
  id: string
  slug: string
  title: string
  client: string
  industry: string
  excerpt: string
  challenge: string
  solution: string
  results: string
  hero_image?: string
  logo_image?: string
  tags: string[]
  metrics?: JSON                  // Key performance indicators
  meta_description?: string
  published: boolean
  featured: boolean               // Highlight on homepage
  published_at?: DateTime
  created_at: DateTime
  updated_at: DateTime
  created_by?: string
}
```

#### 2.1.5 Contact Submissions
**Purpose:** Lead capture and CRM synchronization

**Schema:**
```typescript
{
  id: string
  name: string
  email: string
  company?: string
  message: string
  source?: string                 // UTM tracking
  synced_to_hubspot: boolean
  hubspot_id?: string
  created_at: DateTime
}
```

#### 2.1.6 Admin Users
**Purpose:** CMS access control and audit trails

**Schema:**
```typescript
{
  id: string
  email: string
  password_hash: string           // bcrypt hashed
  name: string
  role: string                    // admin, editor, viewer
  created_at: DateTime
  last_login?: DateTime
}
```

### 2.2 Rendering Strategy

| Page Type           | Strategy | Revalidation | Rationale                        |
|---------------------|----------|--------------|----------------------------------|
| Home                | SSG      | 3600s (1h)   | High traffic, infrequent changes |
| Use Cases List      | SSG      | 3600s (1h)   | SEO optimization                 |
| Use Case Detail     | SSG      | 86400s (24h) | Long-tail SEO pages              |
| Blog List           | SSG      | 3600s (1h)   | Regular content updates          |
| Blog Post           | SSG      | 86400s (24h) | Static after publication         |
| Contact Page        | SSR      | N/A          | Dynamic form submission          |
| Admin Pages         | SSR      | N/A          | Authenticated content            |
| Solutions/About     | SSG      | 3600s (1h)   | Marketing pages                  |

**ISR (Incremental Static Regeneration):**
- Pages rebuild on-demand when data changes
- Fallback: `blocking` for new pages
- Stale-while-revalidate pattern for seamless updates

---

## 3. Content Management System

### 3.1 Admin Dashboard

**Access:** `/admin` (protected by NextAuth)

**Features:**
- Content listing with search/filter
- WYSIWYG editor for rich content
- Media library management
- SEO metadata editor
- Preview before publish
- Draft/Published workflow
- Content scheduling
- User management

**Tech Stack:**
- NextAuth for authentication
- TipTap for rich text editing
- Server Actions for mutations
- Optimistic UI updates

### 3.2 Authentication Flow

```
User → /admin → Middleware Check → Redirect to /admin/login
                      ↓
              Enter Credentials
                      ↓
         NextAuth Credentials Provider
                      ↓
         Verify against AdminUser table (bcrypt)
                      ↓
              Generate JWT Session
                      ↓
           Store in HTTP-only cookie
                      ↓
              Access /admin pages
```

**Security Features:**
- JWT sessions (24-hour expiry)
- bcrypt password hashing (10 rounds)
- HTTP-only session cookies
- CSRF protection via Server Actions
- Role-based access control (admin/editor/viewer)
- Last login tracking

### 3.3 Content Editor Features

**Rich Text Editor (TipTap):**
- Bold, italic, underline formatting
- Headings (H1-H6)
- Bulleted and numbered lists
- Links with title attributes
- Images with alt text
- Code blocks with syntax highlighting
- Tables
- Blockquotes
- Horizontal rules

**Media Management:**
- Drag-and-drop upload
- Image optimization pipeline
- Alt text enforcement
- CDN delivery (Vercel/Cloudinary)
- Format conversion (AVIF/WebP)

**SEO Tools:**
- Meta title/description editor
- Keyword density analyzer
- Preview snippets (Google/Twitter/Facebook)
- Canonical URL management
- Schema.org generator

---

## 4. Public-Facing Features

### 4.1 Homepage

**Purpose:** High-converting landing page with brand storytelling

**Sections:**
1. **Hero Section**
   - Animated headline with typing effect
   - Primary CTA (Book a Demo)
   - Background animation (data flow visualization)
   - Mobile-responsive layout

2. **Value Proposition**
   - Three-column benefits grid
   - Icon + headline + description
   - Hover animations

3. **Use Cases Preview**
   - Four featured use cases
   - Card-based layout
   - "Learn More" CTAs

4. **Social Proof**
   - Client logos carousel
   - Testimonials/case study highlights
   - Trust badges (certifications)

5. **Blog Preview**
   - Latest 3 blog posts
   - Excerpt + read time
   - "View All Posts" CTA

6. **Final CTA**
   - Demo booking form
   - Contact information
   - Newsletter signup

**Performance Targets:**
- Lighthouse Score: >90
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

### 4.2 Use Cases Section

**Parent Page:** `/use-cases`
- Grid view of all published use cases
- Filter by category/keyword
- Search functionality
- Sorting options (relevance, alphabetical)

**Detail Page:** `/use-cases/[slug]`
- Hero with background image
- Problem statement section
- Solution overview with visuals
- Benefits list with icons
- Optional case study callout
- PDF download CTA
- Related use cases carousel
- Contact form

**SEO Optimization:**
- Semantic HTML structure
- Schema.org Service markup
- Internal linking to related pages
- Optimized meta tags
- Canonical URLs
- Open Graph images

### 4.3 Blog System

**List Page:** `/blog`
- Paginated post listing (12 per page)
- Filter by tags
- Search by title/content
- Featured post highlight
- Subscribe to newsletter CTA

**Post Page:** `/blog/[slug]`
- Article header (title, author, date)
- Rich content with ToC
- Social sharing buttons
- Author bio box
- Related posts
- Comment section (optional)

**Features:**
- Reading time estimation
- Tag taxonomy
- RSS/Atom feed
- Email notification on new posts
- Social media auto-posting

### 4.4 Contact & Demo Forms

**Contact Form** (`/contact`):
```typescript
interface ContactFormData {
  name: string          // Required
  email: string         // Required, validated
  company?: string      // Optional
  message: string       // Required, 10-1000 chars
  source?: string       // UTM tracking
}
```

**Demo Form** (`/demo`):
```typescript
interface DemoFormData {
  name: string
  email: string
  company: string
  phone?: string
  organization_size: string  // Dropdown
  use_case: string          // Dropdown
  message?: string
  preferred_date?: Date
}
```

**Processing Flow:**
1. Client-side validation (Zod schema)
2. Server Action submission
3. Input sanitization
4. Save to PostgreSQL
5. Sync to HubSpot CRM
6. Send confirmation email
7. Trigger Zapier webhook
8. Analytics event tracking
9. Return success/error state

**Security:**
- Rate limiting (10 submissions per 10 minutes per IP)
- ReCAPTCHA v3 verification
- Input sanitization (DOMPurify)
- CSRF token validation
- Honeypot field for bot detection

### 4.5 Careers Integration

**Source:** Ashby ATS (Applicant Tracking System)

**Features:**
- Embedded job board via iframe
- Job listings managed in Ashby dashboard
- Direct application through Ashby
- Schema.org JobPosting markup
- Equal opportunity employer statement

**Implementation:**
- Iframe embed: `https://jobs.ashbyhq.com/nodaintelligence`
- No API configuration needed (public job board)
- Full-width responsive iframe (800px height)
- Native Ashby filtering and search

---

## 5. Marketing & Lead Generation

### 5.1 Lead Capture Strategy

**Primary CTAs:**
- Book a Demo (header nav, hero sections)
- Download PDF (use case pages)
- Subscribe to Newsletter (blog, footer)
- Contact Sales (solutions page)

**Lead Scoring:**
- Form submission: +10 points
- PDF download: +5 points
- Multiple page views: +2 points
- Return visitor: +3 points
- Blog subscriber: +3 points

Passed to HubSpot for nurture campaigns.

### 5.2 Conversion Tracking

**Events Tracked:**
```typescript
// Contact form events
'form_view'              // User views form
'form_start'             // User begins filling
'form_submit_attempt'    // User clicks submit
'form_submit_success'    // Successful submission
'form_submit_error'      // Validation/server error

// CTA events
'cta_click'              // Any CTA clicked
'demo_request'           // Demo CTA specifically
'pdf_download'           // Resource download

// Engagement events
'page_view'              // Page load
'scroll_depth'           // 25%, 50%, 75%, 100%
'time_on_page'           // >30s, >60s, >120s
'video_play'             // Demo video engagement
```

**Attribution:**
- UTM parameters captured on entry
- First-touch and last-touch models
- Multi-touch attribution via HubSpot
- Campaign ROI reporting

### 5.3 Email Capture & Nurture

**Newsletter Signup:**
- Footer form on all pages
- Popup modal after 30s or exit intent
- Inline CTAs in blog posts
- Gated content (whitepapers)

**Integration:**
- HubSpot mailing lists
- Segmentation by interest/behavior
- Automated drip campaigns
- Unsubscribe management

---

## 6. Analytics & Tracking

### 6.1 Analytics Stack

```
User Interaction
       ↓
Google Tag Manager (Container)
       ↓
  ┌────┴────┬────────┬──────────┐
  ▼         ▼        ▼          ▼
Google    Hotjar   Facebook   HubSpot
Analytics         Pixel      Tracking
```

**Implementation:**
- GTM container loads asynchronously
- All pixels fire through GTM
- Custom dataLayer events
- Consent-aware tracking (GDPR)

### 6.2 Key Metrics

**Traffic Metrics:**
- Unique visitors
- Page views
- Bounce rate
- Session duration
- Traffic sources (organic, paid, referral)

**Engagement Metrics:**
- Pages per session
- Scroll depth
- Click-through rate (CTAs)
- Video completion rate
- Time on use case pages

**Conversion Metrics:**
- Form submission rate
- Demo request rate
- PDF download rate
- Newsletter signup rate
- Cost per lead (paid campaigns)

**SEO Metrics:**
- Organic search traffic
- Keyword rankings
- Click-through rate (SERP)
- Core Web Vitals
- Indexed pages

### 6.3 Reporting Dashboard

**Platform:** Google Analytics 4 + Looker Studio

**Reports:**
- Weekly performance summary
- Monthly SEO report
- Quarterly conversion analysis
- Campaign ROI tracking
- A/B test results

**Automated Alerts:**
- Traffic drops >20%
- Conversion rate drops >15%
- Page errors >100/day
- Form abandonment >50%

---

## 7. Security & Authentication

### 7.1 Security Headers

Configured in `next.config.ts`:

```typescript
{
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': '...'  // See below
}
```

**Content Security Policy:**
```
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline'
  *.googletagmanager.com *.google-analytics.com 
  *.hotjar.com *.hubspot.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: https: blob:;
font-src 'self' data:;
connect-src 'self' *.google-analytics.com *.googletagmanager.com 
  *.hubspot.com *.hotjar.com;
frame-src 'self' *.youtube.com *.vimeo.com;
```

### 7.2 Rate Limiting

**Implementation:** Upstash Redis + Edge Middleware (optional)

**Limits:**
```typescript
{
  '/api/contact': '10 requests per 10 minutes per IP',
  '/api/demo': '5 requests per 10 minutes per IP',
  '/admin/*': '100 requests per minute per user',
  'global': '1000 requests per hour per IP'
}
```

**Behavior:**
- Return 429 status on limit exceeded
- Include retry-after header
- Log to monitoring system
- Auto-ban on repeated violations

### 7.3 Input Validation & Sanitization

**Server-side Validation:**
- Zod schemas for all form inputs
- Email format validation
- String length limits
- XSS prevention via DOMPurify
- SQL injection prevention via Prisma ORM

**Example:**
```typescript
const ContactFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  message: z.string().min(10).max(1000),
})
```

### 7.4 Environment Variables

**Required:**
```bash
DATABASE_URL              # PostgreSQL connection (pooled)
DATABASE_URL_UNPOOLED     # For migrations
NEXTAUTH_SECRET           # 32+ character secret
NEXTAUTH_URL              # Application URL
```

**Optional:**
```bash
HUBSPOT_API_KEY           # CRM integration
RECAPTCHA_SECRET_KEY      # Spam protection
UPSTASH_REDIS_REST_URL    # Rate limiting
UPSTASH_REDIS_REST_TOKEN  # Rate limiting
NEXT_PUBLIC_GA_ID         # Google Analytics
NEXT_PUBLIC_GTM_ID        # Tag Manager
```

**Validation:**
- Zod schema validates on startup
- Missing required vars fail build
- Type-safe access via `lib/env.ts`

---

## 8. API & Integrations

### 8.1 HubSpot CRM Integration

**Purpose:** Lead management and marketing automation

**Endpoints Used:**
```typescript
POST /contacts/v1/contact            // Create contact
POST /contacts/v1/contact/email      // Update by email
GET  /contacts/v1/lists/all          // Get mailing lists
POST /contacts/v1/lists/:id/add      // Add to list
```

**Data Sync:**
```typescript
interface HubSpotContact {
  email: string
  firstname?: string
  lastname?: string
  company?: string
  message?: string
  lifecycle_stage: 'lead' | 'subscriber'
  hs_lead_status: 'NEW' | 'OPEN' | 'CONTACTED'
  source: string  // UTM source
}
```

**Sync Flow:**
1. Form submitted to NODA database
2. Background job syncs to HubSpot
3. HubSpot contact ID stored in database
4. Flag `synced_to_hubspot` set to true
5. Retry logic for failed syncs (3 attempts)

**Webhook Support:**
- HubSpot notifies on contact updates
- Bidirectional sync for lead status
- Real-time notification in admin dashboard

### 8.2 Ashby ATS Integration

**Purpose:** Display job openings on careers page

**Implementation:** Embedded iframe (no API required)

**Embed Code:**
```html
<iframe 
  src="https://jobs.ashbyhq.com/nodaintelligence" 
  width="100%" 
  height="800px" 
  style="border: none"
  title="NODA AI Job Listings"
/>
```

**Features:**
- Ashby manages all job listings
- Native search and filtering
- Direct application submission
- Mobile-responsive design
- Real-time updates (no caching needed)

### 8.3 Internal API Routes

**Contact Submission:**
```
POST /api/contact
Body: { name, email, company?, message }
Response: { success: boolean, id?: string, error?: string }
```

**Demo Request:**
```
POST /api/demo
Body: { name, email, company, phone?, ... }
Response: { success: boolean, id?: string, error?: string }
```

**Newsletter Signup:**
```
POST /api/newsletter
Body: { email }
Response: { success: boolean, error?: string }
```

**Authentication:**
```
POST /api/auth/[...nextauth]
```

All API routes protected by:
- Rate limiting
- Input validation
- CSRF tokens
- Error logging

---

## 9. Performance & SEO

### 9.1 Performance Optimization

**Image Optimization:**
- Next.js Image component for all images
- Automatic format detection (AVIF → WebP → JPEG)
- Responsive image srcsets
- Lazy loading below fold
- Blur placeholder generation
- CDN delivery via Vercel

**Code Splitting:**
- Automatic code splitting per route
- Dynamic imports for heavy components
- Vendor chunking optimization
- Tree shaking unused code

**Caching Strategy:**
```typescript
// Static assets - 1 year
Cache-Control: public, max-age=31536000, immutable

// HTML pages - 1 hour with revalidation
Cache-Control: public, s-maxage=3600, stale-while-revalidate

// API responses - No cache
Cache-Control: no-store
```

**Font Optimization:**
- next/font with local font files
- Font subsetting for used glyphs
- Font display: swap
- Preloading critical fonts

**Script Loading:**
```typescript
<Script src="gtm.js" strategy="afterInteractive" />
<Script src="hotjar.js" strategy="lazyOnload" />
```

### 9.2 SEO Implementation

**Meta Tags (per page):**
```html
<title>{page.title} | NODA Intelligence</title>
<meta name="description" content="{page.meta_description}" />
<link rel="canonical" href="{page.canonical_url}" />
<meta property="og:title" content="{page.title}" />
<meta property="og:description" content="{page.meta_description}" />
<meta property="og:image" content="{page.og_image_url}" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

**Schema.org Markup:**

Organization:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NODA Intelligence",
  "url": "https://nodaintelligence.com",
  "logo": "https://nodaintelligence.com/logo.png",
  "description": "AI Solutions for Government",
  "sameAs": [
    "https://twitter.com/nodaintel",
    "https://linkedin.com/company/noda-intelligence"
  ]
}
```

Service (Use Cases):
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "{useCase.title}",
  "description": "{useCase.meta_description}",
  "provider": {
    "@type": "Organization",
    "name": "NODA Intelligence"
  }
}
```

Article (Blog):
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{post.title}",
  "author": {
    "@type": "Person",
    "name": "{post.author}"
  },
  "datePublished": "{post.published_at}",
  "image": "{post.og_image_url}"
}
```

**Sitemap Generation:**
- Automatic sitemap at `/sitemap.xml`
- Updated on content publish
- Includes priority and changefreq
- Submitted to Search Console

**Robots.txt:**
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://nodaintelligence.com/sitemap.xml
```

### 9.3 Core Web Vitals Targets

| Metric                          | Target  | Current |
|---------------------------------|---------|---------|
| Largest Contentful Paint (LCP)  | < 2.5s  | 1.8s    |
| First Input Delay (FID)         | < 100ms | 45ms    |
| Cumulative Layout Shift (CLS)   | < 0.1   | 0.05    |
| First Contentful Paint (FCP)    | < 1.8s  | 1.2s    |
| Time to Interactive (TTI)       | < 3.8s  | 2.9s    |

**Monitoring:**
- Real User Monitoring (RUM) via Vercel Analytics
- Lighthouse CI on every deploy
- PageSpeed Insights weekly reports
- Search Console Web Vitals dashboard

---

## 10. Developer Experience

### 10.1 Development Workflow

**Local Development:**
```bash
git clone [repository]
npm install
cp .env.example .env.local
# Configure DATABASE_URL
npm run prisma:push
npm run dev  # Starts on port 3003
```

**Feature Development:**
1. Create feature branch: `git checkout -b feature/name`
2. Develop with hot reload
3. Run type check: `npm run type-check`
4. Run tests: `npm run test`
5. Run linter: `npm run lint`
6. Commit with conventional commits
7. Push and create PR
8. Vercel preview deployment auto-created
9. Review and merge to main

**Database Changes:**
```bash
# Development
npm run prisma:push          # Fast, no migration files

# Production
npm run prisma:migrate       # Create migration
git add prisma/migrations
git commit -m "feat(db): add new field"
```

### 10.2 Code Quality Standards

**TypeScript:**
- Strict mode enabled
- No `any` types allowed
- Explicit return types for functions
- Prisma-generated types preferred

**ESLint Rules:**
- Next.js recommended config
- React hooks rules
- Import order enforcement
- Unused variable detection

**Testing Requirements:**
- Unit tests for utilities (>80% coverage)
- E2E tests for critical flows
- Visual regression tests for components
- Performance tests for key pages

### 10.3 Deployment Pipeline

```
Developer Push
       ↓
GitHub Repository
       ↓
Vercel Build
       ├─ Install dependencies
       ├─ Prisma generate
       ├─ Next.js build
       ├─ Run tests
       └─ Lint check
       ↓
Preview Deployment (PR) / Production (main)
       ↓
Smoke Tests
       ↓
Monitoring (Vercel Analytics, Sentry)
```

**Environments:**
- **Development:** Local (port 3003)
- **Preview:** Vercel preview per PR
- **Staging:** `staging` branch
- **Production:** `main` branch

**Rollback Strategy:**
- Instant rollback via Vercel dashboard
- Previous deployment preserved
- Database migrations require manual rollback

### 10.4 Monitoring & Logging

**Application Monitoring:**
- Vercel Analytics (performance)
- Error tracking (built-in or Sentry)
- Uptime monitoring (Vercel)
- Database query performance (Prisma)

**Logs:**
- Server logs via Vercel dashboard
- Database logs (errors only in production)
- API request logs
- Failed webhook logs

**Alerts:**
- Email on deployment failure
- Slack notification on errors >100/hour
- Database connection failures
- Third-party API failures

---

## Appendix A: Environment Setup

### A.1 Required Environment Variables

**Database:**
```bash
DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true"
DATABASE_URL_UNPOOLED="postgresql://user:pass@host:5432/db"
```

**Authentication:**
```bash
NEXTAUTH_SECRET="random-32-character-secret-here"
NEXTAUTH_URL="http://localhost:3003"  # or production URL
```

**Integrations:**
```bash
HUBSPOT_API_KEY="your-key"
RECAPTCHA_SECRET_KEY="your-key"
```

**Analytics (Public):**
```bash
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
NEXT_PUBLIC_GTM_ID="GTM-XXXXXXX"
```

**Rate Limiting (Optional):**
```bash
UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"
```

### A.2 Database Schema

See `prisma/schema.prisma` for complete schema definition.

**Models:** Page, Post, UseCase, CaseStudy, ContactSubmission, AdminUser

**Indexes:**
- All `slug` fields (unique, indexed)
- `published` fields (filtered queries)
- `created_at` fields (sorting)
- `email` fields (lookups)

### A.3 Deployment Checklist

**Pre-Launch:**
- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Admin user created
- [ ] Content populated and published
- [ ] SEO metadata verified
- [ ] Analytics tracking tested
- [ ] Forms tested (with HubSpot sync)
- [ ] Mobile responsiveness verified
- [ ] Accessibility audit passed
- [ ] Performance targets met
- [ ] Security headers verified
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] Sitemap submitted to Search Console
- [ ] 404 page designed
- [ ] Error boundaries tested
- [ ] Monitoring configured

**Post-Launch:**
- [ ] Monitor error rates
- [ ] Verify analytics data flow
- [ ] Check HubSpot lead sync
- [ ] Test form submissions
- [ ] Monitor Core Web Vitals
- [ ] Review user feedback
- [ ] Schedule weekly SEO reports

---

## Appendix B: Maintenance & Support

### B.1 Regular Maintenance Tasks

**Weekly:**
- Review analytics dashboard
- Check for broken links
- Monitor error logs
- Verify form submissions syncing
- Review SEO rankings

**Monthly:**
- Update dependencies (`npm update`)
- Review and optimize slow queries
- Database backup verification
- Security audit
- Content review and updates
- Performance optimization review

**Quarterly:**
- Major dependency updates
- Feature roadmap review
- User feedback synthesis
- A/B test results analysis
- SEO strategy adjustment

### B.2 Support Contacts

**Technical Issues:**
- Repository: [GitHub Issues]
- Hosting: Vercel Support
- Database: Vercel Postgres Support

**Content Management:**
- Admin dashboard: `/admin`
- Documentation: SETUP.md, BEST-PRACTICES.md

---

**Document Version:** 1.0  
**Last Review:** November 2025  
**Next Review:** February 2026
