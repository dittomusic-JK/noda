/**
 * HubSpot CRM Integration
 * 
 * Documentation: https://developers.hubspot.com/docs/api/crm/contacts
 */

interface HubSpotContact {
  properties: {
    email: string
    firstname: string
    lastname: string
    phone?: string
    company?: string
    jobtitle?: string
    // Custom properties
    organization?: string
    role?: string
    use_case?: string
    evaluation_timeframe?: string
    team_size?: string
    message?: string
    lead_source?: string
  }
}

interface HubSpotDeal {
  properties: {
    dealname: string
    pipeline: string
    dealstage: string
    amount?: string
    closedate?: string
    description?: string
  }
  associations?: Array<{
    to: {
      id: string
    }
    types: Array<{
      associationCategory: string
      associationTypeId: number
    }>
  }>
}

/**
 * Submit a demo request to HubSpot
 */
export async function submitDemoToHubSpot(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  organization: string
  role: string
  useCase: string
  timeframe?: string
  teamSize?: string
  message?: string
}) {
  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY
  
  if (!HUBSPOT_API_KEY) {
    console.warn('HubSpot API key not configured - skipping CRM sync')
    return null
  }

  try {
    // 1. Create or update contact
    const contact: HubSpotContact = {
      properties: {
        email: data.email,
        firstname: data.firstName,
        lastname: data.lastName,
        phone: data.phone,
        company: data.organization,
        jobtitle: data.role,
        organization: data.organization,
        role: data.role,
        use_case: data.useCase,
        evaluation_timeframe: data.timeframe || '',
        team_size: data.teamSize || '',
        message: data.message || '',
        lead_source: 'Website Demo Request',
      },
    }

    const contactResponse = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      }
    )

    if (!contactResponse.ok) {
      // If contact exists, try to update instead
      if (contactResponse.status === 409) {
        const updateResponse = await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${data.email}?idProperty=email`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
          }
        )
        
        if (!updateResponse.ok) {
          throw new Error(`Failed to update contact: ${updateResponse.statusText}`)
        }
      } else {
        throw new Error(`Failed to create contact: ${contactResponse.statusText}`)
      }
    }

    const contactData = await contactResponse.json()

    // 2. Create a deal for the demo request
    const deal: HubSpotDeal = {
      properties: {
        dealname: `Demo: ${data.organization} - ${data.useCase}`,
        pipeline: 'default', // Update with your pipeline ID
        dealstage: 'appointmentscheduled', // Update with your stage ID
        description: `Demo request from ${data.firstName} ${data.lastName}\n\nUse Case: ${data.useCase}\nTimeframe: ${data.timeframe || 'Not specified'}\nTeam Size: ${data.teamSize || 'Not specified'}\n\nMessage:\n${data.message || 'No additional details provided'}`,
      },
      associations: contactData?.id ? [
        {
          to: { id: contactData.id },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 3, // Contact to Deal association
            },
          ],
        },
      ] : undefined,
    }

    const dealResponse = await fetch(
      'https://api.hubapi.com/crm/v3/objects/deals',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deal),
      }
    )

    if (!dealResponse.ok) {
      console.error('Failed to create deal in HubSpot:', await dealResponse.text())
    }

    return {
      contactId: contactData?.id,
      success: true,
    }
  } catch (error) {
    console.error('HubSpot API error:', error)
    throw error
  }
}

/**
 * Submit a general contact form to HubSpot
 */
export async function submitContactToHubSpot(data: {
  name: string
  email: string
  company?: string
  message: string
}) {
  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY
  
  if (!HUBSPOT_API_KEY) {
    console.warn('HubSpot API key not configured - skipping CRM sync')
    return null
  }

  try {
    // Split name into first and last
    const nameParts = data.name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || firstName

    const contact: HubSpotContact = {
      properties: {
        email: data.email,
        firstname: firstName,
        lastname: lastName,
        company: data.company || '',
        message: data.message,
        lead_source: 'Website Contact Form',
      },
    }

    const response = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      }
    )

    if (!response.ok) {
      // If contact exists, update instead
      if (response.status === 409) {
        const updateResponse = await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${data.email}?idProperty=email`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
          }
        )
        
        if (!updateResponse.ok) {
          throw new Error(`Failed to update contact: ${updateResponse.statusText}`)
        }

        return { success: true, updated: true }
      } else {
        throw new Error(`Failed to create contact: ${response.statusText}`)
      }
    }

    const contactData = await response.json()
    return { contactId: contactData?.id, success: true }
  } catch (error) {
    console.error('HubSpot API error:', error)
    throw error
  }
}

/**
 * Create a note/engagement in HubSpot
 */
export async function createHubSpotNote(contactId: string, note: string) {
  const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY
  
  if (!HUBSPOT_API_KEY) {
    return null
  }

  try {
    const engagement = {
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: note,
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 202, // Note to Contact
            },
          ],
        },
      ],
    }

    const response = await fetch(
      'https://api.hubapi.com/crm/v3/objects/notes',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(engagement),
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to create note: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to create HubSpot note:', error)
    return null
  }
}
