# Admin CMS Setup Guide

## ✅ What's Been Built

### 1. Authentication System
- **NextAuth.js** configured with credential provider
- **Bcrypt** password hashing
- **JWT** session strategy (24-hour sessions)
- Login page at `/admin/login`
- Secure route protection

### 2. Database Schema
Updated Prisma schema with:
- `AdminUser` model with role-based access
- `CaseStudy` model for customer success stories
- `Post` model for blog management (already existed)
- `UseCase` model (already existed)

### 3. Admin Layout & Navigation
- Protected admin layout at `/admin/*`
- Navigation bar with:
  - Dashboard, Case Studies, Blog Posts, Use Cases
  - User info display
  - Sign out functionality
- Dashboard with stats and quick actions

### 4. Core Files Created

```
app/
├── api/auth/[...nextauth]/route.ts    # NextAuth API handler
└── admin/
    ├── layout.tsx                      # Protected admin layout
    ├── page.tsx                        # Dashboard
    └── login/page.tsx                  # Login page

lib/
├── auth/
│   ├── config.ts                       # NextAuth configuration
│   └── helpers.ts                      # Auth utility functions
└── integrations/
    └── hubspot.ts                      # (Already exists)

components/
└── admin/
    └── admin-nav.tsx                   # Admin navigation

prisma/
└── schema.prisma                       # Updated with CaseStudy + AdminUser role
```

## 🚧 Still To Build

### 1. WYSIWYG Rich Text Editor Component

Create `components/admin/rich-text-editor.tsx` using TipTap:

```typescript
'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'

// Full implementation needed with toolbar
```

### 2. Case Studies CRUD

**Pages to create:**
- `app/admin/case-studies/page.tsx` - List all case studies
- `app/admin/case-studies/new/page.tsx` - Create new case study
- `app/admin/case-studies/[id]/edit/page.tsx` - Edit case study

**API routes:**
- `app/api/admin/case-studies/route.ts` - GET, POST
- `app/api/admin/case-studies/[id]/route.ts` - GET, PUT, DELETE

**Form fields:**
- Title, Client, Industry
- Excerpt (short description)
- Challenge, Solution, Results (WYSIWYG)
- Hero image, Logo image
- Tags (multi-select)
- Metrics (JSON key-value pairs)
- Published status, Featured status
- SEO: Meta description

### 3. Blog Post Management

**Pages to create:**
- `app/admin/blog/page.tsx` - List all blog posts
- `app/admin/blog/new/page.tsx` - Create new post
- `app/admin/blog/[id]/edit/page.tsx` - Edit post

**Features:**
- Rich text editor for content
- Author field
- Tags management
- Publish/draft status
- Scheduled publishing
- SEO fields

### 4. Use Cases Management

**Pages to create:**
- `app/admin/use-cases/page.tsx` - List all use cases
- `app/admin/use-cases/[id]/edit/page.tsx` - Edit use case

**Note:** Use cases already have a schema, just need admin CRUD interface

### 5. Media Upload

**Implementation needed:**
- File upload component
- Image optimization (next/image)
- Storage options:
  - Local `/public/uploads/` (simple)
  - Cloud storage (S3, Cloudinary, etc.)
- Media library browser

### 6. Additional Admin Features

- Contacts/leads viewer (`/admin/contacts`)
- Activity log
- User management (if multi-user)
- Settings page

## 🔧 Setup Instructions

### 1. Run Database Migration

```bash
npx prisma migrate dev --name add_admin_cms
npx prisma generate
```

### 2. Create First Admin User

Create a script `scripts/create-admin.ts`:

```typescript
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = process.argv[2] || 'admin123'
  const email = process.argv[3] || 'admin@nodaai.com'
  
  const hash = await bcrypt.hash(password, 12)
  
  await prisma.adminUser.create({
    data: {
      email,
      password_hash: hash,
      name: 'Admin User',
      role: 'admin',
    },
  })
  
  console.log(`Admin user created: ${email}`)
}

main()
```

Run it:
```bash
npx tsx scripts/create-admin.ts your_password admin@yourcompany.com
```

### 3. Configure Environment Variables

Add to `.env.local`:

```bash
# NextAuth
NEXTAUTH_SECRET="generate-a-random-32-char-string-here"
NEXTAUTH_URL="http://localhost:3003"

# In production:
# NEXTAUTH_URL="https://yourdomain.com"
```

Generate secret:
```bash
openssl rand -base64 32
```

### 4. Build & Test

```bash
npm run dev
```

Visit:
- Login: `http://localhost:3003/admin/login`
- Dashboard: `http://localhost:3003/admin`

## 📝 Implementation Priority

### Phase 1 (Core Functionality)
1. ✅ Authentication
2. ✅ Admin layout
3. ✅ Dashboard
4. ⏳ Rich text editor component
5. ⏳ Case studies CRUD

### Phase 2 (Content Management)
6. ⏳ Blog post CRUD
7. ⏳ Use cases CRUD
8. ⏳ Media upload

### Phase 3 (Additional Features)
9. ⏳ Contacts viewer
10. ⏳ Activity logging
11. ⏳ User management

## 🎨 Component Patterns

### List Page Pattern

```typescript
// app/admin/case-studies/page.tsx
export default async function CaseStudiesList() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { created_at: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Case Studies</h1>
        <Link href="/admin/case-studies/new">
          <Button>New Case Study</Button>
        </Link>
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-lg">
        <table className="w-full">
          {/* Table implementation */}
        </table>
      </div>
    </div>
  )
}
```

### Form Page Pattern

```typescript
// app/admin/case-studies/new/page.tsx
'use client'

export default function NewCaseStudy() {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    // ...
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/admin/case-studies', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    router.push('/admin/case-studies')
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
```

### API Route Pattern

```typescript
// app/api/admin/case-studies/route.ts
import { requireAuth } from '@/lib/auth/helpers'

export async function GET() {
  await requireAuth()
  const caseStudies = await prisma.caseStudy.findMany()
  return NextResponse.json(caseStudies)
}

export async function POST(request: Request) {
  const session = await requireAuth()
  const data = await request.json()
  
  const caseStudy = await prisma.caseStudy.create({
    data: {
      ...data,
      created_by: session.user.id,
    }
  })
  
  return NextResponse.json(caseStudy)
}
```

## 🔐 Security Notes

1. **All admin routes protected** - Layout redirects if not authenticated
2. **Password hashing** - Bcrypt with salt rounds 12
3. **JWT sessions** - 24-hour expiry
4. **Role-based access** - Can extend for editor/viewer roles
5. **CSRF protection** - Built into NextAuth
6. **Input validation** - Add Zod schemas for forms
7. **XSS protection** - React escapes by default, but sanitize WYSIWYG content

## 🚀 Production Deployment

1. Set `NEXTAUTH_URL` to production domain
2. Use strong `NEXTAUTH_SECRET` (32+ characters)
3. Enable HTTPS only
4. Set secure cookie options in authOptions
5. Implement rate limiting on login endpoint
6. Add audit logging for admin actions
7. Regular security updates

## 📚 Tech Stack

- **Next.js 14** - App Router
- **NextAuth.js** - Authentication
- **Prisma** - Database ORM
- **TipTap** - WYSIWYG editor
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## 🎯 Next Steps

To complete the CMS, implement the CRUD pages following the patterns above. Start with case studies as they're the most complex, then replicate for blog posts and use cases.

The authentication and layout foundation is solid. Focus on building out the individual management pages and API routes.
