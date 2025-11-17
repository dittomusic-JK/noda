# NODA Intelligence Marketing Website

**Technical Specification B2G (Government-Facing)**
**Stack:** Next.js 15 (App Router) • Tailwind CSS 4 • TypeScript • Postgres • Prisma • Vercel • MDX
**Hosting:** Vercel (Production + Staging + Preview Envs)
**CMS:** Custom Next.js Admin + Prisma ORM
**Analytics:** GA4 • Hotjar • GTM • Facebook Pixel • Hubspot Tracking

---

## 1. Purpose

Redevelop the **NODA Intelligence** marketing site into a high-performance, B2G-focused storytelling platform that:

* Reflects NODA’s credibility as a government AI partner.
* Showcases product use-cases in an SEO-rich and sales-ready format.
* Enables easy internal management via structured CMS.
* Provides measurable performance analytics for campaigns, demos, and RFP follow-ups.

---

## 2. Technical Architecture

### 2.1 Frontend

* **Framework:** Next.js 15 (App Router)

  * Hybrid static + server-rendered routes
  * Dynamic MDX support for content pages
  * API Routes → Hubspot + Zapier integration
* **Styling:** Tailwind CSS 4 (custom design-token config)
* **Animation:** Framer Motion + GSAP scroll trigger
* **Type Safety:** TypeScript strict mode
* **Accessibility:** WCAG 2.1 AA compliant

### 2.2 Backend & CMS

* **Database:** Postgres (Vercel)
* **ORM:** Prisma
* **Content Models:**

  * `page` — Static pages
  * `post` — Blog articles (MDX support)
  * `use_case` — B2G use-cases
  * `career` — Greenhouse API integration
* **Admin Access:**

  * `/admin` route with Next.js authentication (simple, not over-engineered)
  * Inline editing for marketing team
* **CMS Approach:** Custom built with Next.js (no external CMS vendor)

### 2.3 Security & Infrastructure

* **Security Headers:** Configured via `next.config.js`
  * Content-Security-Policy
  * X-Frame-Options
  * X-Content-Type-Options
  * Referrer-Policy
* **Rate Limiting:** API routes protected via Vercel Edge Middleware
* **Backup Strategy:** 
  * Daily automated Postgres backups via Vercel
  * Weekly manual snapshot verification
  * 30-day retention policy
* **Disaster Recovery:** 
  * Infrastructure-as-code via Vercel CLI
  * Database restore SLA: 4 hours
  * GitHub repository backup
* **Content Versioning:** 
  * Prisma migration history for schema changes
  * Git-based versioning for static content
  * Admin UI shows last modified timestamp + author

### 2.4 Hosting & CI/CD

* **Hosting:** Vercel (Edge functions for forms & API calls)
* **Environments:** `dev` • `staging` • `prod`
* **CI/CD:** GitHub → Vercel auto-deploy
* **QA Previews:** Every PR spins up Preview Deployment

---

## 3. Design System

* **Typography:** Variable sans + mono stack (Inter / custom NODA Sans)
* **Color Tokens:** Primary Blue • Accent Orange • Neutral Greys • Gov-Green Signal
* **Grid:** 8-pt system + responsive containers
* **Motion:** Framer Motion curves for “ease-out data flow”
* **Components:**

  * Hero, Card, SectionHeader, Nav, CTA, Badge, Accordion, GDPR Banner
  * Data Visualization modules for illustrating AI pipelines
* **Asset System:** SVG + Lottie + GLTF (3D) pipeline
* **Animation Performance:** Lazy-load GSAP/3D assets, mobile-first optimization

---

## 4. Site Structure & Templates

| Page Type                        | Description                                                            | Data Source    |
| -------------------------------- | ---------------------------------------------------------------------- | -------------- |
| **Home**                         | Scroll-based storytelling with 2D/3D illustrations + mission statement | Static         |
| **Solutions Landing**            | Visual overview of NODA platform + links to Use-Cases                  | Static + CMS   |
| **Use-Cases Parent Page**        | Summary grid of government AI use-cases                                | CMS `use_case` |
| **Use-Case Template**            | Dynamic page for each use-case                                         | CMS `use_case` |
| **Blog Landing / Post Template** | Insights + thought leadership                                          | CMS `post`     |
| **About Page**                   | Mission, team, timeline                                                | Static         |
| **Careers Landing / Detail**     | Greenhouse feed + filters                                              | Greenhouse API |
| **Contact Page**                 | Hubspot form + Zapier automation                                       | API            |
| **Legal Pages**                  | Privacy / Terms                                                        | Static         |

