import DashboardLayout from '@/components/layout/DashboardLayout'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import RevenueChart from '@/components/dashboard/RevenueChart'
import ProjectStatusChart from '@/components/dashboard/ProjectStatusChart'
import {
  FolderOpen,
  Users,
  DollarSign,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import projectsData from '@/lib/data/projects.json'
import inventoryData from '@/lib/data/inventory.json'
import financeData from '@/lib/data/finance.json'
import employeesData from '@/lib/data/employees.json'

export default function DashboardPage() {
  const activeProjects = projectsData.filter((p) => p.status === 'In Progress').length
  const totalBudget = projectsData.reduce((s, p) => s + p.budget, 0)
  const totalSpent = projectsData.reduce((s, p) => s + p.spent, 0)
  const lowStockItems = inventoryData.filter((i) => i.status === 'Low Stock' || i.status === 'Out of Stock').length
  const activeEmployees = employeesData.filter((e) => e.status === 'Active').length
  const overdueInvoices = financeData.invoices.filter((i) => i.status === 'Overdue')
  const pendingInvoices = financeData.invoices.filter((i) => i.status === 'Pending')
  const recentProjects = projectsData.slice(0, 5)

  const activities = [
    { icon: CheckCircle, color: 'text-green-500', msg: 'Invoice INV-2024-007 marked as paid', time: '2 hours ago' },
    { icon: AlertTriangle, color: 'text-yellow-500', msg: '3 materials running low in WH-01', time: '4 hours ago' },
    { icon: TrendingUp, color: 'text-blue-500', msg: 'Skyline Tower progress updated to 64%', time: '6 hours ago' },
    { icon: Users, color: 'text-purple-500', msg: 'New employee EMP-012 onboarded', time: '1 day ago' },
    { icon: Clock, color: 'text-orange-500', msg: 'Invoice INV-2024-004 is 30 days overdue', time: '1 day ago' },
  ]

  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back, Admin">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active Projects"
          value={activeProjects}
          change={`${projectsData.length} total`}
          changeType="neutral"
          icon={FolderOpen}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Total Budget"
          value={formatCurrency(totalBudget)}
          change={`${Math.round((totalSpent / totalBudget) * 100)}% utilized`}
          changeType="neutral"
          icon={DollarSign}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Active Employees"
          value={activeEmployees}
          change={`${employeesData.length} total staff`}
          changeType="neutral"
          icon={Users}
          iconColor="text-purple-600"
          iconBg="bg-purple-100"
        />
        <StatCard
          title="Low Stock Alerts"
          value={lowStockItems}
          change="Needs attention"
          changeType={lowStockItems > 0 ? 'down' : 'up'}
          icon={Package}
          iconColor="text-orange-600"
          iconBg="bg-orange-100"
        />
      </div>

      {/* Second row stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Revenue (YTD)"
          value={formatCurrency(financeData.monthlyRevenue.reduce((s, m) => s + m.revenue, 0))}
          change="↑ 12% vs last year"
          changeType="up"
          icon={TrendingUp}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-100"
        />
        <StatCard
          title="Overdue Invoices"
          value={overdueInvoices.length}
          change={`${formatCurrency(overdueInvoices.reduce((s, i) => s + i.total, 0))} pending`}
          changeType="down"
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />
        <StatCard
          title="Pending Invoices"
          value={pendingInvoices.length}
          change={`${formatCurrency(pendingInvoices.reduce((s, i) => s + i.total, 0))} value`}
          changeType="neutral"
          icon={Clock}
          iconColor="text-yellow-600"
          iconBg="bg-yellow-100"
        />
        <StatCard
          title="Budget Spent"
          value={formatCurrency(totalSpent)}
          change={`${formatCurrency(totalBudget - totalSpent)} remaining`}
          changeType="neutral"
          icon={DollarSign}
          iconColor="text-primary-600"
          iconBg="bg-primary-100"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-card border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-800">Revenue vs Expenses</h3>
              <p className="text-xs text-slate-400">Monthly financial overview</p>
            </div>
            <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
              2024
            </span>
          </div>
          <RevenueChart data={financeData.monthlyRevenue} />
        </div>

        <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100">
          <div className="mb-4">
            <h3 className="font-semibold text-slate-800">Project Status</h3>
            <p className="text-xs text-slate-400">Distribution by status</p>
          </div>
          <ProjectStatusChart projects={projectsData} />
        </div>
      </div>

      {/* Projects + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active projects */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-card border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Active Projects</h3>
            <a href="/projects" className="text-xs text-primary-600 hover:underline font-medium">
              View all →
            </a>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center gap-4">
                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FolderOpen className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-medium text-slate-800 truncate">{project.name}</p>
                    <Badge status={project.status} />
                  </div>
                  <ProgressBar value={project.progress} />
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400">{project.client}</span>
                    <span className="text-xs text-slate-400">Due {formatDate(project.endDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {activities.map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon className={`w-4 h-4 ${a.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-700 leading-snug">{a.msg}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
