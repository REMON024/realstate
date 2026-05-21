import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import ProgressBar from '@/components/ui/ProgressBar'
import { Home, DollarSign, TrendingUp, Users, Plus, Filter, Download, Eye, Edit } from 'lucide-react'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'

const units = [
  { id: 'U-001', project: 'Skyline Tower', type: 'Apartment', floor: 12, area: 1850, listPrice: 740000, soldPrice: 725000, buyer: 'James Hartley', saleDate: '2024-01-15', payment: 'Mortgage', status: 'Sold' },
  { id: 'U-002', project: 'Skyline Tower', type: 'Apartment', floor: 8, area: 1420, listPrice: 568000, soldPrice: 560000, buyer: 'Sarah Connell', saleDate: '2024-01-28', payment: 'Cash', status: 'Sold' },
  { id: 'U-003', project: 'Skyline Tower', type: 'Penthouse', floor: 25, area: 4200, listPrice: 2100000, soldPrice: 2050000, buyer: 'David Kwon', saleDate: '2024-02-10', payment: 'Cash', status: 'Sold' },
  { id: 'U-004', project: 'Skyline Tower', type: 'Apartment', floor: 5, area: 1200, listPrice: 480000, soldPrice: null, buyer: null, saleDate: null, payment: null, status: 'Reserved' },
  { id: 'U-005', project: 'Skyline Tower', type: 'Apartment', floor: 15, area: 1650, listPrice: 660000, soldPrice: 652000, buyer: 'Priya Nair', saleDate: '2024-03-05', payment: 'Mortgage', status: 'Sold' },
  { id: 'U-006', project: 'Riverside Villas', type: 'Villa', floor: 1, area: 5800, listPrice: 1950000, soldPrice: 1920000, buyer: 'Michael Torres', saleDate: '2024-01-20', payment: 'Cash', status: 'Sold' },
  { id: 'U-007', project: 'Riverside Villas', type: 'Villa', floor: 1, area: 4900, listPrice: 1650000, soldPrice: 1630000, buyer: 'Emma Lawson', saleDate: '2024-02-14', payment: 'Mortgage', status: 'Sold' },
  { id: 'U-008', project: 'Riverside Villas', type: 'Villa', floor: 1, area: 6200, listPrice: 2100000, soldPrice: null, buyer: null, saleDate: null, payment: null, status: 'Available' },
  { id: 'U-009', project: 'Riverside Villas', type: 'Villa', floor: 1, area: 5100, listPrice: 1720000, soldPrice: 1700000, buyer: 'Carlos Reyes', saleDate: '2024-03-22', payment: 'Cash', status: 'Sold' },
  { id: 'U-010', project: 'Riverside Villas', type: 'Villa', floor: 1, area: 4600, listPrice: 1540000, soldPrice: null, buyer: null, saleDate: null, payment: null, status: 'Reserved' },
  { id: 'U-011', project: 'Grand Hotel Complex', type: 'Suite', floor: 4, area: 980, listPrice: 420000, soldPrice: 415000, buyer: 'Invest Group LLC', saleDate: '2024-02-05', payment: 'Cash', status: 'Sold' },
  { id: 'U-012', project: 'Grand Hotel Complex', type: 'Suite', floor: 6, area: 1100, listPrice: 470000, soldPrice: null, buyer: null, saleDate: null, payment: null, status: 'Under Construction' },
  { id: 'U-013', project: 'Grand Hotel Complex', type: 'Suite', floor: 7, area: 1250, listPrice: 535000, soldPrice: 528000, buyer: 'Nour Al-Farsi', saleDate: '2024-04-18', payment: 'Mortgage', status: 'Sold' },
  { id: 'U-014', project: 'Greenfield Office', type: 'Office', floor: 3, area: 2400, listPrice: 960000, soldPrice: 945000, buyer: 'TechVenture Inc.', saleDate: '2024-01-30', payment: 'Cash', status: 'Sold' },
  { id: 'U-015', project: 'Greenfield Office', type: 'Office', floor: 5, area: 3200, listPrice: 1280000, soldPrice: null, buyer: null, saleDate: null, payment: null, status: 'Available' },
  { id: 'U-016', project: 'Greenfield Office', type: 'Office', floor: 2, area: 1800, listPrice: 720000, soldPrice: 710000, buyer: 'Apex Solutions', saleDate: '2024-05-09', payment: 'Mortgage', status: 'Sold' },
  { id: 'U-017', project: 'Skyline Tower', type: 'Apartment', floor: 18, area: 2100, listPrice: 840000, soldPrice: 825000, buyer: 'Rachel Kim', saleDate: '2024-04-03', payment: 'Cash', status: 'Sold' },
  { id: 'U-018', project: 'Skyline Tower', type: 'Apartment', floor: 10, area: 1550, listPrice: 620000, soldPrice: null, buyer: null, saleDate: null, payment: null, status: 'Available' },
  { id: 'U-019', project: 'Riverside Villas', type: 'Villa', floor: 1, area: 5500, listPrice: 1850000, soldPrice: 1830000, buyer: 'Lena Hofmann', saleDate: '2024-05-20', payment: 'Cash', status: 'Sold' },
  { id: 'U-020', project: 'Greenfield Office', type: 'Office', floor: 4, area: 2800, listPrice: 1120000, soldPrice: null, buyer: null, saleDate: null, payment: null, status: 'Under Construction' },
]

