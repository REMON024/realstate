import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Building2, Plus, Filter, Download, Mail, Phone, AlertTriangle } from 'lucide-react'
import clientsData from '@/lib/data/clients.json'

const typeColors: Record<string, string> = {
  Developer: 'bg-blue-100 text-blue-700',
  Corporate: 'bg-purple-100 text-purple-700',
  Commercial: 'bg-teal-100 text-teal-700',
  Government: 'bg-slate-100 text-slate-700',
  Hospitality: 'bg-pink-100 text-pink-700',
  Energy: 'bg-green-100 text-green-700',
}

export default function ClientsPage() {
  const totalValue = clientsData.reduce((s, c) => s + c.totalContractValue, 0)
  const totalOutstanding = clientsData.reduce((s, c) => s + c.outstanding, 0)
  const activeClients = clientsData.filter(c => c.status === 'Active' || c.status === 'At Risk').length

  return (
    <DashboardLayout title="Clients" subtitle="Client relationship management">
      <PageHeader
        title="Client Management"
        description={`${clientsData.length} clients registered`}
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
              <Plus className="w-4 h-4" /> Add Client
            </button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Clients" value={clientsData.length} icon={Building2} iconColor="text-blue-600" iconBg="bg-blue-100" />
        <StatCard title="Active Clients" value={activeClients} icon={Building2} iconColor="text-green-600" iconBg="bg-green-100" />
        <StatCard title="Total Contract Value" value={formatCurrency(totalValue)} icon={Building2} iconColor="text-primary-600" iconBg="bg-primary-100" />
        <StatCard
          title="Outstanding Balance"
          value={formatCurrency(totalOutstanding)}
          change={totalOutstanding > 0 ? 'Collection needed' : 'All clear'}
          changeType={totalOutstanding > 0 ? 'down' : 'up'}
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Client', 'Type', 'Contact', 'Projects', 'Contract Value', 'Outstanding', 'Member Since', 'Status', ''].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-3 px-4 first:pl-6 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientsData.map((client) => (
                <tr key={client.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0">
                  <td className="py-4 px-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{client.name}</p>
                        <p className="text-xs text-slate-400">{client.id} · {client.location}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${typeColors[client.type] ?? 'bg-gray-100 text-gray-600'}`}>
                      {client.type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-slate-700 text-sm font-medium">{client.contact}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                      <Mail className="w-3 h-3" /> {client.email}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-slate-700 font-medium">{client.activeProjects} active</p>
                    <p className="text-xs text-slate-400">{client.totalProjects} total</p>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-800">{formatCurrency(client.totalContractValue)}</td>
                  <td className="py-4 px-4">
                    <span className={client.outstanding > 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-medium'}>
                      {client.outstanding > 0 ? formatCurrency(client.outstanding) : 'Nil'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-500 whitespace-nowrap">{formatDate(client.joinDate)}</td>
                  <td className="py-4 px-4"><Badge status={client.status} /></td>
                  <td className="py-4 px-4">
                    <button className="text-xs text-primary-600 hover:underline font-medium">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
