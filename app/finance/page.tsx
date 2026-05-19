import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import RevenueChart from '@/components/dashboard/RevenueChart'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  DollarSign, TrendingUp, AlertTriangle, Plus, Download,
  Filter, Eye, Edit, Printer, CheckCircle2, Clock, Send,
} from 'lucide-react'
import financeData from '@/lib/data/finance.json'

export default function FinancePage() {
  const totalRevenue = financeData.monthlyRevenue.reduce((s, m) => s + m.revenue, 0)
  const totalExpenses = financeData.monthlyRevenue.reduce((s, m) => s + m.expenses, 0)
  const totalProfit = financeData.monthlyRevenue.reduce((s, m) => s + m.profit, 0)
  const overdueTotal = financeData.invoices.filter(i => i.status === 'Overdue').reduce((s, i) => s + i.total, 0)
  const pendingTotal = financeData.invoices.filter(i => i.status === 'Pending').reduce((s, i) => s + i.total, 0)
  const paidTotal = financeData.invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + i.total, 0)

  return (
    <DashboardLayout>
      <PageHeader
        title="Accounts & Finance"
        description="Financial management, invoices, and expense tracking"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> New Invoice</button>
          </>
        }
      />

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="YTD Revenue" value={formatCurrency(totalRevenue)} change="↑ 12% vs last year" trend="up" icon={TrendingUp} gradient="gradient-green" />
        <StatCard title="YTD Expenses" value={formatCurrency(totalExpenses)} change="↑ 8% vs last year" trend="down" icon={DollarSign} gradient="gradient-blue" />
        <StatCard title="Net Profit" value={formatCurrency(totalProfit)} subtitle={`${Math.round((totalProfit / totalRevenue) * 100)}% margin`} trend="up" icon={TrendingUp} gradient="gradient-orange" />
        <StatCard title="Overdue Balance" value={formatCurrency(overdueTotal)} change="Requires action" trend="down" icon={AlertTriangle} gradient="gradient-red" />
      </div>

      {/* Invoice summary badges */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Paid Invoices', value: formatCurrency(paidTotal), count: financeData.invoices.filter(i => i.status === 'Paid').length, color: 'border-emerald-200 bg-emerald-50', text: 'text-emerald-700', icon: CheckCircle2, iconBg: 'bg-emerald-500' },
          { label: 'Pending Invoices', value: formatCurrency(pendingTotal), count: financeData.invoices.filter(i => i.status === 'Pending').length, color: 'border-amber-200 bg-amber-50', text: 'text-amber-700', icon: Clock, iconBg: 'bg-amber-500' },
          { label: 'Overdue Invoices', value: formatCurrency(overdueTotal), count: financeData.invoices.filter(i => i.status === 'Overdue').length, color: 'border-red-200 bg-red-50', text: 'text-red-700', icon: AlertTriangle, iconBg: 'bg-red-500' },
        ].map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} className={`card border ${card.color} p-4 flex items-center gap-4`}>
              <div className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className={`text-xl font-bold ${card.text}`}>{card.count}</p>
                <p className="text-[12px] text-slate-500">{card.label}</p>
                <p className={`text-[12px] font-semibold ${card.text}`}>{card.value}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Revenue chart */}
      <div className="card p-5 mb-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-slate-800">Monthly Financial Performance</h3>
            <p className="text-xs text-slate-400 mt-0.5">Revenue, Expenses & Profit — Jan to Jun 2024</p>
          </div>
          <select className="select-field w-36 text-[12px]">
            <option>2024</option><option>2023</option>
          </select>
        </div>
        <RevenueChart data={financeData.monthlyRevenue} />
      </div>

      {/* Invoices table + Expenses side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Invoices */}
        <div className="card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800">Invoices</h3>
              <p className="text-xs text-slate-400">{financeData.invoices.length} total</p>
            </div>
            <button className="btn-primary text-xs py-1.5"><Plus className="w-3.5 h-3.5" /> New</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['Invoice', 'Client', 'Type', 'Amount', 'Due Date', 'Status', ''].map(h => (
                    <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {financeData.invoices.map(inv => (
                  <tr key={inv.id} className="table-row">
                    <td className="table-cell pl-5">
                      <p className="font-semibold text-slate-800 text-[12px]">{inv.id}</p>
                    </td>
                    <td className="table-cell text-[12px] text-slate-600">{inv.client}</td>
                    <td className="table-cell">
                      <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{inv.type}</span>
                    </td>
                    <td className="table-cell font-semibold text-slate-800 text-[12px]">{formatCurrency(inv.total)}</td>
                    <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(inv.dueDate)}</td>
                    <td className="table-cell"><Badge status={inv.status} /></td>
                    <td className="table-cell">
                      <div className="flex gap-1">
                        <button className="w-6 h-6 rounded hover:bg-blue-50 flex items-center justify-center"><Eye className="w-3 h-3 text-blue-500" /></button>
                        <button className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center"><Printer className="w-3 h-3 text-slate-500" /></button>
                        <button className="w-6 h-6 rounded hover:bg-amber-50 flex items-center justify-center"><Send className="w-3 h-3 text-amber-500" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expenses */}
        <div className="card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800">Expenses</h3>
              <p className="text-xs text-slate-400">{financeData.expenses.length} recent</p>
            </div>
            <button className="btn-primary text-xs py-1.5"><Plus className="w-3.5 h-3.5" /> Add</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['ID', 'Description', 'Category', 'Amount', 'Date', 'Status', ''].map(h => (
                    <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {financeData.expenses.map(exp => (
                  <tr key={exp.id} className="table-row">
                    <td className="table-cell pl-5 font-mono text-[11px] text-slate-500">{exp.id}</td>
                    <td className="table-cell">
                      <p className="text-[12px] text-slate-700 truncate max-w-[140px]">{exp.description}</p>
                      <p className="text-[11px] text-slate-400">{exp.project}</p>
                    </td>
                    <td className="table-cell">
                      <span className="text-[11px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">{exp.category}</span>
                    </td>
                    <td className="table-cell font-semibold text-slate-800 text-[13px]">{formatCurrency(exp.amount)}</td>
                    <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(exp.date)}</td>
                    <td className="table-cell"><Badge status={exp.status} /></td>
                    <td className="table-cell">
                      <div className="flex gap-1">
                        <button className="w-6 h-6 rounded hover:bg-blue-50 flex items-center justify-center"><Eye className="w-3 h-3 text-blue-500" /></button>
                        <button className="w-6 h-6 rounded hover:bg-amber-50 flex items-center justify-center"><Edit className="w-3 h-3 text-amber-500" /></button>
                      </div>
                    </td>
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
