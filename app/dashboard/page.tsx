import DashboardLayout from '@/components/layout/DashboardLayout'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import RevenueChart from '@/components/dashboard/RevenueChart'
import ProjectStatusChart from '@/components/dashboard/ProjectStatusChart'
import {
  FolderKanban, Users, DollarSign, Package,
  AlertTriangle, CheckCircle2, Clock, TrendingUp,
  Wallet, ShoppingCart, ArrowUpRight, HardHat,
  MapPin, Calendar, Eye,
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import projectsData from '@/lib/data/projects.json'
import inventoryData from '@/lib/data/inventory.json'
import financeData from '@/lib/data/finance.json'
import employeesData from '@/lib/data/employees.json'
import payrollData from '@/lib/data/payroll.json'

export default function DashboardPage() {
  const activeProjects = projectsData.filter(p => p.status === 'In Progress').length
  const completedProjects = projectsData.filter(p => p.status === 'Completed').length
  const totalBudget = projectsData.reduce((s, p) => s + p.budget, 0)
  const totalSpent = projectsData.reduce((s, p) => s + p.spent, 0)
  const totalWorkers = projectsData.filter(p => p.status === 'In Progress').reduce((s, p) => s + p.workers, 0)
  const lowStock = inventoryData.filter(i => i.status === 'Low Stock' || i.status === 'Out of Stock').length
  const totalInventoryValue = inventoryData.reduce((s, i) => s + i.totalValue, 0)
  const activeEmployees = employeesData.filter(e => e.status === 'Active').length
  const overdueInvoices = financeData.invoices.filter(i => i.status === 'Overdue')
  const pendingInvoices = financeData.invoices.filter(i => i.status === 'Pending')
  const ytdRevenue = financeData.monthlyRevenue.reduce((s, m) => s + m.revenue, 0)
  const ytdProfit = financeData.monthlyRevenue.reduce((s, m) => s + m.profit, 0)
  const currentPayroll = payrollData.payrollPeriods[0]

  const activities = [
    { type: 'success', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', msg: 'Invoice INV-2024-007 paid — $708,500', time: '2h ago' },
    { type: 'warning', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-50', msg: '3 inventory items running below minimum stock', time: '4h ago' },
    { type: 'info', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50', msg: 'Skyline Tower Residences progress updated to 64%', time: '6h ago' },
    { type: 'success', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50', msg: 'New employee Michelle Davis (EMP-012) onboarded', time: '1d ago' },
    { type: 'error', icon: Clock, color: 'text-red-500', bg: 'bg-red-50', msg: 'Invoice INV-2024-004 is 30+ days overdue — $2.29M', time: '1d ago' },
    { type: 'info', icon: HardHat, color: 'text-teal-500', bg: 'bg-teal-50', msg: 'Grand Hotel project phase changed to Structural', time: '2d ago' },
  ]

  return (
    <DashboardLayout>
      {/* Welcome bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Welcome back, Admin! 👋</h1>
          <p className="text-sm text-slate-500 mt-0.5">Here&apos;s what&apos;s happening across all your construction projects today.</p>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs text-slate-400">Current Period</p>
            <p className="text-sm font-semibold text-slate-700">May 2024</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* KPI stats row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard
          title="Active Projects"
          value={activeProjects}
          subtitle={`${completedProjects} completed · ${projectsData.length} total`}
          change="2 new this month"
          trend="up"
          icon={FolderKanban}
          gradient="gradient-blue"
        />
        <StatCard
          title="Total Budget"
          value={formatCurrency(totalBudget)}
          subtitle={`${formatCurrency(totalBudget - totalSpent)} remaining`}
          change={`${Math.round((totalSpent / totalBudget) * 100)}% utilized`}
          trend="flat"
          icon={DollarSign}
          gradient="gradient-orange"
        />
        <StatCard
          title="Active Employees"
          value={activeEmployees}
          subtitle={`${totalWorkers} on active sites`}
          change="1 on leave"
          trend="flat"
          icon={Users}
          gradient="gradient-purple"
        />
        <StatCard
          title="Stock Alerts"
          value={lowStock}
          subtitle={`${formatCurrency(totalInventoryValue)} inventory value`}
          change={lowStock > 0 ? 'Requires attention' : 'All stocked'}
          trend={lowStock > 0 ? 'down' : 'up'}
          icon={Package}
          gradient={lowStock > 0 ? 'gradient-red' : 'gradient-green'}
        />
      </div>

      {/* KPI stats row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="YTD Revenue"
          value={formatCurrency(ytdRevenue)}
          change="↑ 12% vs last year"
          trend="up"
          icon={TrendingUp}
          gradient="gradient-green"
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(ytdProfit)}
          subtitle={`${Math.round((ytdProfit / ytdRevenue) * 100)}% margin`}
          change="Healthy margin"
          trend="up"
          icon={Wallet}
          gradient="gradient-teal"
        />
        <StatCard
          title="Overdue Invoices"
          value={overdueInvoices.length}
          subtitle={formatCurrency(overdueInvoices.reduce((s, i) => s + i.total, 0))}
          change="Immediate action needed"
          trend="down"
          icon={AlertTriangle}
          gradient="gradient-red"
        />
        <StatCard
          title="May Payroll"
          value={formatCurrency(currentPayroll.totalNet)}
          subtitle={`${currentPayroll.employeeCount} employees`}
          change={currentPayroll.status}
          trend="flat"
          icon={ShoppingCart}
          gradient="gradient-purple"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue chart */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-slate-800">Revenue vs Expenses</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly financial performance — 2024</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-orange-500 inline-block" />
                Revenue
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
                Expenses
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" />
                Profit
              </span>
            </div>
          </div>
          <RevenueChart data={financeData.monthlyRevenue} />
        </div>

        {/* Project status donut */}
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="font-bold text-slate-800">Project Status</h3>
            <p className="text-xs text-slate-400 mt-0.5">Distribution overview</p>
          </div>
          <ProjectStatusChart projects={projectsData} />
        </div>
      </div>

      {/* Projects + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Projects list */}
        <div className="lg:col-span-3 card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800">Active Projects</h3>
              <p className="text-xs text-slate-400 mt-0.5">Progress & budget overview</p>
            </div>
            <a href="/projects" className="flex items-center gap-1 text-xs text-orange-500 hover:text-orange-600 font-semibold">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="divide-y divide-slate-50">
            {projectsData.slice(0, 6).map(project => (
              <div key={project.id} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50/60 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HardHat className="w-4 h-4 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-0.5">
                    <p className="text-[13px] font-semibold text-slate-800 truncate">{project.name}</p>
                    <Badge status={project.status} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{project.location.split(',').slice(-2).join(',').trim()}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" />{project.workers}</span>
                  </div>
                  <ProgressBar value={project.progress} size="sm" />
                  <div className="flex items-center justify-between mt-1.5 text-[11px] text-slate-400">
                    <span>{formatCurrency(project.spent)} spent of {formatCurrency(project.budget)}</span>
                    <span>Due {formatDate(project.endDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="lg:col-span-2 card">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Recent Activity</h3>
            <p className="text-xs text-slate-400 mt-0.5">Latest system events</p>
          </div>
          <div className="divide-y divide-slate-50">
            {activities.map((a, i) => {
              const Icon = a.icon
              return (
                <div key={i} className="flex gap-3.5 px-5 py-3.5 hover:bg-slate-50/60 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${a.bg}`}>
                    <Icon className={`w-3.5 h-3.5 ${a.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12.5px] text-slate-700 leading-snug">{a.msg}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pending invoices mini list */}
          <div className="px-5 py-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-600">Pending Invoices</p>
              <a href="/accounts/invoices" className="text-xs text-orange-500 font-semibold hover:underline">View All</a>
            </div>
            <div className="space-y-2">
              {pendingInvoices.slice(0, 3).map(inv => (
                <div key={inv.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-[12px] font-medium text-slate-700">{inv.id}</p>
                    <p className="text-[11px] text-slate-400">{inv.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-bold text-slate-800">{formatCurrency(inv.total)}</p>
                    <Badge status={inv.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
