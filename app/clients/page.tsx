import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  Building2, Plus, Filter, Download, Mail, Phone,
  AlertTriangle, Eye, Edit, Trash2, Search, DollarSign,
} from 'lucide-react'
import clientsData from '@/lib/data/clients.json'

const TYPE_COLORS: Record<string, string> = {
  Developer:   'bg-blue-50 text-blue-600',
  Corporate:   'bg-purple-50 text-purple-600',
  Commercial:  'bg-teal-50 text-teal-600',
  Government:  'bg-slate-100 text-slate-600',
  Hospitality: 'bg-pink-50 text-pink-600',
  Energy:      'bg-green-50 text-green-600',
}

export default function ClientsPage() {
  const totalValue = clientsData.reduce((s, c) => s + c.totalContractValue, 0)
  const totalOutstanding = clientsData.reduce((s, c) => s + c.outstanding, 0)
  const atRisk = clientsData.filter(c => c.status === 'At Risk').length

  return (
    <DashboardLayout>
      <PageHeader
        title="Client Management"
        description="Manage client relationships and contracts"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> Add Client</button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Clients" value={clientsData.length} icon={Building2} gradient="gradient-blue" />
        <StatCard title="Contract Value" value={formatCurrency(totalValue)} icon={DollarSign} gradient="gradient-orange" />
        <StatCard title="Outstanding" value={formatCurrency(totalOutstanding)} trend={totalOutstanding > 0 ? 'down' : 'up'} change={totalOutstanding > 0 ? 'Collection needed' : 'All cleared'} icon={AlertTriangle} gradient={totalOutstanding > 0 ? 'gradient-red' : 'gradient-green'} />
        <StatCard title="At Risk" value={atRisk} change={atRisk > 0 ? 'Requires follow-up' : 'All good'} trend={atRisk > 0 ? 'down' : 'up'} icon={AlertTriangle} gradient={atRisk > 0 ? 'gradient-red' : 'gradient-teal'} />
      </div>

      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            {['All Clients', 'Active', 'At Risk'].map((tab, i) => (
              <button key={tab} className={`tab-btn ${i === 0 ? 'tab-btn-active' : 'tab-btn-inactive'}`}>{tab}</button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input className="input-field pl-9 w-52 text-[13px]" placeholder="Search clients..." />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Client', 'Type', 'Contact', 'Location', 'Active / Total Projects', 'Contract Value', 'Outstanding', 'Member Since', 'Status', 'Actions'].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientsData.map(client => (
                <tr key={client.id} className="table-row">
                  <td className="table-cell pl-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-4 h-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-[13px]">{client.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{client.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${TYPE_COLORS[client.type] ?? 'bg-slate-100 text-slate-600'}`}>
                      {client.type}
                    </span>
                  </td>
                  <td className="table-cell">
                    <p className="text-[13px] font-medium text-slate-700">{client.contact}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <Mail className="w-3 h-3" />{client.email}
                    </div>
                  </td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{client.location}</td>
                  <td className="table-cell text-center">
                    <p className="text-[14px] font-bold text-slate-800">{client.activeProjects}</p>
                    <p className="text-[11px] text-slate-400">{client.totalProjects} total</p>
                  </td>
                  <td className="table-cell font-bold text-slate-800 text-[13px]">{formatCurrency(client.totalContractValue)}</td>
                  <td className="table-cell">
                    <span className={client.outstanding > 0 ? 'text-red-600 font-bold text-[13px]' : 'text-emerald-600 font-semibold text-[13px]'}>
                      {client.outstanding > 0 ? formatCurrency(client.outstanding) : '—'}
                    </span>
                  </td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(client.joinDate)}</td>
                  <td className="table-cell"><Badge status={client.status} /></td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center"><Eye className="w-3.5 h-3.5 text-blue-500" /></button>
                      <button className="w-7 h-7 rounded-lg hover:bg-amber-50 flex items-center justify-center"><Edit className="w-3.5 h-3.5 text-amber-500" /></button>
                      <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-[12px] text-slate-500">
            {clientsData.length} clients · Total contract value: <strong>{formatCurrency(totalValue)}</strong> · Outstanding: <strong className="text-red-600">{formatCurrency(totalOutstanding)}</strong>
          </p>
          <button className="w-8 h-8 text-xs rounded-lg font-medium bg-orange-500 text-white">1</button>
        </div>
      </div>
    </DashboardLayout>
  )
}
