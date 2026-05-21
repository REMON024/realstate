import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { TrendingUp, DollarSign, Plus, Download, Filter, Eye, Edit } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const projects = [
  { name: 'Skyline Tower',      revenue: 22000000, landCost: 4500000, constructionCost: 9800000, salesCost: 1200000, adminCost: 680000,  status: 'In Progress' },
  { name: 'Grand Hotel',        revenue: 18500000, landCost: 3800000, constructionCost: 8200000, salesCost: 980000,  adminCost: 560000,  status: 'In Progress' },
  { name: 'Greenfield Office',  revenue: 11200000, landCost: 2100000, constructionCost: 5400000, salesCost: 620000,  adminCost: 380000,  status: 'Completed'   },
  { name: 'Medical Center',     revenue: 14800000, landCost: 2900000, constructionCost: 7100000, salesCost: 810000,  adminCost: 470000,  status: 'In Progress' },
  { name: 'Solar Farm',         revenue: 9600000,  landCost: 1800000, constructionCost: 4200000, salesCost: 490000,  adminCost: 310000,  status: 'Planning'    },
  { name: 'Riverside Residences', revenue: 7400000, landCost: 1500000, constructionCost: 3500000, salesCost: 390000, adminCost: 240000,  status: 'Completed'   },
  { name: 'Tech Park Phase 1',  revenue: 13200000, landCost: 2500000, constructionCost: 6300000, salesCost: 720000,  adminCost: 430000,  status: 'In Progress' },
  { name: 'Harbor View Villas', revenue: 5800000,  landCost: 1100000, constructionCost: 2800000, salesCost: 320000,  adminCost: 210000,  status: 'Completed'   },
]

const monthlyTrend = [
  { month: 'January 2025',  revenue: 8200000,  expenses: 6150000,  profit: 2050000 },
  { month: 'February 2025', revenue: 9100000,  expenses: 6900000,  profit: 2200000 },
  { month: 'March 2025',    revenue: 11400000, expenses: 8550000,  profit: 2850000 },
  { month: 'April 2025',    revenue: 10800000, expenses: 7990000,  profit: 2810000 },
  { month: 'May 2025',      revenue: 13500000, expenses: 9990000,  profit: 3510000 },
  { month: 'June 2025',     revenue: 15200000, expenses: 11090000, profit: 4110000 },
]

export default function ProfitPage() {
  const grossRevenue = projects.reduce((s, p) => s + p.revenue, 0)
  const totalCost = projects.reduce((s, p) => s + p.landCost + p.constructionCost + p.salesCost + p.adminCost, 0)
  const netProfit = grossRevenue - totalCost
  const profitMargin = ((netProfit / grossRevenue) * 100).toFixed(1)

  return (
    <DashboardLayout>
      <PageHeader
        title="Profit Analysis"
        description="Project-level profitability, cost breakdown, and monthly performance trends"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> New Report</button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Gross Revenue" value={formatCurrency(grossRevenue)} change="↑ 16% vs last year" trend="up" icon={DollarSign} gradient="gradient-green" />
        <StatCard title="Total Cost" value={formatCurrency(totalCost)} change="↑ 11% vs last year" trend="down" icon={DollarSign} gradient="gradient-blue" />
        <StatCard title="Net Profit" value={formatCurrency(netProfit)} change="↑ 21% vs last year" trend="up" icon={TrendingUp} gradient="gradient-orange" />
        <StatCard title="Profit Margin" value={`${profitMargin}%`} subtitle="Across all projects" trend="up" icon={TrendingUp} gradient="gradient-red" />
      </div>

      <div className="card mb-5">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800">Project Profitability</h3>
            <p className="text-xs text-slate-400">{projects.length} projects</p>
          </div>
          <button className="btn-secondary text-xs py-1.5"><Download className="w-3.5 h-3.5" /> Export</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Project', 'Revenue', 'Land Cost', 'Construction', 'Sales Cost', 'Admin Cost', 'Total Cost', 'Net Profit', 'Margin %', 'Status', ''].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map(p => {
                const totalProjCost = p.landCost + p.constructionCost + p.salesCost + p.adminCost
                const projProfit = p.revenue - totalProjCost
                const margin = ((projProfit / p.revenue) * 100).toFixed(1)
                return (
                  <tr key={p.name} className="table-row">
                    <td className="table-cell pl-5">
                      <p className="text-[12px] font-semibold text-slate-800 whitespace-nowrap">{p.name}</p>
                    </td>
                    <td className="table-cell text-[12px] font-semibold text-slate-800 whitespace-nowrap">{formatCurrency(p.revenue)}</td>
                    <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{formatCurrency(p.landCost)}</td>
                    <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{formatCurrency(p.constructionCost)}</td>
                    <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{formatCurrency(p.salesCost)}</td>
                    <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{formatCurrency(p.adminCost)}</td>
                    <td className="table-cell text-[12px] text-slate-700 font-medium whitespace-nowrap">{formatCurrency(totalProjCost)}</td>
                    <td className="table-cell text-[12px] font-bold text-emerald-600 whitespace-nowrap">{formatCurrency(projProfit)}</td>
                    <td className="table-cell">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${parseFloat(margin) >= 25 ? 'bg-emerald-100 text-emerald-700' : parseFloat(margin) >= 18 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                        {margin}%
                      </span>
                    </td>
                    <td className="table-cell"><Badge status={p.status} /></td>
                    <td className="table-cell">
                      <div className="flex gap-1">
                        <button className="w-6 h-6 rounded hover:bg-blue-50 flex items-center justify-center"><Eye className="w-3 h-3 text-blue-500" /></button>
                        <button className="w-6 h-6 rounded hover:bg-amber-50 flex items-center justify-center"><Edit className="w-3 h-3 text-amber-500" /></button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800">Monthly Profit Trend</h3>
            <p className="text-xs text-slate-400">Jan – Jun 2025</p>
          </div>
          <select className="select-field w-36 text-[12px]">
            <option>2025</option><option>2024</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Month', 'Revenue', 'Expenses', 'Net Profit', 'Margin %'].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyTrend.map(m => {
                const margin = ((m.profit / m.revenue) * 100).toFixed(1)
                return (
                  <tr key={m.month} className="table-row">
                    <td className="table-cell pl-5 text-[12px] font-semibold text-slate-800 whitespace-nowrap">{m.month}</td>
                    <td className="table-cell text-[12px] text-slate-700 whitespace-nowrap">{formatCurrency(m.revenue)}</td>
                    <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{formatCurrency(m.expenses)}</td>
                    <td className="table-cell text-[12px] font-bold text-emerald-600 whitespace-nowrap">{formatCurrency(m.profit)}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${margin}%` }} />
                        </div>
                        <span className="text-[11px] font-semibold text-emerald-600">{margin}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
