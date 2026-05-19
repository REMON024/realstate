import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import { Settings, Building2, Bell, Shield, Globe, Database, Webhook } from 'lucide-react'

const settingsSections = [
  {
    icon: Building2,
    title: 'Company Profile',
    description: 'Business name, logo, address, and tax details',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Email, SMS and in-app alert preferences',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: Shield,
    title: 'Security & Access',
    description: 'Roles, permissions, 2FA, and audit logs',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: Globe,
    title: 'Localization',
    description: 'Currency, timezone, date format and language',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Database,
    title: 'Data & Backup',
    description: 'Export data, backup schedule, data retention',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Webhook,
    title: 'Webhooks & API',
    description: 'Configure webhooks and manage API keys',
    color: 'bg-primary-100 text-primary-600',
    isWebhook: true,
  },
]

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings" subtitle="System configuration and preferences">
      <PageHeader title="Settings" description="Manage your ConstructERP configuration" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: setting cards */}
        <div className="lg:col-span-1 space-y-3">
          {settingsSections.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className={`bg-white rounded-xl p-4 shadow-card border cursor-pointer transition-all hover:border-primary-300 ${s.isWebhook ? 'border-primary-200' : 'border-slate-100'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                    <p className="text-xs text-slate-400">{s.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right: Webhook config panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company settings form */}
          <div className="bg-white rounded-xl p-6 shadow-card border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Company Profile</h3>
                <p className="text-xs text-slate-400">Update your company information</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Company Name', value: 'ConstructERP Inc.', type: 'text' },
                { label: 'Tax ID / EIN', value: 'US-NY-TAX-0001', type: 'text' },
                { label: 'Phone', value: '+1 (555) 100-0001', type: 'tel' },
                { label: 'Email', value: 'admin@constructerp.com', type: 'email' },
                { label: 'Address', value: '100 Construction Ave, New York, NY', type: 'text' },
                { label: 'Website', value: 'https://constructerp.com', type: 'url' },
              ].map((field) => (
                <div key={field.label} className={field.label === 'Address' ? 'col-span-2' : ''}>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary-400 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <button className="px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
                Save Changes
              </button>
              <button className="px-4 py-2 text-sm border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>

          {/* Webhook config */}
          <div className="bg-white rounded-xl p-6 shadow-card border border-primary-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                <Webhook className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">Webhooks & API Integration</h3>
                <p className="text-xs text-slate-400">Configure outgoing webhooks and manage API keys</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Webhook Endpoint URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://your-server.com/webhook"
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-primary-400 transition-colors font-mono"
                  />
                  <button className="px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap">
                    Test
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-2">Trigger Events</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'project.created', 'project.updated', 'project.completed',
                    'invoice.created', 'invoice.paid', 'invoice.overdue',
                    'employee.added', 'payroll.processed',
                    'inventory.low_stock', 'inventory.out_of_stock',
                  ].map((evt) => (
                    <label key={evt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-primary-500" />
                      <span className="font-mono text-xs text-slate-600">{evt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Secret Signing Key</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="whsec_••••••••••••••••••••••••••••••"
                    readOnly
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 font-mono"
                  />
                  <button className="px-3 py-2 text-sm border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap">
                    Regenerate
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">Used to verify webhook signature via <code className="bg-slate-100 px-1 rounded">X-Webhook-Signature</code> header</p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">API Key</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="cerp_live_••••••••••••••••••••••••••"
                    readOnly
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 font-mono"
                  />
                  <button className="px-3 py-2 text-sm border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap">
                    Rotate
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <button className="px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-colors">
                Save Webhook Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
