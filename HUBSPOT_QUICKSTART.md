# HubSpot Integration - Quick Start

## 🚀 Ready to Deploy

The HubSpot CRM integration is **fully implemented** and ready to use. Forms will work with or without the API key configured.

## ⚙️ Quick Setup (5 minutes)

### 1. Get Your HubSpot API Key

1. Log in to HubSpot
2. Go to **Settings** → **Integrations** → **Private Apps**
3. Click **Create private app**
4. Name: `NODA Website Integration`
5. Scopes needed:
   - Contacts: Read + Write
   - Deals: Read + Write  
   - Notes: Read + Write
6. Copy the **Access Token**

### 2. Add to Environment

Create or edit `.env.local`:

```bash
HUBSPOT_API_KEY=pat-na1-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### 3. Restart Server

```bash
npm run dev
```

### 4. Test

- Submit demo form at `/demo`
- Check HubSpot CRM for new contact + deal
- Done! ✅

## 📋 What's Already Built

### Demo Form (`/demo`)
✅ Captures qualified leads with:
- Contact info (name, email, phone, org)
- Role and use case
- Evaluation timeframe
- Team size
- Additional details

✅ **Auto-creates in HubSpot:**
- Contact with all details
- Deal: "Demo: [Org] - [Use Case]"
- Associations between them

### Contact Form (`/contact`)
✅ General inquiries
✅ Creates/updates contact in HubSpot
✅ Tracks lead source

## 🔧 Optional Customization

### Deal Pipeline/Stage

Edit `lib/integrations/hubspot.ts` line 129-130:

```typescript
pipeline: 'your-pipeline-id',
dealstage: 'your-stage-id',
```

### Custom Properties

Add these in HubSpot for full data capture:
- `use_case`
- `evaluation_timeframe`
- `team_size`
- `organization`
- `role`

See `HUBSPOT_SETUP.md` for detailed instructions.

## 🛡️ Production Ready

✅ **Graceful degradation** - Forms work without HubSpot
✅ **Error handling** - HubSpot failures don't break forms
✅ **Duplicate handling** - Updates existing contacts
✅ **Security** - API key server-side only
✅ **Validation** - Input sanitization + validation

## 📊 What You'll See in HubSpot

**For each demo request:**
- New contact (or update if exists)
- New deal in your pipeline
- All form data captured
- Lead source tracked
- Deal associated with contact

**For each contact form:**
- New contact (or update)
- Message captured
- Lead source tracked

## 🚨 Without API Key

Everything still works:
- Forms submit successfully
- Data saved to database
- Console warning logged
- No errors to users

## 📚 Full Documentation

See `HUBSPOT_SETUP.md` for:
- Custom property setup
- Pipeline configuration
- Troubleshooting
- API reference

## ⚡ That's It!

Add the API key and you're live. The integration handles the rest.
