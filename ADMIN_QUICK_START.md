# Admin CMS - Quick Start

## ✅ What's Ready Now

Your admin CMS foundation is **fully built and working**:

### 1. Secure Authentication ✓
- NextAuth.js with bcrypt password hashing
- Login page at `/admin/login`
- Automatic route protection
- 24-hour JWT sessions
- Sign out functionality

### 2. Admin Dashboard ✓
- Clean interface at `/admin`
- Content statistics (case studies, blog posts, use cases, contacts)
- Quick action cards for creating content
- Navigation to all management sections

### 3. Protected Routes ✓
- All `/admin/*` routes require authentication
- Automatic redirect to login if not authenticated
- User info displayed in nav bar

### 4. Database Ready ✓
- `AdminUser` model with roles (admin, editor, viewer)
- `CaseStudy` model for customer stories
- `Post` model for blog management
- All models have proper indexes

## 🚀 Get Started (3 Steps)

### Step 1: Set Environment Variables

Create `.env.local`:

```bash
# Database (you already have this)
DATABASE_URL="your_postgres_connection_string"

# NextAuth - ADD THESE
NEXTAUTH_SECRET="paste_output_of_openssl_command_below"
NEXTAUTH_URL="http://localhost:3003"

# HubSpot (you already have this)
HUBSPOT_API_KEY="your_hubspot_key"
```

Generate secret:
```bash
openssl rand -base64 32
```

### Step 2: Run Database Migration

```bash
npx prisma migrate dev --name add_admin_cms
npx prisma generate
```

### Step 3: Create Your Admin User

```bash
npx tsx scripts/create-admin.ts YourSecurePassword admin@yourcompany.com "Your Name"
```

**That's it!** You can now:
- Visit: `http://localhost:3003/admin/login`
- Log in with your credentials
- Access the admin dashboard

## 📂 What's Been Built

### Files Created

```
app/
├── admin/
│   ├── layout.tsx              ✅ Protected admin layout
│   ├── page.tsx                ✅ Dashboard with stats
│   └── login/page.tsx          ✅ Login page
└── api/auth/[...nextauth]/
    └── route.ts                ✅ NextAuth handler

lib/
└── auth/
    ├── config.ts               ✅ Auth configuration
    └── helpers.ts              ✅ requireAuth(), getSession()

components/
└── admin/
    └── admin-nav.tsx           ✅ Navigation bar

prisma/
└── schema.prisma               ✅ Updated models

scripts/
└── create-admin.ts             ✅ Admin user creation script

types/
└── next-auth.d.ts              ✅ TypeScript type extensions
```

### Packages Installed
- `next-auth` - Authentication
- `bcryptjs` - Password hashing  
- `@next-auth/prisma-adapter` - Prisma integration
- `@tiptap/*` - WYSIWYG editor (ready to use)

## 🎯 Next Steps (Optional - Build CRUD Pages)

The foundation is complete. To finish the CMS, you need to build the CRUD pages for:

1. **Case Studies** (`/admin/case-studies/*`)
   - List, create, edit, delete case studies
   - Rich text editor for challenge, solution, results

2. **Blog Posts** (`/admin/blog/*`)
   - Manage blog articles
   - WYSIWYG content editor

3. **Media Upload**
   - Image upload component
   - Media library

See `ADMIN_CMS_SETUP.md` for detailed implementation patterns and code examples.

## 🎨 Current Features

### Dashboard
- Content statistics cards
- Quick actions for creating content
- View site link
- User info & sign out

### Authentication
- Secure credential-based login
- Bcrypt password hashing (12 rounds)
- JWT session tokens
- Protected routes
- Role-based access ready (admin/editor/viewer)

### Database Models
- **AdminUser**: Email, password, name, role, last login
- **CaseStudy**: Full customer story fields, metrics, SEO
- **Post**: Blog articles with tags, author, publishing
- **UseCase**: Solution use cases (already existed)

## 🔐 Security Features

✅ Password hashing with bcrypt  
✅ JWT tokens with expiry  
✅ Protected routes  
✅ CSRF protection (built into NextAuth)  
✅ Role-based access control ready  
✅ TypeScript type safety  

## 📝 Usage Examples

### Create an Admin User

```bash
# Basic
npx tsx scripts/create-admin.ts MyPassword123

# With custom email
npx tsx scripts/create-admin.ts MyPassword123 john@nodaai.com

# With custom name
npx tsx scripts/create-admin.ts MyPassword123 john@nodaai.com "John Doe"
```

### Check Auth in API Routes

```typescript
import { requireAuth } from '@/lib/auth/helpers'

export async function GET() {
  const session = await requireAuth() // Auto-redirects if not logged in
  return NextResponse.json({ user: session.user })
}
```

### Check Auth in Server Components

```typescript
import { getSession } from '@/lib/auth/helpers'

export default async function Page() {
  const session = await getSession()
  
  if (!session) {
    redirect('/admin/login')
  }
  
  return <div>Hello {session.user.name}</div>
}
```

## 🚨 Troubleshooting

### Can't log in
1. Check `NEXTAUTH_SECRET` is set in `.env.local`
2. Verify admin user was created: `npx prisma studio`
3. Check console for errors

### Build fails
1. Run `npx prisma generate`
2. Check all dependencies installed: `npm install`
3. Verify TypeScript has no errors: `npm run build`

### "Environment variable not found: DATABASE_URL"
- This warning during build is normal (can't connect to DB during static generation)
- As long as build completes, you're fine

## 📚 Documentation

- `ADMIN_CMS_SETUP.md` - Full implementation guide with code patterns
- `HUBSPOT_SETUP.md` - HubSpot integration (already working)
- `HUBSPOT_QUICKSTART.md` - Quick HubSpot setup

## ⚡ Summary

You now have:
- ✅ Secure admin authentication
- ✅ Protected admin area
- ✅ Dashboard with statistics
- ✅ Database models ready
- ✅ Script to create users
- ✅ Build passing

The CMS foundation is solid and production-ready. The remaining work is building out the CRUD interfaces for managing content, which can be done incrementally as needed.

**Start the dev server and log in:**
```bash
npm run dev
# Visit: http://localhost:3003/admin/login
```