const monthlySales = [
  { month: 'Jan 2024', unitsSold: 4, revenue: 3755000, target: 3500000 },
  { month: 'Feb 2024', unitsSold: 3, revenue: 4063000, target: 3800000 },
  { month: 'Mar 2024', unitsSold: 2, revenue: 2352000, target: 3000000 },
  { month: 'Apr 2024', unitsSold: 3, revenue: 2188000, target: 2500000 },
  { month: 'May 2024', unitsSold: 3, revenue: 3485000, target: 3200000 },
  { month: 'Jun 2024', unitsSold: 0, revenue: 0, target: 3000000 },
]

const projectSummaries = [
  { name: 'Skyline Tower', total: 8, sold: 6, available: 1, reserved: 1, underConstruction: 0 },
  { name: 'Riverside Villas', total: 6, sold: 4, available: 1, reserved: 1, underConstruction: 0 },
  { name: 'Grand Hotel Complex', total: 3, sold: 2, available: 0, reserved: 0, underConstruction: 1 },
  { name: 'Greenfield Office', total: 4, sold: 2, available: 1, reserved: 0, underConstruction: 1 },
]

const totalUnits = units.length
const soldUnits = units.filter(u => u.status === 'Sold').length
const availableUnits = units.filter(u => u.status === 'Available').length
const totalRevenue = units.filter(u => u.soldPrice).reduce((s, u) => s + (u.soldPrice ?? 0), 0)

const projectRevenue: Record<string, number> = {}
units.forEach(u => {
  if (u.soldPrice) {
    projectRevenue[u.project] = (projectRevenue[u.project] ?? 0) + u.soldPrice
  }
})

