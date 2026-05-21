import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { formatCurrency } from '@/lib/utils'
import {
  Wrench, Plus, Filter, Download, Star, Mail, Phone,
  Shield, Eye, Edit, Trash2, Search, CheckCircle2, XCircle,
} from 'lucide-react'
import contractorsData from '@/lib/data/contractors.json'

export default function ContractorsPage() {
  const activeCount = contractorsData.filter(c => c.status === 'Active').length
  const totalValue = contractorsData.reduce((s, c) => s + c.totalValue, 0)
  const avgRating = contractorsData.reduce((s, c) => s + c.rating, 0) / contractorsData.length
  const totalActiveContracts = contractorsData.reduce((s, c) => s + c.activeContracts, 0)

  return (
    <DashboardLayout>
      <PageHeader
        title="Contractor Management"
        description="Manage subcontractors and specialist vendors"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> Add Contractor</button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Contractors" value={contractorsData.length} icon={Wrench} gradient="gradient-blue" />
        <StatCard title="Active Contractors" value={activeCount} trend="up" icon={Wrench} gradient="gradient-green" />
        <StatCard title="Active Contracts" value={totalActiveContracts} icon={Wrench} gradient="gradient-orange" />
        <StatCard title="Total Contract Value" value={formatCurrency(totalValue)} icon={Wrench} gradient="gradient-purple" />
      </div>

      {/* Table */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            {['All', 'Active', 'Inactive'].map((tab, i) => (
              <button key={tab} className={`tab-btn ${i === 0 ? 'tab-btn-active' : 'tab-btn-inactive'}`}>{tab}</button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input className="input-field pl-9 w-52 text-[13px]" placeholder="Search contractors..." />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Company', 'Contact', 'Specialty', 'Rating', 'Contracts', 'Total Value', 'License', 'Insurance', 'Status', 'Actions'].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contractorsData.map(con => (
                <tr key={con.id} className="table-row">
                  <td className="table-cell pl-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Wrench className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-[13px]">{con.company}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{con.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <p className="text-[13px] text-slate-700 font-medium">{con.contact}</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <Mail className="w-3 h-3" />{con.email}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-[12px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">{con.specialty}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3 h-3 ${s <= Math.floor(con.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-[12px] font-bold text-slate-700">{con.rating}</span>
                    </div>
                  </td>
                  <td className="table-cell text-center">
                    <p className="text-[14px] font-bold text-slate-800">{con.activeContracts}</p>
                    <p className="text-[11px] text-slate-400">{con.totalContracts} total</p>
                  </td>
                  <td className="table-cell font-semibold text-slate-800">{formatCurrency(con.totalValue)}</td>
                  <td className="table-cell text-[11px] text-slate-500 font-mono">{con.license}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1.5">
                      {con.insurance === 'Active'
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        : <XCircle className="w-4 h-4 text-red-500" />
                      }
                      <span className={`text-[12px] font-medium ${con.insurance === 'Active' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {con.insurance}
                      </span>
                    </div>
                  </td>
                  <td className="table-cell"><Badge status={con.status} /></td>
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
          <p className="text-[12px] text-slate-500">Showing 1–{contractorsData.length} of {contractorsData.length} contractors · Avg rating: <strong>{avgRating.toFixed(1)}/5</strong></p>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 text-xs rounded-lg font-medium bg-orange-500 text-white">1</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
