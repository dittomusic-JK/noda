import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { sanitizeInput, isValidEmail } from '@/lib/utils/sanitize'
import { submitContactToHubSpot } from '@/lib/integrations/hubspot'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: company ? sanitizeInput(company) : null,
      message: sanitizeInput(message),
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: sanitizedData,
    })

    // Submit to HubSpot
    try {
      await submitContactToHubSpot({
        name: sanitizedData.name,
        email: sanitizedData.email,
        company: sanitizedData.company || undefined,
        message: sanitizedData.message,
      })
    } catch (hubspotError) {
      // Log but don't fail the request if HubSpot fails
      console.error('HubSpot sync failed:', hubspotError)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message. We will be in touch soon!',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    )
  }
}
