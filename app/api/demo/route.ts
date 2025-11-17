import { NextRequest, NextResponse } from 'next/server'
import { submitDemoToHubSpot } from '@/lib/integrations/hubspot'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      firstName,
      lastName,
      email,
      phone,
      organization,
      role,
      useCase,
      timeframe,
      teamSize,
      message,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !organization || !role || !useCase) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Submit to HubSpot
    try {
      await submitDemoToHubSpot({
        firstName,
        lastName,
        email,
        phone,
        organization,
        role,
        useCase,
        timeframe,
        teamSize,
        message,
      })
    } catch (hubspotError) {
      // Log but don't fail the request if HubSpot fails
      console.error('HubSpot sync failed:', hubspotError)
    }

    // Log the request for backup
    console.log('Demo request received:', {
      name: `${firstName} ${lastName}`,
      email,
      organization,
      role,
      useCase,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Demo request submitted successfully',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing demo request:', error)
    return NextResponse.json(
      { error: 'Failed to process demo request' },
      { status: 500 }
    )
  }
}
