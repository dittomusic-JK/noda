import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // API Keys (server-side only)
  HUBSPOT_API_KEY: z.string().min(1).optional(),
  RECAPTCHA_SECRET_KEY: z.string().min(1).optional(),
  GREENHOUSE_API_KEY: z.string().min(1).optional(),
  
  // Auth
  SESSION_SECRET: z.string().min(32).optional(),
  
  // Analytics (public)
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),
  
  // Rate limiting (optional for development)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  
  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
})

// Only validate in server context
export function validateEnv() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error('❌ Invalid environment variables:', error)
    throw new Error('Invalid environment variables')
  }
}

// Export type for use in app
export type Env = z.infer<typeof envSchema>
