import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = process.argv[2]
  const email = process.argv[3] || 'admin@nodaai.com'
  const name = process.argv[4] || 'Admin User'
  
  if (!password) {
    console.error('Usage: npx tsx scripts/create-admin.ts <password> [email] [name]')
    console.error('Example: npx tsx scripts/create-admin.ts MySecurePass123 admin@nodaai.com "John Doe"')
    process.exit(1)
  }

  console.log('Creating admin user...')
  
  const hash = await bcrypt.hash(password, 12)
  
  try {
    const user = await prisma.adminUser.create({
      data: {
        email,
        password_hash: hash,
        name,
        role: 'admin',
      },
    })
    
    console.log('✅ Admin user created successfully!')
    console.log(`Email: ${user.email}`)
    console.log(`Name: ${user.name}`)
    console.log(`Role: ${user.role}`)
    console.log('\nYou can now log in at: http://localhost:3003/admin/login')
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.error('❌ Error: User with this email already exists')
    } else {
      console.error('❌ Error creating admin user:', error.message)
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
