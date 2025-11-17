import { prisma } from '@/lib/db/prisma'
import { Badge } from '@/components/ui/badge'

export default async function ContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({
    orderBy: { created_at: 'desc' },
  })

  // Calculate stats
  const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const recentContacts = contacts.filter(c => c.created_at >= last30Days)
  const syncedToHubspot = contacts.filter(c => c.synced_to_hubspot).length

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Submissions</h1>
        <p className="text-slate-400">View and manage form submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-slate-50">{contacts.length}</div>
          <div className="text-sm text-slate-400">Total Submissions</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-primary">{recentContacts.length}</div>
          <div className="text-sm text-slate-400">Last 30 Days</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-400">{syncedToHubspot}</div>
          <div className="text-sm text-slate-400">Synced to HubSpot</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-400">
            {contacts.length - syncedToHubspot}
          </div>
          <div className="text-sm text-slate-400">Pending Sync</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p className="text-slate-400">No contact submissions yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Company</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Message</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Source</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-50">{contact.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-primary hover:underline"
                      >
                        {contact.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {contact.company || <span className="text-slate-500">—</span>}
                    </td>
                    <td className="px-6 py-4 text-slate-300 max-w-xs">
                      <div className="truncate" title={contact.message}>
                        {contact.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {contact.source || <span className="text-slate-500">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      {contact.synced_to_hubspot ? (
                        <Badge variant="success">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Synced
                        </Badge>
                      ) : (
                        <Badge variant="warning">Pending</Badge>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm whitespace-nowrap">
                      {new Date(contact.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
        <div className="flex gap-4">
          <div className="text-blue-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-200 mb-2">HubSpot Integration</h3>
            <p className="text-sm text-slate-400 mb-2">
              Contact submissions are automatically synced to HubSpot CRM. The sync happens immediately upon
              form submission.
            </p>
            <p className="text-sm text-slate-400">
              If sync fails, submissions are retained in the database and can be manually re-synced.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
