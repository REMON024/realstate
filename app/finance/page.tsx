import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import { formatCurrency, formatDate } from '@/lib/utils'
import { DollarSign, TrendingUp, AlertTriangle, Clock, Plus, Download, Filter } from 'lucide-react'
import financeData from '@/lib/data/finance.json'

export default function FinancePage() {
  const totalRevenue = financeData.monthlyRevenue.reduce((s, m) => s + m.revenue, 0)
  const totalExpenses = financeData.monthlyRevenue.reduce((s, m) => s + m.expenses, 0)
  const totalProfit = financeData.monthlyRevenue.reduce((s, m) => s + m.profit, 0)
  const overdueAmount = financeData.invoices.filter(i => i.status === 'Overdue').reduce((s, i) => s + i.total, 0)

  return (
    <DashboardLayout title="Finance" subtitle="Financial management & accounting">
      <PageHeader
        title="Finance Overview"
        description="Invoices, expenses, and revenue tracking"
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
              <Plus className="w-4 h-4" /> New Invoice
            </button>
          </>
        }
      />

      {/* KPI stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Revenue (YTD)"
          value={formatCurrency(totalRevenue)}
          change="↑ 12% vs last year"
          changeType="up"
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(totalExpenses)}
          change="↑ 8% vs last year"
          changeType="down"
          icon={DollarSign}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(totalProfit)}
          change={`${Math.round((totalProfit / totalRevenue) * 100)}% margin`}
          changeType="up"
          icon={TrendingUp}
          iconColor="text-primary-600"
          iconBg="bg-primary-100"
        />
        <StatCard
          title="Overdue Amount"
          value={formatCurrency(overdueAmount)}
          change="Requires action"
          changeType="down"
          icon={AlertTriangle}
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />
      </div>

      {/* Revenue chart */}
      <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-slate-800">Monthly Financial Performance</h3>
            <p className="text-xs text-slate-400">Revenue, Expenses & Profit — 2024</p>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-500 inline-block" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Expenses</span>
          </div>
        </div>
        <RevenueChart data={financeData.monthlyRevenue} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoices */}
        <div className="bg-white rounded-xl shadow-card border border-slate-100">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Invoices</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">{financeData.invoices.length} total</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Invoice', 'Client', 'Amount', 'Due Date', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-3 px-4 first:pl-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {financeData.invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0">
                    <td className="py-3 px-4 pl-5">
                      <p className="font-medium text-slate-700">{inv.id}</p>
                      <p className="text-xs text-slate-400">{inv.type}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-slate-700 text-xs">{inv.client}</p>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{formatCurrency(inv.total)}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">{formatDate(inv.dueDate)}</td>
                    <td className="py-3 px-4"><Badge status={inv.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-white rounded-xl shadow-card border border-slate-100">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Recent Expenses</h3>
            <button className="text-xs text-primary-600 hover:underline font-medium">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  {['Expense', 'Category', 'Amount', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-3 px-4 first:pl-5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {financeData.expenses.map((exp) => (
                  <tr key={exp.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0">
                    <td className="py-3 px-4 pl-5">
                      <p className="font-medium text-slate-700">{exp.id}</p>
                      <p className="text-xs text-slate-400 truncate max-w-[140px]">{exp.description}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{exp.category}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{formatCurrency(exp.amount)}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">{formatDate(exp.date)}</td>
                    <td className="py-3 px-4"><Badge status={exp.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
