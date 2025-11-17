# HubSpot Integration Setup

This document explains how to configure the HubSpot CRM integration for lead capture from the website forms.

## Prerequisites

1. **HubSpot Account**: You need a HubSpot account with API access
2. **Private App**: Create a private app in HubSpot to get an API key

## Setup Steps

### 1. Create a HubSpot Private App

1. Log in to your HubSpot account
2. Navigate to **Settings** → **Integrations** → **Private Apps**
3. Click **Create a private app**
4. Name it: `NODA Website Integration`
5. Grant the following scopes:
   - **CRM** → Contacts: `crm.objects.contacts.read` and `crm.objects.contacts.write`
   - **CRM** → Deals: `crm.objects.deals.read` and `crm.objects.deals.write`
   - **CRM** → Notes: `crm.objects.notes.read` and `crm.objects.notes.write`
6. Click **Create app**
7. Copy the **Access Token** (this is your API key)

### 2. Configure Environment Variables

Add the HubSpot API key to your `.env.local` file:

```bash
# HubSpot Integration
HUBSPOT_API_KEY=your_hubspot_access_token_here
```

**Important**: Never commit this file to version control. It should already be in `.gitignore`.

### 3. Create Custom Properties in HubSpot (Optional but Recommended)

To capture all the demo form fields, create these custom contact properties:

1. Go to **Settings** → **Properties** → **Contact properties**
2. Click **Create property** for each:

#### Demo Request Properties

| Property Name | Internal Name | Type | Field Type |
|--------------|---------------|------|------------|
| Use Case | `use_case` | Single-line text | Text |
| Evaluation Timeframe | `evaluation_timeframe` | Single-line text | Dropdown |
| Team Size | `team_size` | Single-line text | Dropdown |
| Organization | `organization` | Single-line text | Text |
| Role | `role` | Single-line text | Dropdown |

#### Dropdown Options for Evaluation Timeframe
- Immediate (0-3 months)
- Near-term (3-6 months)
- Mid-term (6-12 months)
- Long-term (12+ months)
- Research / Exploratory

#### Dropdown Options for Team Size
- 1
- 2-3
- 4-6
- 7-10
- 10+

#### Dropdown Options for Role
- Program Manager
- Technical Lead / Engineer
- Operator / End User
- Acquisition / Contracting
- Executive / Leadership
- Researcher / Scientist
- Other

### 4. Configure Deal Pipeline & Stages

1. Go to **Settings** → **Objects** → **Deals**
2. Note your **Pipeline ID** and **Stage IDs**
3. Update the values in `lib/integrations/hubspot.ts`:

```typescript
pipeline: 'your-pipeline-id', // Replace 'default'
dealstage: 'your-stage-id', // Replace 'appointmentscheduled'
```

Common stage IDs:
- `appointmentscheduled` - Demo Scheduled
- `qualifiedtobuy` - Qualified
- `presentationscheduled` - Presentation Scheduled
- `decisionmakerboughtin` - Decision Maker Bought-In
- `contractsent` - Contract Sent
- `closedwon` - Closed Won
- `closedlost` - Closed Lost

## What Gets Synced

### Demo Form (`/demo`)

**Creates/Updates Contact with:**
- First Name
- Last Name
- Email
- Phone
- Company (from organization field)
- Job Title (from role field)
- Custom: Use Case
- Custom: Evaluation Timeframe
- Custom: Team Size
- Custom: Message
- Lead Source: "Website Demo Request"

**Creates Deal:**
- Deal Name: "Demo: [Organization] - [Use Case]"
- Pipeline: (configured)
- Stage: (configured)
- Description: Full details including message
- Associated with the contact

### Contact Form (`/contact`)

**Creates/Updates Contact with:**
- First Name (parsed from name)
- Last Name (parsed from name)
- Email
- Company
- Message (as custom property or note)
- Lead Source: "Website Contact Form"

## Testing

### Test the Integration

1. Set the `HUBSPOT_API_KEY` in `.env.local`
2. Restart your development server: `npm run dev`
3. Submit a test form at `http://localhost:3003/demo`
4. Check your HubSpot CRM for the new contact and deal
5. Verify all fields are populated correctly

### Without HubSpot API Key

The forms will still work if no API key is configured. The integration gracefully degrades:
- Forms submit successfully
- Data is still saved to local database
- Console warnings about skipped HubSpot sync
- No errors shown to users

## Error Handling

The integration includes robust error handling:

1. **API Key Missing**: Logs warning, continues without sync
2. **Contact Already Exists**: Automatically updates existing contact (409 conflict)
3. **API Errors**: Logs error, doesn't fail the form submission
4. **Network Issues**: Timeouts gracefully, form still succeeds

## Monitoring

Check your server logs for:
- Successful syncs: `Demo request received: {...}`
- HubSpot warnings: `HubSpot API key not configured`
- Sync failures: `HubSpot sync failed: [error]`

## Security

- API key stored in environment variables (never in code)
- `.env.local` excluded from version control
- Server-side only (API key never exposed to browser)
- Input validation before sending to HubSpot
- Sanitization of user inputs

## Troubleshooting

### Forms submit but nothing in HubSpot

1. Check `.env.local` has the correct `HUBSPOT_API_KEY`
2. Verify the API key has the required scopes
3. Check server logs for HubSpot errors
4. Confirm custom properties match internal names

### Deal not created

1. Verify pipeline and dealstage IDs in `hubspot.ts`
2. Check that deal scopes are granted to private app
3. Look for deal creation errors in logs

### Contact updated instead of created

This is expected behavior when the email already exists in HubSpot. The integration will update the contact with new information.

## Additional Resources

- [HubSpot API Documentation](https://developers.hubspot.com/docs/api/overview)
- [Private Apps Guide](https://developers.hubspot.com/docs/api/private-apps)
- [CRM Objects API](https://developers.hubspot.com/docs/api/crm/contacts)
- [Associations API](https://developers.hubspot.com/docs/api/crm/associations)
