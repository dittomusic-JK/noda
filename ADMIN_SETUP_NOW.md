# Admin CMS - Setup Instructions

## ✅ Files Created & Ready

All code is in place. You just need to:
1. Configure database
2. Run migration  
3. Create admin user

## 🗄️ Step 1: Database Setup (Choose One)

### Option A: Use a Cloud Database (Easiest)

**Recommended: Supabase (Free tier available)**

1. Go to [supabase.com](https://supabase.com) and create account
2. Create a new project
3. Go to Project Settings → Database
4. Copy the "Connection string" (URI format)
5. Paste it in `.env.local` as `DATABASE_URL`

**Other options:**
- [Railway](https://railway.app) - Free PostgreSQL
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [ElephantSQL](https://elephantsql.com) - Free tier

### Option B: Local PostgreSQL

If you have PostgreSQL installed locally:

```bash
# Create database
createdb noda_intelligence

# Update .env.local with:
DATABASE_URL="postgresql://YOUR_USER:YOUR_PASSWORD@localhost:5432/noda_intelligence"
```

## 📝 Step 2: Update .env.local

Your `.env.local` already exists with:
- ✅ NEXTAUTH_SECRET (generated)
- ✅ NEXTAUTH_URL="http://localhost:3003"
- ⚠️  DATABASE_URL (needs your connection string)

**Just update the DATABASE_URL line with your actual database connection string.**

## 🚀 Step 3: Run Migration & Create Admin User

### Automated Setup (Recommended)

Run the setup script:

```bash
./scripts/setup-admin.sh
```

This will:
1. Run database migrations
2. Prompt you for admin credentials
3. Create the admin user

### Manual Setup

If you prefer to do it manually:

```bash
# 1. Run migration
npx prisma migrate dev --name add_admin_cms

# 2. Generate Prisma client
npx prisma generate

# 3. Create admin user
npx tsx scripts/create-admin.ts YourPassword admin@yourcompany.com "Your Name"
```

## ✨ Step 4: Start & Login

```bash
# Start dev server
npm run dev

# Visit in browser
http://localhost:3003/admin/login
```

## 🔧 Quick Setup for Testing

If you just want to test quickly without setting up a real database:

1. **Use Supabase** (fastest):
   - Create account at supabase.com
   - New project → copy connection string
   - Paste in `.env.local`
   - Run `./scripts/setup-admin.sh`
   - Done!

## 📋 What's in .env.local

Current file location: `/Volumes/Extreme Pro/ClientApps/NODA-Intelligence/noda-intelligence-web/.env.local`

```bash
# Database - UPDATE THIS LINE
DATABASE_URL="postgresql://user:password@localhost:5432/noda_intelligence"

# NextAuth (Already configured ✅)
NEXTAUTH_SECRET="dXR2phfNdslRyZA32gX1ywbRntQBD9Sx1HRDjW2d92w="
NEXTAUTH_URL="http://localhost:3003"

# HubSpot (Optional)
# HUBSPOT_API_KEY="your-key"

NODE_ENV="development"
```

## 🎯 Summary

**You're 90% there!** Just need to:

1. Get a PostgreSQL database (Supabase is easiest - 2 minutes)
2. Update `DATABASE_URL` in `.env.local`
3. Run `./scripts/setup-admin.sh`
4. Login at `http://localhost:3003/admin/login`

## 🆘 Troubleshooting

### "Environment variable not found: DATABASE_URL"
- Check `.env.local` exists in project root
- Verify DATABASE_URL line is uncommented and has a value
- Try: `cat .env.local | grep DATABASE_URL`

### "Error connecting to database"
- Verify your database is running (if local)
- Check connection string format is correct
- Test connection: `npx prisma db push`

### "prisma command not found"
- Run: `npm install`
- Try with npx: `npx prisma migrate dev`

### Migration fails
- Make sure database exists
- Check DATABASE_URL format
- Try: `npx prisma db push` instead of migrate

## 📚 More Info

- `ADMIN_QUICK_START.md` - Feature overview
- `ADMIN_CMS_SETUP.md` - Full implementation guide
- `HUBSPOT_SETUP.md` - HubSpot integration

## 🎉 What You Get

Once set up, you'll have:
- Secure admin login at `/admin/login`
- Dashboard with content statistics
- Ready to build CRUD interfaces for:
  - Case studies
  - Blog posts
  - Use cases
- All authentication working
- Database models ready
