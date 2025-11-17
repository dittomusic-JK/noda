import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting will be optional - only if Redis credentials are provided
let ratelimitEnabled = false
let ratelimit: any = null

// Initialize rate limiter only if credentials exist
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const { Ratelimit } = require('@upstash/ratelimit')
    const { Redis } = require('@upstash/redis')

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })

    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
    })

    ratelimitEnabled = true
  } catch (error) {
    console.warn('Rate limiting disabled: Redis not configured')
  }
}

export async function middleware(request: NextRequest) {
  // Rate limit API routes (if enabled)
  if (ratelimitEnabled && request.nextUrl.pathname.startsWith('/api/contact')) {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1'
    const { success, limit, reset, remaining } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
          },
        }
      )
    }
  }

  // Admin authentication check using NextAuth
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for NextAuth session token
    const sessionToken = request.cookies.get('next-auth.session-token') || 
                        request.cookies.get('__Secure-next-auth.session-token')
    
    // Check if authenticated
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*',
  ],
}
