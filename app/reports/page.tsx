import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import ProjectStatusChart from '@/components/dashboard/ProjectStatusChart'
import { formatCurrency } from '@/lib/utils'
import { BarChart3, Download, FileText, TrendingUp, DollarSign, Users, Package } from 'lucide-react'
import financeData from '@/lib/data/finance.json'
import projectsData from '@/lib/data/projects.json'
import employeesData from '@/lib/data/employees.json'
import inventoryData from '@/lib/data/inventory.json'

const reportTypes = [
  {
    icon: FileText,
    title: 'Project Progress Report',
    description: 'Status and completion of all projects',
    updated: '2 hours ago',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: DollarSign,
    title: 'Financial Summary',
    description: 'Revenue, expenses and profit analysis',
    updated: '1 hour ago',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Users,
    title: 'HR & Payroll Report',
    description: 'Employee attendance, performance & payroll',
    updated: '4 hours ago',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Package,
    title: 'Inventory Audit',
    description: 'Stock levels, usage and reorder needs',
    updated: '1 day ago',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: TrendingUp,
    title: 'Budget vs Actual',
    description: 'Cost tracking across all active projects',
    updated: '3 hours ago',
    color: 'bg-pink-100 text-pink-600',
  },
  {
    icon: BarChart3,
    title: 'Executive Dashboard',
    description: 'High-level KPIs for leadership review',
    updated: '30 min ago',
    color: 'bg-primary-100 text-primary-600',
  },
]

export default function ReportsPage() {
  const totalRevenue = financeData.monthlyRevenue.reduce((s, m) => s + m.revenue, 0)
  const totalProfit = financeData.monthlyRevenue.reduce((s, m) => s + m.profit, 0)
  const totalBudget = projectsData.reduce((s, p) => s + p.budget, 0)
  const totalSpent = projectsData.reduce((s, p) => s + p.spent, 0)

  return (
    <DashboardLayout title="Reports" subtitle="Analytics and business intelligence">
      <PageHeader
        title="Reports & Analytics"
        description="Comprehensive business performance reports"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
            <Download className="w-4 h-4" /> Export All
          </button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="YTD Revenue"
          value={formatCurrency(totalRevenue)}
          change="↑ 12% vs last year"
          changeType="up"
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(totalProfit)}
          change={`${Math.round((totalProfit / totalRevenue) * 100)}% margin`}
          changeType="up"
          icon={DollarSign}
          iconColor="text-primary-600"
          iconBg="bg-primary-100"
        />
        <StatCard
          title="Budget Utilization"
          value={`${Math.round((totalSpent / totalBudget) * 100)}%`}
          change={`${formatCurrency(totalBudget - totalSpent)} remaining`}
          changeType="neutral"
          icon={BarChart3}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Workforce"
          value={employeesData.filter(e => e.status === 'Active').length}
          change={`${Math.round(employeesData.reduce((s,e) => s + e.attendance, 0) / employeesData.length)}% avg attendance`}
          changeType="up"
          icon={Users}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-card border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Revenue vs Expenses Trend</h3>
              <p className="text-xs text-slate-400">January – June 2024</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
          <RevenueChart data={financeData.monthlyRevenue} />
        </div>

        <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Projects by Status</h3>
              <p className="text-xs text-slate-400">Current distribution</p>
            </div>
          </div>
          <ProjectStatusChart projects={projectsData} />
        </div>
      </div>

      {/* Budget vs Actual table */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100 mb-6">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 className="font-semibold text-slate-800">Budget vs Actual by Project</h3>
            <p className="text-xs text-slate-400">Cost performance across all projects</p>
          </div>
          <button className="flex items-center gap-1.5 text-xs text-slate-500 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Project', 'Type', 'Budget', 'Spent', 'Remaining', 'Utilization', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-3 px-4 first:pl-6 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectsData.map((p) => {
                const util = Math.round((p.spent / p.budget) * 100)
                const remaining = p.budget - p.spent
                return (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0">
                    <td className="py-3.5 px-4 pl-6">
                      <p className="font-medium text-slate-800">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.id}</p>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500">{p.type}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{formatCurrency(p.budget)}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{formatCurrency(p.spent)}</td>
                    <td className="py-3.5 px-4">
                      <span className={remaining < 0 ? 'text-red-600 font-semibold' : 'text-green-600 font-medium'}>
                        {remaining < 0 ? '-' : ''}{formatCurrency(Math.abs(remaining))}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full">
                          <div
                            className={`h-full rounded-full ${util > 100 ? 'bg-red-500' : util > 80 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(util, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-600">{util}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        p.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        p.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                        p.status === 'On Hold' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>{p.status}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report templates */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTypes.map((rt) => {
            const Icon = rt.icon
            return (
              <div key={rt.title} className="bg-white rounded-xl p-5 shadow-card border border-slate-100 hover:border-primary-200 transition-all card-hover flex items-start gap-4 cursor-pointer">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${rt.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 text-sm">{rt.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 mb-2">{rt.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Updated {rt.updated}</span>
                    <button className="text-xs text-primary-600 hover:underline font-medium flex items-center gap-1">
                      <Download className="w-3 h-3" /> Export
                    </button>
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
