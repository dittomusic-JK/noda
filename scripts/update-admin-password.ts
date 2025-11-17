import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2]
  const newPassword = process.argv[3]
  
  if (!email || !newPassword) {
    console.error('Usage: npx tsx scripts/update-admin-password.ts <email> <new-password>')
    console.error('Example: npx tsx scripts/update-admin-password.ts admin@nodaai.com MyNewSecurePass123!')
    process.exit(1)
  }

  console.log('Updating admin password...')
  
  const hash = await bcrypt.hash(newPassword, 12)
  
  try {
    const user = await prisma.adminUser.update({
      where: { email },
      data: { password_hash: hash },
    })
    
    console.log('✅ Password updated successfully!')
    console.log(`Email: ${user.email}`)
    console.log(`Name: ${user.name}`)
  } catch (error: any) {
    if (error.code === 'P2025') {
      console.error('❌ Error: User with this email not found')
    } else {
      console.error('❌ Error updating password:', error.message)
    }
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
