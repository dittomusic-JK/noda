import { getServerSession } from 'next-auth'
import { authOptions } from './config'
import { redirect } from 'next/navigation'

export async function requireAuth() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/admin/login')
  }
  
  return session
}

export async function getSession() {
  return await getServerSession(authOptions)
}

export function requireRole(session: any, allowedRoles: string[]) {
  if (!allowedRoles.includes(session.user.role)) {
    throw new Error('Insufficient permissions')
  }
}
