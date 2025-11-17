# Admin CMS Quick Start Guide

**🚀 Get started with the NODA Intelligence Admin CMS in 5 minutes**

---

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Repository cloned and dependencies installed

---

## Setup (First Time Only)

### 1. Configure Database

```bash
# Copy environment file
cp .env.example .env.local

# Edit .env.local and add your database URL
DATABASE_URL="postgresql://user:password@localhost:5432/noda_intelligence"
DATABASE_URL_UNPOOLED="postgresql://user:password@localhost:5432/noda_intelligence"
```

### 2. Setup NextAuth

```bash
# Generate a secret (32+ characters)
openssl rand -base64 32

# Add to .env.local
NEXTAUTH_SECRET="your-generated-secret-here"
NEXTAUTH_URL="http://localhost:3003"
```

### 3. Initialize Database

```bash
# Push database schema
npm run prisma:push

# Generate Prisma client
npm run prisma:generate
```

### 4. Create Admin User

Create `scripts/create-admin.ts`:

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
  
  console.log(`✅ Admin user created: ${email}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Error:', error)
    process.exit(1)
  })
```

Run it:

```bash
npx tsx scripts/create-admin.ts YourSecurePassword admin@yourcompany.com
```

### 5. Start Development Server

```bash
npm run dev
```

Access admin at: **http://localhost:3003/admin/login**

---

## Daily Usage

### Login

1. Navigate to `http://localhost:3003/admin/login`
2. Enter your email and password
3. Click "Sign In"

### Dashboard

After login, you'll see the dashboard with:
- **Stats cards:** Case Studies, Blog Posts, Use Cases, Recent Contacts
- **Quick actions:** Create new content
- **Navigation:** Access all admin sections

---

## Managing Case Studies

### Create New Case Study

1. Click **"Case Studies"** in nav or **"New Case Study"** on dashboard
2. Fill in the form:

#### Basic Information
- **Title:** Enter case study title (slug auto-generates)
- **Client Name:** Company or organization name
- **Industry:** Select from dropdown
- **Excerpt:** Brief 150-200 character summary
- **Tags:** Press Enter after each tag

#### Content (Rich Text)
- **Challenge:** What problem did the client face?
- **Solution:** How did NODA AI solve it?
- **Results:** What were the measurable outcomes?

Use the toolbar for formatting:
- Headings (H1, H2, H3)
- Bold, Italic, Strikethrough
- Bullet & numbered lists
- Blockquotes & code blocks
- Links & images

#### Images
- **Hero Image:** Main header image URL
- **Client Logo:** Optional company logo URL
- Preview appears below URL input

#### SEO
- **Meta Description:** 150-160 character SEO description

#### Publishing
- Toggle **Published** to make it live
- Toggle **Featured** to highlight on homepage

3. Click **"Create Case Study"**

### Edit Case Study

1. Go to **Case Studies** list
2. Click **"Edit"** on any case study
3. Make changes
4. Click **"Save Changes"**
5. Or click **"Delete Case Study"** to remove (with confirmation)

---

## Managing Contacts

### View Submissions

1. Click **"Contacts"** in navigation
2. View stats dashboard:
   - Total submissions
   - Last 30 days
   - HubSpot sync status
3. Browse table with:
   - Name, Email, Company
   - Message preview
   - UTM source tracking
   - Sync status badges
   - Submission date/time

### Features
- Click email to send message (opens mailto:)
- Check HubSpot sync status (Synced/Pending badges)
- View UTM source for tracking campaigns
- All submissions auto-sync to HubSpot

---

## Common Tasks

### Update Your Password

Currently requires database access. Run:

```bash
npx tsx scripts/update-password.ts your.email@company.com NewPassword123
```

### View Database

```bash
npm run prisma:studio
```

Opens Prisma Studio at `http://localhost:5555`

### Check Logs

Development server logs appear in terminal where you ran `npm run dev`

### Sign Out

Click **"Sign Out"** in top-right navigation

---

## Keyboard Shortcuts (Rich Text Editor)

- **Ctrl/Cmd + B** - Bold
- **Ctrl/Cmd + I** - Italic
- **Ctrl/Cmd + Z** - Undo
- **Ctrl/Cmd + Shift + Z** - Redo
- **Ctrl/Cmd + K** - Add link (after prompt)
- **Enter** in tag input - Add tag
- **Backspace** in empty tag input - Remove last tag

---

## Tips & Best Practices

### Content Writing

✅ **DO:**
- Write clear, concise titles
- Use descriptive slugs (auto-generated but editable)
- Include all required fields (marked with *)
- Add relevant tags for organization
- Optimize meta descriptions for SEO
- Preview images before saving
- Check content in rich text editor

❌ **DON'T:**
- Use special characters in slugs
- Leave required fields empty
- Make slugs too long (keep under 60 chars)
- Forget to set Published = true when ready
- Skip meta descriptions

### Images

- Use HTTPS URLs
- Recommended sizes:
  - Hero images: 1200×600px
  - Logos: 400×200px
- Use CDN links when possible
- Test image URLs before saving

### SEO

- Meta descriptions: 150-160 characters
- Include target keywords naturally
- Unique description for each page
- Avoid duplicate content

---

## Troubleshooting

### Can't Login

**Problem:** Invalid credentials error

**Solutions:**
1. Verify email/password are correct
2. Check if user exists in database (`npm run prisma:studio`)
3. Reset password using script
4. Check `NEXTAUTH_SECRET` in `.env.local`

### Slug Already Exists

**Problem:** "A case study with this slug already exists"

**Solution:** Change the slug to be unique

### Image Not Loading

**Problem:** Image shows error placeholder

**Solutions:**
1. Verify image URL is accessible
2. Check URL starts with `https://`
3. Ensure no CORS issues
4. Try different image host

### Form Not Submitting

**Problem:** Form validation errors or submission fails

**Solutions:**
1. Check all required fields are filled
2. Verify rich text content is not empty
3. Check browser console for errors
4. Ensure session hasn't expired (sign in again)

### Database Connection Error

**Problem:** Can't connect to database

**Solutions:**
1. Verify PostgreSQL is running
2. Check `DATABASE_URL` in `.env.local`
3. Test connection: `npm run prisma:studio`
4. Regenerate Prisma client: `npm run prisma:generate`

---

## Support

### Documentation
- **ADMIN-CMS-IMPLEMENTATION.md** - Full technical documentation
- **SETUP.md** - Complete setup guide
- **BEST-PRACTICES.md** - Development standards

### Commands Reference

```bash
# Development
npm run dev                    # Start dev server (port 3003)
npm run build                  # Build for production
npm run start                  # Start production server

# Database
npm run prisma:generate        # Generate Prisma client
npm run prisma:push            # Push schema to database
npm run prisma:migrate         # Create migration
npm run prisma:studio          # Open database GUI

# Testing
npm run lint                   # Run ESLint
npm run type-check             # TypeScript check
```

---

## Next Steps

### Coming Soon
- Blog post management
- Use case management
- Media library
- User management

### Stay Updated
- Check **ADMIN-CMS-IMPLEMENTATION.md** for latest features
- Review **PROJECT-STATUS.md** for roadmap

---

**🎉 You're ready to use the admin CMS!**

For questions or issues, refer to the full documentation or contact the development team.
