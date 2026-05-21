import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import StatCard from '@/components/ui/StatCard'
import { Calculator, TrendingUp, TrendingDown, Building2, Filter, Download, BarChart3 } from 'lucide-react'
import { formatCurrency, formatNumber } from '@/lib/utils'

const projects = [
  { id: 1, name: 'Skyline Tower', type: 'Residential', location: 'Downtown', area: 42000, land: 3800000, construction: 7200000, mep: 1900000, finishing: 2100000, overhead: 980000, budget: 390 },
  { id: 2, name: 'Riverside Villas', type: 'Residential', location: 'North District', area: 28500, land: 2200000, construction: 4800000, mep: 1100000, finishing: 1600000, overhead: 620000, budget: 370 },
  { id: 3, name: 'Grand Hotel Complex', type: 'Commercial', location: 'City Center', area: 138000, land: 14500000, construction: 21000000, mep: 6800000, finishing: 7200000, overhead: 3100000, budget: 380 },
  { id: 4, name: 'Greenfield Office Park', type: 'Commercial', location: 'Tech Zone', area: 95000, land: 8200000, construction: 13500000, mep: 4200000, finishing: 4800000, overhead: 2100000, budget: 350 },
  { id: 5, name: 'Palm Residences', type: 'Residential', location: 'West End', area: 18200, land: 1400000, construction: 2900000, mep: 680000, finishing: 920000, overhead: 380000, budget: 360 },
  { id: 6, name: 'Marina Bay Apartments', type: 'Residential', location: 'Waterfront', area: 47500, land: 5100000, construction: 8600000, mep: 2300000, finishing: 3100000, overhead: 1200000, budget: 430 },
  { id: 7, name: 'Central Business Tower', type: 'Commercial', location: 'CBD', area: 112000, land: 11800000, construction: 18200000, mep: 5600000, finishing: 6100000, overhead: 2700000, budget: 400 },
  { id: 8, name: 'Sunrise Apartments', type: 'Residential', location: 'East Side', area: 9800, land: 720000, construction: 1480000, mep: 360000, finishing: 480000, overhead: 195000, budget: 340 },
  { id: 9, name: 'Harbor View Condos', type: 'Residential', location: 'Harbor District', area: 33600, land: 3600000, construction: 5800000, mep: 1450000, finishing: 2050000, overhead: 820000, budget: 410 },
  { id: 10, name: 'Innovation Hub', type: 'Commercial', location: 'Science Park', area: 68000, land: 5900000, construction: 9800000, mep: 3100000, finishing: 3400000, overhead: 1500000, budget: 345 },
]

const enriched = projects.map(p => {
  const total = p.land + p.construction + p.mep + p.finishing + p.overhead
  const costPerSqft = Math.round(total / p.area)
  const variance = costPerSqft - p.budget
  return { ...p, total, costPerSqft, variance }
})

const avgCost = Math.round(enriched.reduce((s, p) => s + p.costPerSqft, 0) / enriched.length)
const highestCost = Math.max(...enriched.map(p => p.costPerSqft))
const lowestCost = Math.min(...enriched.map(p => p.costPerSqft))
const totalArea = enriched.reduce((s, p) => s + p.area, 0)

const totalLand = enriched.reduce((s, p) => s + p.land, 0)
const totalConstruction = enriched.reduce((s, p) => s + p.construction, 0)
const totalMep = enriched.reduce((s, p) => s + p.mep, 0)
const totalFinishing = enriched.reduce((s, p) => s + p.finishing, 0)
const totalOverhead = enriched.reduce((s, p) => s + p.overhead, 0)
const grandTotal = totalLand + totalConstruction + totalMep + totalFinishing + totalOverhead

const categories = [
  { label: 'Land Cost', value: totalLand, color: 'bg-blue-500' },
  { label: 'Construction', value: totalConstruction, color: 'bg-emerald-500' },
  { label: 'MEP', value: totalMep, color: 'bg-orange-500' },
  { label: 'Finishing', value: totalFinishing, color: 'bg-purple-500' },
  { label: 'Overhead', value: totalOverhead, color: 'bg-slate-400' },
]

