import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { formatCurrency } from '@/lib/utils'
import { Wrench, Plus, Filter, Download, Star, Mail, Phone, Shield } from 'lucide-react'
import contractorsData from '@/lib/data/contractors.json'

export default function ContractorsPage() {
  const activeCount = contractorsData.filter(c => c.status === 'Active').length
  const totalValue = contractorsData.reduce((s, c) => s + c.totalValue, 0)
  const avgRating = contractorsData.reduce((s, c) => s + c.rating, 0) / contractorsData.length

  return (
    <DashboardLayout title="Contractors" subtitle="Subcontractor & vendor management">
      <PageHeader
        title="Contractors & Vendors"
        description={`${contractorsData.length} contractors registered`}
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
              <Plus className="w-4 h-4" /> Add Contractor
            </button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Contractors" value={contractorsData.length} icon={Wrench} iconColor="text-blue-600" iconBg="bg-blue-100" />
        <StatCard title="Active" value={activeCount} icon={Wrench} iconColor="text-green-600" iconBg="bg-green-100" />
        <StatCard title="Total Contract Value" value={formatCurrency(totalValue)} icon={Wrench} iconColor="text-primary-600" iconBg="bg-primary-100" />
        <StatCard title="Avg Rating" value={`${avgRating.toFixed(1)}/5`} icon={Star} iconColor="text-yellow-600" iconBg="bg-yellow-100" />
      </div>

      {/* Contractor cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {contractorsData.map((con) => (
          <div key={con.id} className="bg-white rounded-xl p-5 shadow-card border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">{con.company}</h3>
                  <p className="text-xs text-slate-400">{con.id} · {con.specialty}</p>
                </div>
              </div>
              <Badge status={con.status} />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[1,2,3,4,5].map((s) => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${s <= Math.floor(con.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200 fill-slate-200'}`}
                />
              ))}
              <span className="text-xs text-slate-600 ml-1 font-medium">{con.rating}</span>
            </div>

            {/* Contact info */}
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Mail className="w-3.5 h-3.5" /> {con.email}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Phone className="w-3.5 h-3.5" /> {con.phone}
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-slate-50 rounded-lg px-2 py-1.5 text-center">
                <p className="text-xs text-slate-400">Contracts</p>
                <p className="text-sm font-bold text-slate-700">{con.totalContracts}</p>
              </div>
              <div className="bg-slate-50 rounded-lg px-2 py-1.5 text-center">
                <p className="text-xs text-slate-400">Active</p>
                <p className="text-sm font-bold text-slate-700">{con.activeContracts}</p>
              </div>
              <div className="bg-slate-50 rounded-lg px-2 py-1.5 text-center">
                <p className="text-xs text-slate-400">Value</p>
                <p className="text-xs font-bold text-slate-700">{formatCurrency(con.totalValue)}</p>
              </div>
            </div>

            {/* License & insurance */}
            <div className="flex items-center gap-2">
              <Shield className={`w-3.5 h-3.5 ${con.insurance === 'Active' ? 'text-green-500' : 'text-red-500'}`} />
              <span className="text-xs text-slate-500">
                Insurance: <span className={con.insurance === 'Active' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{con.insurance}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  )
}