export default function SalesPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Property Sales"
        description="Unit sales tracking, revenue performance, and buyer management"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> New Sale</button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Units" value={formatNumber(totalUnits)} change={`${soldUnits} sold`} trend="up" icon={Home} gradient="gradient-blue" />
        <StatCard title="Sold Units" value={formatNumber(soldUnits)} subtitle={`${Math.round((soldUnits / totalUnits) * 100)}% sell-through`} trend="up" icon={TrendingUp} gradient="gradient-green" />
        <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} change="↑ 18% vs last period" trend="up" icon={DollarSign} gradient="gradient-orange" />
        <StatCard title="Available Units" value={formatNumber(availableUnits)} change="Ready to sell" trend="flat" icon={Users} gradient="gradient-red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        <div className="card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-800">Monthly Sales Performance</h3>
              <p className="text-xs text-slate-400">Jan – Jun 2024</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['Month', 'Units Sold', 'Revenue', 'Target', 'Achievement'].map(h => (
                    <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlySales.map(m => {
                  const pct = m.target > 0 ? Math.round((m.revenue / m.target) * 100) : 0
                  return (
                    <tr key={m.month} className="table-row">
                      <td className="table-cell pl-5 font-medium text-slate-700 text-[12px] whitespace-nowrap">{m.month}</td>
                      <td className="table-cell text-[12px] text-slate-700 text-center font-semibold">{m.unitsSold}</td>
                      <td className="table-cell text-[12px] text-slate-800 font-semibold whitespace-nowrap">{formatCurrency(m.revenue)}</td>
                      <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatCurrency(m.target)}</td>
                      <td className="table-cell">
                        <div className="flex items-center gap-2 min-w-[90px]">
                          <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full ${pct >= 100 ? 'bg-emerald-500' : pct >= 75 ? 'bg-amber-500' : 'bg-red-400'}`}
                              style={{ width: `${Math.min(pct, 100)}%` }}
                            />
                          </div>
                          <span className={`text-[11px] font-semibold w-8 text-right tabular-nums ${pct >= 100 ? 'text-emerald-600' : pct >= 75 ? 'text-amber-600' : 'text-red-500'}`}>
                            {pct}%
                          </span>
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
              <h3 className="font-bold text-slate-800">Sales by Project</h3>
              <p className="text-xs text-slate-400">{projectSummaries.length} projects</p>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {projectSummaries.map(proj => {
              const pct = Math.round((proj.sold / proj.total) * 100)
              const rev = projectRevenue[proj.name] ?? 0
              return (
                <div key={proj.name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-semibold text-slate-800">{proj.name}</p>
                      <p className="text-[11px] text-slate-400">
                        {proj.sold} sold · {proj.available} available · {proj.reserved} reserved
                        {proj.underConstruction > 0 && ` · ${proj.underConstruction} u/c`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-bold text-slate-800">{formatCurrency(rev)}</p>
                      <p className="text-[11px] text-slate-400">{proj.sold}/{proj.total} units</p>
                    </div>
                  </div>
                  <ProgressBar value={pct} size="sm" />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800">Unit Sales</h3>
            <p className="text-xs text-slate-400">{units.length} total units across all projects</p>
          </div>
          <button className="btn-primary text-xs py-1.5"><Plus className="w-3.5 h-3.5" /> Add Unit</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Unit #', 'Project', 'Type', 'Floor', 'Area (sqft)', 'List Price', 'Sold Price', 'Buyer', 'Sale Date', 'Payment', 'Status', ''].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {units.map(u => (
                <tr key={u.id} className="table-row">
                  <td className="table-cell pl-5 font-mono text-[11px] text-slate-500">{u.id}</td>
                  <td className="table-cell text-[12px] text-slate-700 whitespace-nowrap">{u.project}</td>
                  <td className="table-cell">
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{u.type}</span>
                  </td>
                  <td className="table-cell text-[12px] text-slate-500 text-center">{u.floor}</td>
                  <td className="table-cell text-[12px] text-slate-600 text-right">{formatNumber(u.area)}</td>
                  <td className="table-cell text-[12px] text-slate-600 text-right whitespace-nowrap">{formatCurrency(u.listPrice)}</td>
                  <td className="table-cell text-[12px] font-semibold text-slate-800 text-right whitespace-nowrap">
                    {u.soldPrice ? formatCurrency(u.soldPrice) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">
                    {u.buyer ?? <span className="text-slate-300">—</span>}
                  </td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">
                    {u.saleDate ? formatDate(u.saleDate) : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="table-cell">
                    {u.payment
                      ? <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${u.payment === 'Cash' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>{u.payment}</span>
                      : <span className="text-slate-300 text-[12px]">—</span>
                    }
                  </td>
                  <td className="table-cell"><Badge status={u.status} /></td>
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