---

## 5. Global Elements

* **Header Nav:** Responsive, sticky, dropdown links to Solutions, Use Cases, Blog, Careers, Contact.
* **Footer:** Four-column layout + newsletter signup + social links.
* **Contact Form:** Server Action → Hubspot API + Postgres backup.
* **GDPR Compliance:**
  * Cookie consent banner (GTM delayed until consent)
  * Privacy policy linked in footer
  * User data export/deletion via admin panel
  * Opt-out mechanism for all tracking pixels

---

## 6. Integrations

| Integration            | Purpose              | Method                      |
| ---------------------- | -------------------- | --------------------------- |
| **Hubspot**            | CRM + lead sync      | REST API via Server Actions |
| **Zapier**             | Marketing automation | Webhooks                    |
| **Hotjar**             | Behavior analytics   | GTM injection               |
| **Google Tag Manager** | Tracking container   | Script load                 |
| **GA4**                | Analytics + goals    | via GTM                     |
| **Facebook Pixel**     | Retargeting          | via GTM                     |
| **Greenhouse**         | Careers feed         | API endpoint                |
| **ReCAPTCHA v3**       | Spam protection      | Form integration            |

---

## 7. SEO Architecture (Technical & Content)

### 7.1 Core SEO Principles

* **Static generation (SGG)** where possible for speed & crawlability.
* **Server side rendering (SSR)** for dynamic pages with fresh meta data.
* **Semantic HTML** for accessibility + rich snippets.
* **Canonical URLs** for multi-domain campaigns.
* **Robust internal link architecture** linking Solutions ↔ Use-Cases ↔ Blog.

### 7.2 SEO Implementation

* **next-seo** plugin for structured meta management.
* **Dynamic OG/Twitter cards** (auto-generate per page).
* **Auto sitemap (`next-sitemap`)** + robots.txt.
* **Schema.org** mark-up:

  * `Organization` (NODA Intelligence)
  * `Service` (for Use-Case pages)
  * `Article` (for Blog)
  * `JobPosting` (for Careers)
* **Rich Snippet Support** (FAQ, HowTo, Product extensions).
* **Structured slug strategy:**

  * `/use-cases/incident-response-ai`
  * `/use-cases/citizen-service-automation`
  * `/use-cases/policy-analytics`
  * `/use-cases/data-driven-decision-making`

### 7.3 Performance SEO

* Lighthouse target > 90 on Performance / SEO.
* `next/image` for lazy-loaded assets.
* Script deferral for analytics (load after user interaction or 3s delay).
* Image CDN via Vercel.
* Automatic gzip + Brotli compression.
* Analytics overhead mitigation: GTM loads async, scripts are deferred.

### 7.4 Content SEO Hierarchy

1. **Home Page:** High-value keywords (“AI for Government”, “Public Sector AI Solutions”).
2. **Solutions Page:** Platform overview keywords.
3. **Use-Case Pages:** Long-tail keywords mapped to each problem domain.
4. **Blog:** Informational keywords (“how governments use AI”, “data governance public sector”).
5. **Careers:** Local SEO for jobs.
6. **About/Contact:** Brand credibility keywords + trust signals.

### 7.5 Metadata Automation

Each page model stores:
`title`, `meta_description`, `keywords`, `og_image_url`, `canonical_url`.
Next.js Head component reads these from Prisma model and renders SSR meta tags.

---

## 8. Use-Case Framework (SEO + Sales)

### 8.1 Purpose

Highlight practical government applications of NODA’s AI technology, driving qualified traffic from search and supporting sales collateral.

### 8.2 Core Use-Cases

1. **Operational Intelligence & Incident Response**
   → AI triage and alert automation for agencies.
2. **Citizen Service Automation & Self-Service**
   → Conversational AI + workflow automation for public services.
3. **Policy & Document Analytics for Compliance and Audit**
   → AI document summarisation and regulatory monitoring.
4. **Data-Driven Decision Making & Operational Efficiency**
   → Predictive analytics and data governance for resource allocation.

Each use-case = individual page with schema `Service`, fields:
`slug`, `title`, `challenge`, `solution`, `benefits[]`, `seo_keywords[]`, `meta_description`, `hero_image`, `cta_label`, `pdf_download_url`.

