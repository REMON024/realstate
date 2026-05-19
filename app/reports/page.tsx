import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import ProjectStatusChart from '@/components/dashboard/ProjectStatusChart'
import ProgressBar from '@/components/ui/ProgressBar'
import { formatCurrency } from '@/lib/utils'
import {
  BarChart3, Download, FileText, TrendingUp, DollarSign,
  Users, Package, Calendar, ArrowDownToLine, Eye,
} from 'lucide-react'
import financeData from '@/lib/data/finance.json'
import projectsData from '@/lib/data/projects.json'
import employeesData from '@/lib/data/employees.json'
import inventoryData from '@/lib/data/inventory.json'

const REPORT_LIST = [
  { icon: FileText, title: 'Project Progress Report', desc: 'Completion status and milestones', tag: 'Projects', color: 'bg-blue-100 text-blue-600', updated: '2h ago' },
  { icon: DollarSign, title: 'Financial Summary', desc: 'Revenue, expenses & profit analysis', tag: 'Finance', color: 'bg-green-100 text-green-600', updated: '1h ago' },
  { icon: Users, title: 'HR & Payroll Report', desc: 'Attendance, performance & payroll', tag: 'HR', color: 'bg-purple-100 text-purple-600', updated: '4h ago' },
  { icon: Package, title: 'Inventory Audit Report', desc: 'Stock levels, usage & reorder status', tag: 'Warehouse', color: 'bg-amber-100 text-amber-600', updated: '1d ago' },
  { icon: TrendingUp, title: 'Budget vs Actual', desc: 'Cost variance across all projects', tag: 'Finance', color: 'bg-orange-100 text-orange-600', updated: '3h ago' },
  { icon: BarChart3, title: 'Executive Dashboard', desc: 'High-level KPIs for leadership', tag: 'Management', color: 'bg-teal-100 text-teal-600', updated: '30m ago' },
  { icon: FileText, title: 'Client Statement', desc: 'Outstanding balances by client', tag: 'Finance', color: 'bg-pink-100 text-pink-600', updated: '2d ago' },
  { icon: Calendar, title: 'Site Activity Log', desc: 'Daily activities across all sites', tag: 'Projects', color: 'bg-indigo-100 text-indigo-600', updated: '6h ago' },
]

export default function ReportsPage() {
  const totalRevenue = financeData.monthlyRevenue.reduce((s, m) => s + m.revenue, 0)
  const totalProfit = financeData.monthlyRevenue.reduce((s, m) => s + m.profit, 0)
  const totalBudget = projectsData.reduce((s, p) => s + p.budget, 0)
  const totalSpent = projectsData.reduce((s, p) => s + p.spent, 0)

  return (
    <DashboardLayout>
      <PageHeader
        title="Reports & Analytics"
        description="Business intelligence and performance reporting"
        actions={
          <button className="btn-primary"><Download className="w-4 h-4" /> Export All Reports</button>
        }
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="YTD Revenue" value={formatCurrency(totalRevenue)} change="↑ 12% vs last year" trend="up" icon={TrendingUp} gradient="gradient-green" />
        <StatCard title="Net Profit" value={formatCurrency(totalProfit)} subtitle={`${Math.round((totalProfit / totalRevenue) * 100)}% margin`} trend="up" icon={DollarSign} gradient="gradient-orange" />
        <StatCard title="Budget Used" value={`${Math.round((totalSpent / totalBudget) * 100)}%`} subtitle={`${formatCurrency(totalBudget - totalSpent)} remaining`} icon={BarChart3} gradient="gradient-blue" />
        <StatCard title="Active Staff" value={employeesData.filter(e => e.status === 'Active').length} subtitle="Avg attendance 96%" trend="up" icon={Users} gradient="gradient-purple" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Revenue vs Expenses</h3>
              <p className="text-xs text-slate-400 mt-0.5">Jan–Jun 2024 monthly performance</p>
            </div>
            <button className="btn-secondary text-xs py-1.5"><ArrowDownToLine className="w-3.5 h-3.5" /> Export</button>
          </div>
          <RevenueChart data={financeData.monthlyRevenue} />
        </div>
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Project Status</h3>
              <p className="text-xs text-slate-400 mt-0.5">Current distribution</p>
            </div>
          </div>
          <ProjectStatusChart projects={projectsData} />
        </div>
      </div>

      {/* Budget vs Actual */}
      <div className="card mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800">Budget vs Actual — All Projects</h3>
            <p className="text-xs text-slate-400 mt-0.5">Cost performance and variance tracking</p>
          </div>
          <button className="btn-secondary text-xs py-1.5"><ArrowDownToLine className="w-3.5 h-3.5" /> Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Project', 'Type', 'Budget', 'Actual Spend', 'Remaining', 'Variance', 'Utilization', 'Status'].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectsData.map(p => {
                const util = Math.round((p.spent / p.budget) * 100)
                const variance = p.budget - p.spent
                const overBudget = variance < 0
                return (
                  <tr key={p.id} className="table-row">
                    <td className="table-cell pl-5">
                      <p className="font-semibold text-slate-800 text-[13px]">{p.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{p.id}</p>
                    </td>
                    <td className="table-cell text-[12px] text-slate-500">{p.type}</td>
                    <td className="table-cell font-semibold text-slate-800">{formatCurrency(p.budget)}</td>
                    <td className="table-cell font-semibold text-slate-700">{formatCurrency(p.spent)}</td>
                    <td className="table-cell">
                      <span className={`font-bold text-[13px] ${overBudget ? 'text-red-600' : 'text-emerald-600'}`}>
                        {overBudget ? '-' : '+'}{formatCurrency(Math.abs(variance))}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span className={`text-[12px] font-semibold px-2 py-0.5 rounded-full ${
                        overBudget ? 'bg-red-100 text-red-700'
                        : util > 80 ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {overBudget ? 'Over budget' : util > 80 ? 'Near limit' : 'On track'}
                      </span>
                    </td>
                    <td className="table-cell" style={{ minWidth: 140 }}>
                      <ProgressBar
                        value={Math.min(util, 100)}
                        color={util > 100 ? 'bg-red-500' : util > 80 ? 'bg-amber-500' : 'bg-emerald-500'}
                        size="sm"
                      />
                    </td>
                    <td className="table-cell">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        p.status === 'Completed' ? 'bg-emerald-100 text-emerald-700'
                        : p.status === 'In Progress' ? 'bg-blue-100 text-blue-700'
                        : p.status === 'On Hold' ? 'bg-amber-100 text-amber-700'
                        : 'bg-purple-100 text-purple-700'
                      }`}>{p.status}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report templates grid */}
      <div>
        <h3 className="font-bold text-slate-800 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REPORT_LIST.map(r => {
            const Icon = r.icon
            return (
              <div key={r.title} className="card p-4 hover:border-orange-300 hover:shadow-card-md transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${r.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{r.tag}</span>
                </div>
                <h4 className="font-semibold text-slate-800 text-[13px] group-hover:text-orange-600 transition-colors mb-1">{r.title}</h4>
                <p className="text-[11px] text-slate-400 mb-3">{r.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Updated {r.updated}</span>
                  <div className="flex items-center gap-1">
                    <button className="w-6 h-6 rounded hover:bg-blue-50 flex items-center justify-center"><Eye className="w-3 h-3 text-blue-500" /></button>
                    <button className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center"><Download className="w-3 h-3 text-slate-500" /></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
