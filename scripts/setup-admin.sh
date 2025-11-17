#!/bin/bash

# NODA AI Admin Setup Script
# This script sets up the database and creates an admin user

set -e

echo "🚀 NODA AI Admin Setup"
echo "======================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating from .env.example..."
    cp .env.example .env.local
    
    # Generate NextAuth secret
    SECRET=$(openssl rand -base64 32)
    
    # Update .env.local
    sed -i '' "s|NEXTAUTH_SECRET=\".*\"|NEXTAUTH_SECRET=\"$SECRET\"|" .env.local
    sed -i '' "s|NEXTAUTH_URL=\".*\"|NEXTAUTH_URL=\"http://localhost:3003\"|" .env.local
    
    echo "✅ Created .env.local with generated NEXTAUTH_SECRET"
    echo ""
    echo "⚠️  IMPORTANT: You need to configure DATABASE_URL in .env.local"
    echo "   Example for local PostgreSQL:"
    echo "   DATABASE_URL=\"postgresql://user:password@localhost:5432/noda_intelligence\""
    echo ""
    echo "   Or use a cloud database (Supabase, Railway, etc.)"
    echo ""
    read -p "Press Enter after you've configured DATABASE_URL..."
fi

# Check if DATABASE_URL is set
if ! grep -q "^DATABASE_URL=" .env.local || grep -q "^DATABASE_URL=\"\"" .env.local; then
    echo "❌ DATABASE_URL not configured in .env.local"
    echo "   Please add your PostgreSQL connection string and run this script again."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name add_admin_cms

echo ""
echo "👤 Creating admin user..."
echo ""

# Prompt for admin details
read -p "Admin email (default: admin@nodaai.com): " ADMIN_EMAIL
ADMIN_EMAIL=${ADMIN_EMAIL:-admin@nodaai.com}

read -p "Admin name (default: Admin User): " ADMIN_NAME
ADMIN_NAME=${ADMIN_NAME:-Admin User}

read -sp "Admin password: " ADMIN_PASSWORD
echo ""

if [ -z "$ADMIN_PASSWORD" ]; then
    echo "❌ Password cannot be empty"
    exit 1
fi

# Create admin user
npx tsx scripts/create-admin.ts "$ADMIN_PASSWORD" "$ADMIN_EMAIL" "$ADMIN_NAME"

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎉 You can now start the development server:"
echo "   npm run dev"
echo ""
echo "📱 Then visit:"
echo "   http://localhost:3003/admin/login"
echo ""
echo "🔐 Login with:"
echo "   Email: $ADMIN_EMAIL"
echo "   Password: (the one you just entered)"
echo ""