export default function CostingPage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Total Costing per Square Foot"
        description="Cost analysis and budget variance across all projects"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><BarChart3 className="w-4 h-4" /> Report</button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Average Cost/sqft" value={`$${formatNumber(avgCost)}`} change="Across all projects" trend="flat" icon={Calculator} gradient="gradient-blue" />
        <StatCard title="Highest Cost/sqft" value={`$${formatNumber(highestCost)}`} subtitle="Marina Bay Apartments" trend="down" icon={TrendingUp} gradient="gradient-red" />
        <StatCard title="Lowest Cost/sqft" value={`$${formatNumber(lowestCost)}`} subtitle="Sunrise Apartments" trend="up" icon={TrendingDown} gradient="gradient-green" />
        <StatCard title="Total Area Managed" value={`${formatNumber(totalArea)} sqft`} change={`${enriched.length} active projects`} trend="up" icon={Building2} gradient="gradient-orange" />
      </div>

      <div className="card mb-5">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800">Cost Breakdown per Project</h3>
            <p className="text-xs text-slate-400">{enriched.length} projects — all figures in USD</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Project Name', 'Type', 'Location', 'Area (sqft)', 'Land Cost', 'Construction', 'MEP', 'Finishing', 'Overhead', 'Total Cost', 'Cost/sqft', 'Budget/sqft', 'Variance'].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {enriched.map(p => (
                <tr key={p.id} className="table-row">
                  <td className="table-cell pl-5">
                    <p className="font-semibold text-slate-800 text-[12px] whitespace-nowrap">{p.name}</p>
                  </td>
                  <td className="table-cell">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${p.type === 'Residential' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{p.location}</td>
                  <td className="table-cell text-[12px] text-slate-700 text-right">{formatNumber(p.area)}</td>
                  <td className="table-cell text-[12px] text-slate-600 text-right whitespace-nowrap">{formatCurrency(p.land)}</td>
                  <td className="table-cell text-[12px] text-slate-600 text-right whitespace-nowrap">{formatCurrency(p.construction)}</td>
                  <td className="table-cell text-[12px] text-slate-600 text-right whitespace-nowrap">{formatCurrency(p.mep)}</td>
                  <td className="table-cell text-[12px] text-slate-600 text-right whitespace-nowrap">{formatCurrency(p.finishing)}</td>
                  <td className="table-cell text-[12px] text-slate-600 text-right whitespace-nowrap">{formatCurrency(p.overhead)}</td>
                  <td className="table-cell font-semibold text-slate-800 text-[12px] text-right whitespace-nowrap">{formatCurrency(p.total)}</td>
                  <td className="table-cell font-bold text-slate-800 text-[12px] text-right whitespace-nowrap">${formatNumber(p.costPerSqft)}</td>
                  <td className="table-cell text-[12px] text-slate-500 text-right whitespace-nowrap">${formatNumber(p.budget)}</td>
                  <td className="table-cell text-right">
                    <span className={`text-[12px] font-semibold ${p.variance <= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                      {p.variance <= 0 ? '▼' : '▲'} ${Math.abs(p.variance)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-2 mb-5">
          <BarChart3 className="w-4 h-4 text-slate-400" />
          <h3 className="font-bold text-slate-800">Cost Category Breakdown</h3>
          <span className="text-xs text-slate-400 ml-1">— average % share across all projects</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {categories.map(cat => {
            const pct = Math.round((cat.value / grandTotal) * 100)
            return (
              <div key={cat.label} className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl">
                <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{pct}%</span>
                </div>
                <p className="text-[12px] font-semibold text-slate-700 text-center">{cat.label}</p>
                <p className="text-[11px] text-slate-400 text-center">{formatCurrency(cat.value)}</p>
                <div className="w-full bg-slate-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${cat.color}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">Grand Total Portfolio Cost</p>
          <p className="text-base font-bold text-slate-800">{formatCurrency(grandTotal)}</p>
        </div>
      </div>
    </DashboardLayout>
  )
}
