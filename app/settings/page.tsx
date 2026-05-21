import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import {
  Building2, Bell, Shield, Globe, Database, Webhook,
  User, Mail, Phone, Save, RefreshCw, Eye, EyeOff,
  ChevronRight, CheckCircle2,
} from 'lucide-react'

const TABS = [
  { icon: Building2, label: 'Company', active: true },
  { icon: User, label: 'Account', active: false },
  { icon: Bell, label: 'Notifications', active: false },
  { icon: Shield, label: 'Security', active: false },
  { icon: Globe, label: 'Localization', active: false },
  { icon: Webhook, label: 'Webhooks & API', active: false },
  { icon: Database, label: 'Data & Backup', active: false },
]

const WEBHOOK_EVENTS = [
  'project.created', 'project.updated', 'project.completed', 'project.on_hold',
  'invoice.created', 'invoice.paid', 'invoice.overdue', 'invoice.cancelled',
  'employee.added', 'employee.updated', 'employee.resigned',
  'payroll.processed', 'payroll.approved',
  'inventory.low_stock', 'inventory.out_of_stock', 'inventory.restocked',
  'contractor.added', 'client.added',
]

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <PageHeader title="System Settings" description="Configure your ConstructERP system preferences" />

      <div className="flex gap-5">
        {/* Sidebar tabs */}
        <div className="w-52 flex-shrink-0">
          <div className="card overflow-hidden">
            {TABS.map((tab, i) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.label}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-[13px] font-medium text-left transition-colors border-b border-slate-100 last:border-0 ${
                    tab.active
                      ? 'bg-orange-50 text-orange-600 border-l-2 border-l-orange-500'
                      : 'text-slate-600 hover:bg-slate-50 border-l-2 border-l-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {tab.label}
                  <ChevronRight className={`w-3.5 h-3.5 ml-auto ${tab.active ? 'text-orange-400' : 'text-slate-300'}`} />
                </button>
              )
            })}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* Company profile */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Company Profile</h3>
                <p className="text-xs text-slate-400">Update your company information and branding</p>
              </div>
            </div>

            {/* Logo upload */}
            <div className="mb-5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-2xl">
                CE
              </div>
              <div>
                <p className="text-[13px] font-semibold text-slate-700 mb-1">Company Logo</p>
                <p className="text-[11px] text-slate-400 mb-2">PNG, JPG up to 2MB. Recommended 200×200</p>
                <button className="text-xs px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">Upload Logo</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Company Name', value: 'ConstructERP Inc.', type: 'text', icon: Building2 },
                { label: 'Tax ID / EIN', value: 'US-NY-TAX-0001', type: 'text', icon: Building2 },
                { label: 'Email Address', value: 'admin@constructerp.com', type: 'email', icon: Mail },
                { label: 'Phone Number', value: '+1 (555) 100-0001', type: 'tel', icon: Phone },
                { label: 'Website', value: 'https://constructerp.com', type: 'url', icon: Globe },
                { label: 'Founded Year', value: '2018', type: 'text', icon: Building2 },
              ].map(field => {
                const Icon = field.icon
                return (
                  <div key={field.label}>
                    <label className="text-[12px] font-semibold text-slate-600 block mb-1.5">{field.label}</label>
                    <div className="relative">
                      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                      <input type={field.type} defaultValue={field.value} className="input-field pl-9" />
                    </div>
                  </div>
                )
              })}
              <div className="md:col-span-2">
                <label className="text-[12px] font-semibold text-slate-600 block mb-1.5">Company Address</label>
                <textarea rows={2} defaultValue="100 Construction Ave, New York, NY 10001, USA" className="input-field resize-none" />
              </div>
              <div>
                <label className="text-[12px] font-semibold text-slate-600 block mb-1.5">Industry</label>
                <select className="select-field">
                  <option>Construction & Real Estate</option>
                  <option>Civil Engineering</option>
                  <option>Architecture</option>
                </select>
              </div>
              <div>
                <label className="text-[12px] font-semibold text-slate-600 block mb-1.5">Company Size</label>
                <select className="select-field">
                  <option>50–200 employees</option>
                  <option>1–50 employees</option>
                  <option>200+ employees</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
              <button className="btn-primary"><Save className="w-4 h-4" /> Save Changes</button>
              <button className="btn-secondary">Cancel</button>
              <div className="ml-auto flex items-center gap-1.5 text-[12px] text-emerald-600">
                <CheckCircle2 className="w-4 h-4" /> All changes saved
              </div>
            </div>
          </div>

          {/* Webhooks & API */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Webhook className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Webhooks & API Integration</h3>
                <p className="text-xs text-slate-400">Configure outgoing webhooks and manage REST API access</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Endpoint */}
              <div>
                <label className="text-[12px] font-semibold text-slate-600 block mb-1.5">Webhook Endpoint URL</label>
                <div className="flex gap-2">
                  <input type="url" placeholder="https://your-server.com/api/webhook" className="input-field flex-1 font-mono text-[12px]" />
                  <button className="btn-secondary text-[12px] whitespace-nowrap">Test Webhook</button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Receives POST requests for all subscribed events with HMAC-SHA256 verification.</p>
              </div>

              {/* Events */}
              <div>
                <label className="text-[12px] font-semibold text-slate-600 block mb-3">Subscribed Events</label>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {WEBHOOK_EVENTS.map(evt => (
                    <label key={evt} className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-colors cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-orange-500 flex-shrink-0" />
                      <span className="text-[11px] font-mono text-slate-600 truncate">{evt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* API key */}
              <div>
                <label className="text-[12px] font-semibold text-slate-600 block mb-1.5">API Key</label>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input type="password" defaultValue="cerp_live_sk_x9mA2bkZ7qLcPdNfR4eWvYsUo3jHgI" className="input-field font-mono text-[12px] pr-10" readOnly />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><Eye className="w-4 h-4" /></button>
                  </div>
                  <button className="btn-secondary text-[12px] whitespace-nowrap"><RefreshCw className="w-3.5 h-3.5" /> Rotate Key</button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Include as <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">Authorization: Bearer &lt;api-key&gt;</code> header in API requests.</p>
              </div>

              {/* Signing secret */}
              <div>
                <label className="text-[12px] font-semibold text-slate-600 block mb-1.5">Webhook Signing Secret</label>
                <div className="flex gap-2">
                  <input type="password" defaultValue="whsec_7fK9mXp2qRsT4vNcL8wE1dA6hJgYuZo" className="input-field flex-1 font-mono text-[12px]" readOnly />
                  <button className="btn-secondary text-[12px] whitespace-nowrap"><RefreshCw className="w-3.5 h-3.5" /> Regenerate</button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Verify via <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">X-ConstructERP-Signature</code> header (HMAC-SHA256).</p>
              </div>

              {/* Retry policy */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-[12px] font-semibold text-slate-700 mb-2">Delivery Policy</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Max Retries', value: '5' },
                    { label: 'Timeout', value: '30 seconds' },
                    { label: 'Retry Backoff', value: 'Exponential (2s, 4s, 8s…)' },
                    { label: 'Retry on', value: '4xx, 5xx, Timeout' },
                  ].map(item => (
                    <div key={item.label}>
                      <p className="text-[11px] text-slate-400">{item.label}</p>
                      <p className="text-[12px] font-semibold text-slate-700">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
              <button className="btn-primary"><Save className="w-4 h-4" /> Save Webhook Settings</button>
              <button className="btn-secondary">Reset to Defaults</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