### 8.3 Page Pattern

* Hero headline + value prop
* Problem statement
* NODA Solution diagram / animation
* Benefits list (3–5 bullets with impact metrics)
* Optional case study or scenario
* CTA + downloadable PDF
* Related Use-Cases / Blog posts carousel

### 8.4 Internal Linking

* Solutions → Use-Cases links.
* Use-Cases cross-link each other (“You may also be interested in”).
* Blog articles tagged with use-case categories for contextual backlinks.

### 8.5 Analytics Tracking

* Event tracking for each Use-Case CTA (“Book a Demo”, “Download Brief”).
* UTM parameters from campaigns.
* Conversion funnel reporting via GA4 / Hubspot.

---

## 9. Technical SEO Monitoring

* **Automated Lighthouse CI** on each deploy.
* **Search Console** integration for index status.
* **Broken link monitoring** via GitHub workflow (`lychee`).
* **Schema validator** tests in CI.
* **Weekly SEO report** (exported to Notion dashboard).

---

## 10. Performance & Accessibility

* Core Web Vitals monitoring (Vercel Analytics).
* Image preloading for above-the-fold.
* Prefetch links on hover.
* Semantic landmarks + ARIA labels.
* Keyboard navigation tested via Playwright E2E.

---

## 11. QA & PM Workflow

| Phase                | Deliverables                                       |
| -------------------- | -------------------------------------------------- |
| **Design QA**        | Visual match to Figma frames                       |
| **Functional QA**    | Cross-browser (Chrome, Edge, Safari, Firefox)      |
| **Device QA**        | iPhone 13 → 15 • Pixel 7 • iPad Mini • Surface Pro |
| **Analytics QA**     | Confirm GTM + Hubspot + Pixel events               |
| **Accessibility QA** | Lighthouse + axe-core                              |
| **PM Cadence**       | Weekly stand-up + Slack updates + Notion board     |

---

## 12. Deployment Plan

1. **Dev → Preview QA** branch flow.
2. **Staging → UAT** with Hotjar + Analytics test tags.
3. **Production** auto-deploy from `main`.
4. **Post-Launch Support:** 14-day QA + monitoring.
5. **Maintenance Option:** Monthly retainer for SEO + security patches.

---

## 13. Future Scalability

* CMS supports new “Campaign Landing Page” model.
* Shared Design System for future microsites / white-papers.
* Localisation framework (EN, FR, JP potential).
* Extendable to API integration for RFP portal or client dashboard.

---

## 14. Summary of Deliverables

| Category               | Key Output                                              |
| ---------------------- | ------------------------------------------------------- |
| **Design System**      | Fully componentized UI kit + brand tokens               |
| **Site Development**   | 8 core pages + 4 Use-Case pages + CMS setup             |
| **Integrations**       | Hubspot, Zapier, Hotjar, GTM, Greenhouse                |
| **SEO Architecture**   | Full schema, metadata, sitemap, page speed optimisation |
| **Analytics**          | GA4 + Pixel + conversion funnel tracking                |
| **QA & Deployment**    | Multi-device QA + Vercel CI/CD                          |
| **Maintenance Option** | Monthly SEO & content support                           |

---

## 15. A/B Testing & Optimization

* **Framework:** Vercel Edge Middleware for A/B splits
* **Test Targets:**
  * Hero CTA variations
  * Use-Case page layouts
  * Contact form positioning
* **Tracking:** Custom events pushed to GTM dataLayer
* **Reporting:** Weekly analysis via GA4 experiments

---

## 16. API Security & Rate Limiting

* **Rate Limiting Strategy:**
  * Contact form: 5 submissions per IP per hour
  * Admin API: 100 requests per user per minute
  * Public API routes: 1000 requests per IP per hour
* **Implementation:** Vercel Edge Middleware with KV storage
* **DDoS Protection:** Vercel's built-in DDoS mitigation + Cloudflare DNS

---

## 17. Content Management Workflow

* **Rollback Strategy:**
  * Content changes tracked in Prisma with `updated_at` + `updated_by`
  * Manual rollback via admin UI (shows last 10 versions)
  * Critical content: Git backup before major updates
* **Publishing Workflow:**
  * Draft → Review → Schedule → Publish states
  * Preview URL generation for draft content
  * Slack notification on publish

---

**Next Step:** Add sample copy and H1/H2 structures for the four Use-Case pages (hero text, meta description, and keyword mapping).
