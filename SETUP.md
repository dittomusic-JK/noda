# NODA Intelligence - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+ (or Vercel Postgres)
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
- `DATABASE_URL`: Your PostgreSQL connection string
- Other API keys as needed (optional for initial development)

3. **Set up database**
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations (or push schema for development)
npm run prisma:push
```

4. **Run development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
noda-intelligence-web/
├── app/                      # Next.js 15 App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── api/                 # API routes
│   └── ...                  # Other pages
├── components/              # Reusable components
│   ├── ui/                  # Base UI components
│   ├── layout/              # Layout components (Nav, Footer)
│   ├── sections/            # Page sections
│   └── forms/               # Form components
├── lib/                     # Utilities and helpers
│   ├── db/                  # Database utilities
│   ├── api/                 # API clients
│   ├── utils/               # Utility functions
│   └── hooks/               # Custom React hooks
├── types/                   # TypeScript types
├── prisma/                  # Prisma schema and migrations
├── public/                  # Static assets
├── BEST-PRACTICES.md        # Development best practices
└── nodaintelligence-techspec.md  # Technical specification
```

---

## 🗄️ Database

### Development Workflow

**Generate Prisma Client** (after schema changes)
```bash
npm run prisma:generate
```

**Create Migration** (for production)
```bash
npm run prisma:migrate
```

**Push Schema** (for development - faster)
```bash
npm run prisma:push
```

**Open Prisma Studio** (database GUI)
```bash
npm run prisma:studio
```

### Seeding Data

Create a seed file at `prisma/seed.ts` and run:
```bash
npm run prisma:seed
```

---

## 🎨 Development

### Running Tests

**Unit Tests**
```bash
npm run test
npm run test:watch  # Watch mode
```

**E2E Tests**
```bash
npm run test:e2e
```

**Type Checking**
```bash
npm run type-check
```

**Linting**
```bash
npm run lint
```

### Best Practices

See [BEST-PRACTICES.md](./BEST-PRACTICES.md) for comprehensive development guidelines including:
- Next.js 15 patterns
- TypeScript conventions
- Security practices
- Performance optimization
- Testing strategies

---

## 🔒 Security

### Environment Variables

**Never commit `.env.local`** - it contains secrets!

Required for production:
- `DATABASE_URL`
- `SESSION_SECRET` (32+ characters)
- API keys (Hubspot, ReCAPTCHA, etc.)

Optional for development:
- `UPSTASH_REDIS_REST_URL` (rate limiting)
- `UPSTASH_REDIS_REST_TOKEN`

### Security Features

✅ Security headers configured in `next.config.ts`
✅ Rate limiting middleware (optional with Upstash Redis)
✅ Input sanitization utilities
✅ CSRF protection via Server Actions
✅ Environment variable validation

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect GitHub repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Set build command**: `prisma generate && next build`
4. **Deploy** - automatic on push to main

### Environment Setup in Vercel

Add these environment variables:
- `DATABASE_URL`
- `DATABASE_URL_UNPOOLED` (for migrations)
- `SESSION_SECRET`
- All API keys
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_GTM_ID`

### Database Migrations on Vercel

Vercel runs `prisma generate` automatically, but for migrations:

```bash
# Run locally first
npm run prisma:migrate

# Then commit migration files
git add prisma/migrations
git commit -m "feat(db): add new migration"
git push
```

---

## 📊 Monitoring

### Performance

- Vercel Analytics (built-in)
- Lighthouse CI on each deploy
- Core Web Vitals tracking

### Analytics

- Google Tag Manager (GTM)
- Google Analytics 4 (GA4)
- Hotjar (behavior analytics)

### Error Tracking

Configure error boundaries in `app/error.tsx` and global error handler.

---

## 🛠️ Common Tasks

### Adding a New Page

1. Create file in `app/` directory:
```tsx
// app/about/page.tsx
export const metadata = {
  title: 'About NODA Intelligence',
  description: '...',
}

export default function AboutPage() {
  return <div>About content</div>
}
```

### Adding a New Component

1. Create in appropriate folder:
```tsx
// components/ui/button.tsx
import { ButtonProps } from '@/types/components'

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return <button {...props}>{children}</button>
}
```

### Adding a New Database Model

1. Update `prisma/schema.prisma`
2. Run `npm run prisma:migrate` or `npm run prisma:push`
3. Update TypeScript types if needed

### Creating an API Route

1. Create Server Action or API Route:
```tsx
// app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const data = await request.json()
  // Handle request
  return NextResponse.json({ success: true })
}
```

---

## 🐛 Troubleshooting

### Prisma Issues

**"Prisma Client not generated"**
```bash
npm run prisma:generate
```

**"Can't reach database"**
- Check `DATABASE_URL` in `.env.local`
- Ensure PostgreSQL is running

### Build Issues

**Type errors**
```bash
npm run type-check
```

**Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Technical Specification](./nodaintelligence-techspec.md)
- [Best Practices](./BEST-PRACTICES.md)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Make changes following best practices
3. Test thoroughly: `npm run test && npm run type-check && npm run lint`
4. Commit: `git commit -m "feat(scope): description"`
5. Push: `git push origin feature/amazing-feature`
6. Create Pull Request

---

## 📞 Support

For questions or issues:
- Check [BEST-PRACTICES.md](./BEST-PRACTICES.md)
- Review [Technical Spec](./nodaintelligence-techspec.md)
- Contact the development team
