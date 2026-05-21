import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { TrendingUp, DollarSign, Plus, Download, Filter, Eye, Edit, PiggyBank, Building2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const investments = [
  { id: 'INV-001', source: 'First National Bank',    type: 'Bank Loan',       project: 'Skyline Tower',      amount: 12000000, rate: 6.5,  status: 'Active',   maturity: '2027-03-15', returns: 1560000 },
  { id: 'INV-002', source: 'Alpha Equity Partners',  type: 'Equity',          project: 'Grand Hotel',        amount: 18000000, rate: 12.0, status: 'Active',   maturity: '2028-06-30', returns: 4320000 },
  { id: 'INV-003', source: 'City Infrastructure Bond', type: 'Bond',          project: 'Greenfield Office',  amount: 8500000,  rate: 5.25, status: 'Active',   maturity: '2026-12-01', returns: 892500  },
  { id: 'INV-004', source: 'Ministry of Housing',    type: 'Government Grant', project: 'Medical Center',    amount: 5000000,  rate: 0,    status: 'Closed',   maturity: '2024-09-30', returns: 0       },
  { id: 'INV-005', source: 'Meridian Capital Fund',  type: 'Equity',          project: 'Solar Farm',         amount: 9200000,  rate: 14.5, status: 'Active',   maturity: '2029-01-20', returns: 2668000 },
  { id: 'INV-006', source: 'Regional Development Bank', type: 'Bank Loan',    project: 'Skyline Tower',      amount: 7500000,  rate: 7.0,  status: 'Active',   maturity: '2027-07-01', returns: 1050000 },
  { id: 'INV-007', source: 'Apex Growth Ventures',   type: 'Equity',          project: 'Grand Hotel',        amount: 6000000,  rate: 11.0, status: 'Pending',  maturity: '2028-04-15', returns: 1320000 },
  { id: 'INV-008', source: 'National Green Bond',    type: 'Bond',            project: 'Solar Farm',         amount: 4800000,  rate: 4.75, status: 'Active',   maturity: '2026-08-20', returns: 456000  },
  { id: 'INV-009', source: 'Urban Renewal Fund',     type: 'Government Grant', project: 'Greenfield Office', amount: 3200000,  rate: 0,    status: 'Closed',   maturity: '2024-12-31', returns: 0       },
  { id: 'INV-010', source: 'Premier Finance Corp',   type: 'Bank Loan',       project: 'Medical Center',     amount: 9500000,  rate: 6.8,  status: 'Active',   maturity: '2028-02-28', returns: 1292000 },
  { id: 'INV-011', source: 'Horizon Asset Management', type: 'Bond',          project: 'Skyline Tower',      amount: 5300000,  rate: 5.0,  status: 'Pending',  maturity: '2027-10-10', returns: 530000  },
  { id: 'INV-012', source: 'BlueSky Private Equity', type: 'Equity',          project: 'Medical Center',     amount: 11000000, rate: 13.0, status: 'Active',   maturity: '2029-05-31', returns: 2860000 },
]

const typeBreakdown = [
  { type: 'Bank Loan',        color: 'border-blue-200 bg-blue-50',     text: 'text-blue-700',    iconBg: 'bg-blue-500'    },
  { type: 'Equity',           color: 'border-emerald-200 bg-emerald-50', text: 'text-emerald-700', iconBg: 'bg-emerald-500' },
  { type: 'Bond',             color: 'border-purple-200 bg-purple-50', text: 'text-purple-700',  iconBg: 'bg-purple-500'  },
  { type: 'Government Grant', color: 'border-amber-200 bg-amber-50',   text: 'text-amber-700',   iconBg: 'bg-amber-500'   },
]

export default function CapitalInvestmentPage() {
  const totalInvestment = investments.reduce((s, i) => s + i.amount, 0)
  const activeCount = investments.filter(i => i.status === 'Active').length
  const totalReturns = investments.reduce((s, i) => s + i.returns, 0)
  const roi = ((totalReturns / totalInvestment) * 100).toFixed(1)

  return (
    <DashboardLayout>
      <PageHeader
        title="Capital Investment"
        description="Track funding sources, investor returns, and investment performance"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> New Investment</button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Investment" value={formatCurrency(totalInvestment)} change="↑ 9% vs last year" trend="up" icon={DollarSign} gradient="gradient-blue" />
        <StatCard title="Active Investments" value={activeCount} subtitle={`of ${investments.length} total`} trend="up" icon={Building2} gradient="gradient-green" />
        <StatCard title="Total Returns" value={formatCurrency(totalReturns)} change="↑ 14% vs last year" trend="up" icon={TrendingUp} gradient="gradient-orange" />
        <StatCard title="Portfolio ROI" value={`${roi}%`} subtitle="Blended annual rate" trend="up" icon={PiggyBank} gradient="gradient-red" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {typeBreakdown.map(tb => {
          const items = investments.filter(i => i.type === tb.type)
          const total = items.reduce((s, i) => s + i.amount, 0)
          return (
            <div key={tb.type} className={`card border ${tb.color} p-4`}>
              <div className={`w-8 h-8 rounded-lg ${tb.iconBg} flex items-center justify-center mb-3`}>
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <p className={`text-lg font-bold ${tb.text}`}>{formatCurrency(total)}</p>
              <p className="text-[12px] text-slate-600 font-medium mt-0.5">{tb.type}</p>
              <p className="text-[11px] text-slate-400">{items.length} investment{items.length !== 1 ? 's' : ''}</p>
            </div>
          )
        })}
      </div>

      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800">Investment Register</h3>
            <p className="text-xs text-slate-400">{investments.length} total records</p>
          </div>
          <button className="btn-primary text-xs py-1.5"><Plus className="w-3.5 h-3.5" /> Add</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['ID', 'Source / Investor', 'Type', 'Project', 'Amount', 'Interest Rate', 'Status', 'Maturity Date', ''].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {investments.map(inv => (
                <tr key={inv.id} className="table-row">
                  <td className="table-cell pl-5 font-mono text-[11px] text-slate-500">{inv.id}</td>
                  <td className="table-cell">
                    <p className="text-[12px] font-semibold text-slate-800">{inv.source}</p>
                  </td>
                  <td className="table-cell">
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{inv.type}</span>
                  </td>
                  <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{inv.project}</td>
                  <td className="table-cell font-semibold text-slate-800 text-[12px] whitespace-nowrap">{formatCurrency(inv.amount)}</td>
                  <td className="table-cell text-[12px] text-slate-600 text-center">
                    {inv.rate > 0 ? `${inv.rate}%` : <span className="text-slate-400">—</span>}
                  </td>
                  <td className="table-cell"><Badge status={inv.status} /></td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(inv.maturity)}</td>
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
    </DashboardLayout>
  )
}
