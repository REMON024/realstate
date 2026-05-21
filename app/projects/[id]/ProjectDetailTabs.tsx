'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import ProgressBar from '@/components/ui/ProgressBar'
import Badge from '@/components/ui/Badge'
import MiniStatCard from '@/components/ui/MiniStatCard'
import { formatCurrency, formatDate, offsetDate } from '@/lib/utils'
import {
  MapPin, Users, Calendar, DollarSign, HardHat, ArrowLeft,
  ArrowUpRight, ArrowDownRight,
  Package, Truck, Calculator, Home, BarChart3, Building2,
  PiggyBank, ChevronRight,
} from 'lucide-react'

interface Project {
  id: string; name: string; client: string; type: string; status: string
  priority: string; manager: string; startDate: string; endDate: string
  budget: number; spent: number; progress: number; location: string
  workers: number; description: string; phase: string; contractType: string
}

const TABS = [
  { id: 'overview',    label: 'Overview',            icon: Building2  },
  { id: 'finance',     label: 'Finance (In/Out)',     icon: DollarSign },
  { id: 'capital',     label: 'Capital Investment',   icon: PiggyBank  },
  { id: 'materials',   label: 'Materials',            icon: Package    },
  { id: 'supplychain', label: 'Supply Chain',         icon: Truck      },
  { id: 'costing',     label: 'Costing / Sq.Ft',      icon: Calculator },
  { id: 'sales',       label: 'Sales',                icon: Home       },
  { id: 'profit',      label: 'P&L / Profit',         icon: BarChart3  },
] as const

type TabId = typeof TABS[number]['id']

export default function ProjectDetailTabs({ project }: { project: Project }) {
  const [tab, setTab] = useState<TabId>('overview')

  const contractValue = Math.round(project.budget * 1.18)
  const remaining     = project.budget - project.spent
  const budgetUsedPct = Math.round((project.spent / project.budget) * 100)
  const materialCost  = Math.round(project.spent * 0.38)
  const laborCost     = Math.round(project.spent * 0.32)
  const equipmentCost = Math.round(project.spent * 0.12)
  const overheadCost  = Math.round(project.spent * 0.10)
  const designCost    = Math.round(project.spent * 0.05)
  const permitCost    = Math.round(project.spent * 0.03)

  const d = useMemo(() => {
    const cv      = Math.round(project.budget * 1.18)
    const matCost = Math.round(project.spent * 0.38)
    const labCost = Math.round(project.spent * 0.32)
    const eqCost  = Math.round(project.spent * 0.12)
    const ohCost  = Math.round(project.spent * 0.10)
    const dsnCost = Math.round(project.spent * 0.05)
    const prmCost = Math.round(project.spent * 0.03)

    const cashIn = [
      { id: 'IN-001', description: 'Advance Payment (Mobilization)',   amount: Math.round(cv * 0.15), date: project.startDate,                  type: 'Advance',   status: 'Received' },
      { id: 'IN-002', description: 'Milestone 1 – Foundation Complete',amount: Math.round(cv * 0.20), date: offsetDate(project.startDate,  60),  type: 'Milestone', status: project.progress >= 20  ? 'Received' : 'Pending' },
      { id: 'IN-003', description: 'Milestone 2 – Structural Frame',   amount: Math.round(cv * 0.20), date: offsetDate(project.startDate, 120),  type: 'Milestone', status: project.progress >= 40  ? 'Received' : 'Pending' },
      { id: 'IN-004', description: 'Milestone 3 – MEP Rough-In',       amount: Math.round(cv * 0.20), date: offsetDate(project.startDate, 180),  type: 'Milestone', status: project.progress >= 60  ? 'Received' : 'Pending' },
      { id: 'IN-005', description: 'Milestone 4 – Finishing Works',    amount: Math.round(cv * 0.15), date: offsetDate(project.startDate, 240),  type: 'Milestone', status: project.progress >= 80  ? 'Received' : 'Pending' },
      { id: 'IN-006', description: 'Final Payment on Handover',        amount: Math.round(cv * 0.10), date: project.endDate,                     type: 'Final',     status: project.progress === 100 ? 'Received' : 'Pending' },
    ]

    const cashOut = [
      { id: 'OUT-001', description: 'Material Purchase – Cement & Aggregate',  amount: Math.round(matCost * 0.22), date: offsetDate(project.startDate,  15), category: 'Materials',        status: 'Paid' },
      { id: 'OUT-002', description: 'Monthly Labour Wages',                    amount: Math.round(labCost * 0.18), date: offsetDate(project.startDate,  30), category: 'Labour',           status: 'Paid' },
      { id: 'OUT-003', description: 'Material Purchase – Steel Rebar',         amount: Math.round(matCost * 0.28), date: offsetDate(project.startDate,  20), category: 'Materials',        status: 'Paid' },
      { id: 'OUT-004', description: 'Equipment Rental – Cranes & Excavators',  amount: eqCost,                     date: offsetDate(project.startDate,  10), category: 'Equipment',        status: 'Paid' },
      { id: 'OUT-005', description: 'Subcontractor Payment – Foundation Works',amount: Math.round(labCost * 0.35), date: offsetDate(project.startDate,  70), category: 'Subcontractor',    status: 'Paid' },
      { id: 'OUT-006', description: 'Design & Engineering Fees',               amount: dsnCost,                    date: project.startDate,                  category: 'Professional Fees', status: 'Paid' },
      { id: 'OUT-007', description: 'Permit & Authority Fees',                 amount: prmCost,                    date: offsetDate(project.startDate,   5), category: 'Permits',          status: 'Paid' },
      { id: 'OUT-008', description: 'Material Purchase – Tiles & Finishing',   amount: Math.round(matCost * 0.18), date: offsetDate(project.startDate, 150), category: 'Materials',        status: project.progress >= 50 ? 'Paid' : 'Pending' },
      { id: 'OUT-009', description: 'Monthly Labour Wages',                    amount: Math.round(labCost * 0.18), date: offsetDate(project.startDate,  60), category: 'Labour',           status: 'Paid' },
      { id: 'OUT-010', description: 'Site Overhead & Utilities',               amount: ohCost,                     date: offsetDate(project.startDate,  30), category: 'Overhead',         status: 'Paid' },
    ]

    const totalIn  = cashIn.filter(t => t.status === 'Received').reduce((s, t) => s + t.amount, 0)
    const totalOut = cashOut.filter(t => t.status === 'Paid').reduce((s, t) => s + t.amount, 0)

    const materials = [
      { id: 'M-001', material: 'Cement (OPC 53 Grade)',       category: 'Cement',     qty: Math.round(matCost * 0.08 / 12),  unit: 'Bags',   unitPrice: 12,   totalCost: Math.round(matCost * 0.08), supplier: 'BuildCo Supplies',   status: 'Delivered',                                   date: offsetDate(project.startDate,  15) },
      { id: 'M-002', material: 'TMT Steel Rebar (Fe 500)',    category: 'Steel',      qty: Math.round(matCost * 0.22 / 750), unit: 'MT',     unitPrice: 750,  totalCost: Math.round(matCost * 0.22), supplier: 'MetalMaster Corp',   status: 'Delivered',                                   date: offsetDate(project.startDate,  20) },
      { id: 'M-003', material: 'River Sand (Fine Aggregate)', category: 'Aggregate',  qty: Math.round(matCost * 0.06 / 45),  unit: 'Cu.m',  unitPrice: 45,   totalCost: Math.round(matCost * 0.06), supplier: 'QuarryMasters',      status: 'Delivered',                                   date: offsetDate(project.startDate,  12) },
      { id: 'M-004', material: 'Ready Mix Concrete M30',      category: 'Concrete',   qty: Math.round(matCost * 0.12 / 95),  unit: 'Cu.m',  unitPrice: 95,   totalCost: Math.round(matCost * 0.12), supplier: 'MixRight Concrete',  status: 'Delivered',                                   date: offsetDate(project.startDate,  45) },
      { id: 'M-005', material: 'Red Clay Bricks',             category: 'Bricks',     qty: Math.round(matCost * 0.07 / 0.8), unit: 'Pcs',   unitPrice: 0.8,  totalCost: Math.round(matCost * 0.07), supplier: 'BrickWorks Ltd',     status: 'Delivered',                                   date: offsetDate(project.startDate,  55) },
      { id: 'M-006', material: 'Float Glass (6mm)',           category: 'Glass',      qty: Math.round(matCost * 0.05 / 18),  unit: 'Sq.m', unitPrice: 18,   totalCost: Math.round(matCost * 0.05), supplier: 'GlassTech Industries',status: project.progress >= 50 ? 'Delivered' : 'In Transit', date: offsetDate(project.startDate, 140) },
      { id: 'M-007', material: 'Ceramic Floor Tiles',         category: 'Tiles',      qty: Math.round(matCost * 0.06 / 22),  unit: 'Sq.m', unitPrice: 22,   totalCost: Math.round(matCost * 0.06), supplier: 'TileWorld Corp',     status: project.progress >= 70 ? 'Delivered' : 'Pending', date: offsetDate(project.startDate, 170) },
      { id: 'M-008', material: 'Electrical Conduit & Wiring', category: 'Electrical', qty: Math.round(matCost * 0.07 / 8),   unit: 'Meters',unitPrice: 8,    totalCost: Math.round(matCost * 0.07), supplier: 'ElectroSupply Inc',  status: project.progress >= 40 ? 'Delivered' : 'Pending', date: offsetDate(project.startDate, 100) },
      { id: 'M-009', material: 'UPVC Pipes & Fittings',       category: 'Plumbing',   qty: Math.round(matCost * 0.05 / 6),   unit: 'Meters',unitPrice: 6,    totalCost: Math.round(matCost * 0.05), supplier: 'PipeLine Solutions', status: project.progress >= 35 ? 'Delivered' : 'Pending', date: offsetDate(project.startDate,  90) },
      { id: 'M-010', material: 'Exterior Waterproof Paint',   category: 'Paint',      qty: Math.round(matCost * 0.04 / 4.5), unit: 'Liters',unitPrice: 4.5,  totalCost: Math.round(matCost * 0.04), supplier: 'ColorMaster Paints', status: project.progress >= 80 ? 'Delivered' : 'Pending', date: offsetDate(project.startDate, 200) },
    ]

    const scOrders = [
      { id: 'SCO-001', supplier: 'BuildCo Supplies',   category: 'Cement & Aggregate',    amount: Math.round(matCost * 0.18), orderDate: offsetDate(project.startDate,   5), deliveryDate: offsetDate(project.startDate,  18), status: 'Delivered',                                       performance: 'On Time' },
      { id: 'SCO-002', supplier: 'MetalMaster Corp',   category: 'Steel & Rebar',          amount: Math.round(matCost * 0.25), orderDate: offsetDate(project.startDate,  10), deliveryDate: offsetDate(project.startDate,  22), status: 'Delivered',                                       performance: 'On Time' },
      { id: 'SCO-003', supplier: 'MixRight Concrete',  category: 'Ready Mix Concrete',     amount: Math.round(matCost * 0.14), orderDate: offsetDate(project.startDate,  40), deliveryDate: offsetDate(project.startDate,  47), status: 'Delivered',                                       performance: 'Early'   },
      { id: 'SCO-004', supplier: 'ElectroSupply Inc',  category: 'Electrical Materials',   amount: Math.round(matCost * 0.09), orderDate: offsetDate(project.startDate,  85), deliveryDate: offsetDate(project.startDate, 105), status: project.progress >= 40 ? 'Delivered' : 'In Transit', performance: project.progress >= 40 ? 'On Time' : '—' },
      { id: 'SCO-005', supplier: 'TileWorld Corp',     category: 'Tiles & Ceramics',       amount: Math.round(matCost * 0.08), orderDate: offsetDate(project.startDate, 155), deliveryDate: offsetDate(project.startDate, 175), status: project.progress >= 70 ? 'Delivered' : 'Pending',   performance: project.progress >= 70 ? 'On Time' : '—' },
      { id: 'SCO-006', supplier: 'PipeLine Solutions', category: 'Plumbing',               amount: Math.round(matCost * 0.06), orderDate: offsetDate(project.startDate,  80), deliveryDate: offsetDate(project.startDate,  95), status: project.progress >= 35 ? 'Delivered' : 'Pending',   performance: project.progress >= 35 ? 'Delayed' : '—' },
    ]

    const area          = project.type === 'Residential' ? Math.round(project.budget / 280) : Math.round(project.budget / 320)
    const landCost      = Math.round(project.budget * 0.20)
    const structuralCost= Math.round(project.spent * 0.35)
    const mepCost       = Math.round(project.spent * 0.18)
    const finishingCost = Math.round(project.spent * 0.15)
    const costPerSqft   = Math.round(project.spent / area)
    const budgetPerSqft = Math.round(project.budget / area)
    const categories = [
      { name: 'Land & Site',          cost: landCost,       pct: Math.round((landCost       / project.budget) * 100) },
      { name: 'Structural Works',     cost: structuralCost, pct: Math.round((structuralCost / project.budget) * 100) },
      { name: 'MEP Systems',          cost: mepCost,        pct: Math.round((mepCost        / project.budget) * 100) },
      { name: 'Finishing & Interiors',cost: finishingCost,  pct: Math.round((finishingCost  / project.budget) * 100) },
      { name: 'Design & Engineering', cost: dsnCost,        pct: Math.round((dsnCost        / project.budget) * 100) },
      { name: 'Equipment & Plant',    cost: eqCost,         pct: Math.round((eqCost         / project.budget) * 100) },
      { name: 'Overhead & Admin',     cost: ohCost,         pct: Math.round((ohCost         / project.budget) * 100) },
      { name: 'Permits & Authority',  cost: prmCost,        pct: Math.round((prmCost        / project.budget) * 100) },
    ]

    const isSellable  = ['Residential', 'Hospitality'].includes(project.type)
    const totalUnits  = project.type === 'Residential' ? Math.round(project.budget / 220000) : Math.floor(project.budget / 800000)
    const soldUnits   = Math.round(totalUnits * project.progress / 100 * 0.85)
    const avgSalePrice= Math.round(cv / totalUnits)
    const salesRevenue= soldUnits * avgSalePrice
    const units = Array.from({ length: Math.min(totalUnits, 12) }, (_, i) => ({
      no:        `${String.fromCharCode(65 + Math.floor(i / 4))}${(i % 4) + 1}`,
      type:      project.type === 'Residential' ? (i % 3 === 0 ? '3BHK' : i % 3 === 1 ? '2BHK' : '1BHK') : 'Suite',
      floor:     Math.floor(i / 4) + 1,
      area:      project.type === 'Residential' ? [850, 1200, 1800][i % 3] : 600,
      listPrice: avgSalePrice,
      soldPrice: i < soldUnits ? Math.round(avgSalePrice * (0.92 + ((i * 7 + 3) % 10) / 100)) : null,
      status:    i < soldUnits ? 'Sold' : i < soldUnits + 2 ? 'Reserved' : project.progress < 50 ? 'Under Construction' : 'Available',
      buyer:     i < soldUnits ? ['Ahmed Al-Rashid','Sarah Johnson','Mark Chen','Priya Sharma','Carlos Rivera','Emma Williams','David Park','Lisa Thompson'][i % 8] : null,
    }))

    const monthlyPL = ['Jan','Feb','Mar','Apr','May','Jun'].map((month, i) => {
      const rev  = Math.round((cv              / 12) * (0.8  + (i * 13 % 40) / 100))
      const cost = Math.round((project.budget  / 12) * (0.85 + (i *  7 % 30) / 100))
      const p    = rev - cost
      return { month, revenue: rev, cost, profit: p, margin: Math.round((p / rev) * 100) }
    })

    return {
      cashIn, cashOut, totalIn, totalOut, netCash: totalIn - totalOut,
      materials, scOrders,
      area, costPerSqft, budgetPerSqft, categories,
      isSellable, totalUnits, soldUnits, salesRevenue, units,
      monthlyPL,
    }
  }, [project])

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Link href="/projects" className="flex items-center gap-1.5 text-slate-400 hover:text-slate-700 text-[13px] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Projects
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
        <span className="text-[13px] text-slate-600 font-medium">{project.name}</span>
      </div>

      <div className="card p-5 mb-5">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
              <HardHat className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-800">{project.name}</h1>
                <Badge status={project.status} />
                <Badge status={project.priority} />
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{project.client} · {project.contractType}</p>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <span className="flex items-center gap-1 text-[12px] text-slate-500"><MapPin className="w-3 h-3" />{project.location}</span>
                <span className="flex items-center gap-1 text-[12px] text-slate-500"><Users className="w-3 h-3" />{project.workers} workers</span>
                <span className="flex items-center gap-1 text-[12px] text-slate-500"><Calendar className="w-3 h-3" />{formatDate(project.startDate)} – {formatDate(project.endDate)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[11px] text-slate-400">Contract Value</p>
              <p className="text-lg font-bold text-emerald-600">{formatCurrency(contractValue)}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-slate-400">Budget</p>
              <p className="text-lg font-bold text-slate-800">{formatCurrency(project.budget)}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[12px] text-slate-500">Overall Progress — {project.phase}</span>
            <span className="text-[12px] font-bold text-slate-700">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} />
        </div>
      </div>

      <div className="card mb-5">
        <div className="flex overflow-x-auto border-b border-slate-100">
          {TABS.map(t => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-3.5 text-[12.5px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                  tab === t.id
                    ? 'border-orange-500 text-orange-600 bg-orange-50/30'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {tab === 'overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniStatCard label="Contract Value"  value={<span className="text-emerald-600">{formatCurrency(contractValue)}</span>} sub="Total project contract" />
            <MiniStatCard label="Budget"          value={<span className="text-slate-800">{formatCurrency(project.budget)}</span>}  sub={`${budgetUsedPct}% utilized`} />
            <MiniStatCard label="Spent to Date"   value={<span className="text-orange-600">{formatCurrency(project.spent)}</span>}  sub="Of total budget" />
            <MiniStatCard label="Remaining"       value={<span className={remaining < 0 ? 'text-red-600' : 'text-blue-600'}>{formatCurrency(remaining)}</span>} sub="Budget balance" />
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 mb-1">Project Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-slate-100">
              {[
                { label: 'Project Type',   value: project.type },
                { label: 'Current Phase',  value: project.phase },
                { label: 'Contract Type',  value: project.contractType },
                { label: 'Site Manager',   value: project.manager },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-[11px] text-slate-400">{item.label}</p>
                  <p className="text-[13px] font-semibold text-slate-700 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 mb-3">Budget Utilization</h3>
            <div className="space-y-2">
              {[
                { label: 'Materials',        cost: materialCost,               color: 'bg-blue-500'    },
                { label: 'Labour',           cost: laborCost,                  color: 'bg-emerald-500' },
                { label: 'Equipment',        cost: equipmentCost,              color: 'bg-purple-500'  },
                { label: 'Overhead',         cost: overheadCost,               color: 'bg-amber-500'   },
                { label: 'Design & Permits', cost: designCost + permitCost,    color: 'bg-pink-500'    },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-[12px] text-slate-500 w-36 flex-shrink-0">{item.label}</span>
                  <ProgressBar value={Math.round((item.cost / project.budget) * 100)} showLabel={false} color={item.color} size="sm" />
                  <span className="text-[12px] font-semibold text-slate-700 w-24 text-right">{formatCurrency(item.cost)}</span>
                  <span className="text-[11px] text-slate-400 w-8 text-right">{Math.round((item.cost / project.budget) * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'finance' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniStatCard label="Total Received (In)"  value={<span className="text-emerald-600">{formatCurrency(d.totalIn)}</span>}  accent="border-emerald-400" />
            <MiniStatCard label="Total Paid Out"       value={<span className="text-red-500">{formatCurrency(d.totalOut)}</span>}     accent="border-red-400" />
            <MiniStatCard label="Net Cash Position"    value={<span className={d.netCash >= 0 ? 'text-blue-600' : 'text-red-600'}>{formatCurrency(d.netCash)}</span>} accent="border-blue-400" />
            <MiniStatCard label="Contract Value"       value={<span className="text-amber-600">{formatCurrency(contractValue)}</span>} accent="border-amber-400" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="card">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100 bg-emerald-50/50">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-emerald-700">Money In — Client Payments</h3>
              </div>
              <table className="w-full">
                <thead><tr>{['ID','Description','Amount','Type','Date','Status'].map(h => <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>)}</tr></thead>
                <tbody>
                  {d.cashIn.map(t => (
                    <tr key={t.id} className="table-row">
                      <td className="table-cell pl-5 font-mono text-[11px] text-slate-400">{t.id}</td>
                      <td className="table-cell text-[12px] text-slate-700">{t.description}</td>
                      <td className="table-cell font-bold text-emerald-600 text-[12px]">+{formatCurrency(t.amount)}</td>
                      <td className="table-cell"><span className="text-[11px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">{t.type}</span></td>
                      <td className="table-cell text-[11px] text-slate-400 whitespace-nowrap">{formatDate(t.date)}</td>
                      <td className="table-cell"><Badge status={t.status} /></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot><tr><td colSpan={2} className="px-5 py-3 text-[12px] font-bold text-slate-600">Total Received</td><td className="py-3 font-bold text-emerald-600 text-[13px]">{formatCurrency(d.totalIn)}</td><td colSpan={3} /></tr></tfoot>
              </table>
            </div>
            <div className="card">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-100 bg-red-50/50">
                <ArrowDownRight className="w-4 h-4 text-red-500" />
                <h3 className="font-bold text-red-600">Money Out — Expenses</h3>
              </div>
              <table className="w-full">
                <thead><tr>{['ID','Description','Amount','Category','Date','Status'].map(h => <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>)}</tr></thead>
                <tbody>
                  {d.cashOut.map(t => (
                    <tr key={t.id} className="table-row">
                      <td className="table-cell pl-5 font-mono text-[11px] text-slate-400">{t.id}</td>
                      <td className="table-cell text-[12px] text-slate-700">{t.description}</td>
                      <td className="table-cell font-bold text-red-500 text-[12px]">-{formatCurrency(t.amount)}</td>
                      <td className="table-cell"><span className="text-[11px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">{t.category}</span></td>
                      <td className="table-cell text-[11px] text-slate-400 whitespace-nowrap">{formatDate(t.date)}</td>
                      <td className="table-cell"><Badge status={t.status} /></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot><tr><td colSpan={2} className="px-5 py-3 text-[12px] font-bold text-slate-600">Total Paid Out</td><td className="py-3 font-bold text-red-500 text-[13px]">{formatCurrency(d.totalOut)}</td><td colSpan={3} /></tr></tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'capital' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniStatCard label="Total Investment" value={<span className="text-blue-600">{formatCurrency(Math.round(project.budget * 1.05))}</span>} />
            <MiniStatCard label="Equity"           value={<span className="text-purple-600">{formatCurrency(Math.round(project.budget * 0.40))}</span>} sub="40% of funding" />
            <MiniStatCard label="Bank Loans"       value={<span className="text-amber-600">{formatCurrency(Math.round(project.budget * 0.55))}</span>} sub="55% of funding" />
            <MiniStatCard label="Grants"           value={<span className="text-emerald-600">{formatCurrency(Math.round(project.budget * 0.05))}</span>} sub="5% of funding" />
          </div>
          <div className="card">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">Investment Sources</h3></div>
            <table className="w-full">
              <thead><tr>{['Source','Type','Amount','Interest Rate','Disbursed','Maturity','Status'].map(h => <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>)}</tr></thead>
              <tbody>
                {[
                  { source: project.client,              type: 'Equity',           amount: Math.round(project.budget * 0.25), rate: '—',   disbursed: formatDate(project.startDate),               maturity: formatDate(project.endDate),                    status: 'Active' },
                  { source: 'Silent Investor Group',     type: 'Equity',           amount: Math.round(project.budget * 0.15), rate: '—',   disbursed: formatDate(project.startDate),               maturity: formatDate(project.endDate),                    status: 'Active' },
                  { source: 'National Bank',             type: 'Bank Loan',        amount: Math.round(project.budget * 0.35), rate: '7.5%',disbursed: formatDate(project.startDate),               maturity: formatDate(offsetDate(project.endDate, 730)),   status: 'Active' },
                  { source: 'City Bank',                 type: 'Bank Loan',        amount: Math.round(project.budget * 0.20), rate: '8.2%',disbursed: formatDate(offsetDate(project.startDate, 30)),maturity: formatDate(offsetDate(project.endDate, 365)),   status: 'Active' },
                  { source: 'Government Development Fund',type:'Government Grant',  amount: Math.round(project.budget * 0.05), rate: '—',   disbursed: formatDate(offsetDate(project.startDate, 15)),maturity: '—',                                            status: 'Active' },
                ].map((inv, i) => (
                  <tr key={i} className="table-row">
                    <td className="table-cell pl-5 font-semibold text-[12px] text-slate-800">{inv.source}</td>
                    <td className="table-cell"><Badge status={inv.type} /></td>
                    <td className="table-cell font-bold text-[12px] text-slate-800">{formatCurrency(inv.amount)}</td>
                    <td className="table-cell text-[12px] text-slate-600 font-semibold">{inv.rate}</td>
                    <td className="table-cell text-[12px] text-slate-500">{inv.disbursed}</td>
                    <td className="table-cell text-[12px] text-slate-500">{inv.maturity}</td>
                    <td className="table-cell"><Badge status={inv.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'materials' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniStatCard label="Total Material Cost"  value={<span className="text-slate-800">{formatCurrency(materialCost)}</span>} sub="38% of total spend" />
            <MiniStatCard label="Material Orders"      value={<span className="text-blue-600">{d.materials.length}</span>} />
            <MiniStatCard label="Delivered"            value={<span className="text-emerald-600">{d.materials.filter(m => m.status === 'Delivered').length}</span>} />
            <MiniStatCard label="Pending / In Transit" value={<span className="text-amber-600">{d.materials.filter(m => m.status !== 'Delivered').length}</span>} />
          </div>
          <div className="card">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">Materials Purchase Log</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr>{['ID','Material','Category','Qty','Unit Price','Total Cost','Supplier','Order Date','Status'].map(h => <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>)}</tr></thead>
                <tbody>
                  {d.materials.map(m => (
                    <tr key={m.id} className="table-row">
                      <td className="table-cell pl-5 font-mono text-[11px] text-slate-400">{m.id}</td>
                      <td className="table-cell text-[12px] font-semibold text-slate-800">{m.material}</td>
                      <td className="table-cell"><span className="text-[11px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{m.category}</span></td>
                      <td className="table-cell text-[12px] text-slate-700">{m.qty.toLocaleString()} <span className="text-slate-400">{m.unit}</span></td>
                      <td className="table-cell text-[12px] text-slate-600">{formatCurrency(m.unitPrice)}</td>
                      <td className="table-cell font-bold text-[12px] text-slate-800">{formatCurrency(m.totalCost)}</td>
                      <td className="table-cell text-[12px] text-slate-500">{m.supplier}</td>
                      <td className="table-cell text-[11px] text-slate-400 whitespace-nowrap">{formatDate(m.date)}</td>
                      <td className="table-cell"><Badge status={m.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'supplychain' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniStatCard label="Suppliers Engaged"   value={<span className="text-slate-800">{d.scOrders.length}</span>} />
            <MiniStatCard label="Delivered Orders"    value={<span className="text-emerald-600">{d.scOrders.filter(o => o.status === 'Delivered').length}</span>} />
            <MiniStatCard label="In Transit / Pending"value={<span className="text-amber-600">{d.scOrders.filter(o => o.status !== 'Delivered').length}</span>} />
            <MiniStatCard label="Total Procurement"   value={<span className="text-blue-600">{formatCurrency(d.scOrders.reduce((s, o) => s + o.amount, 0))}</span>} />
          </div>
          <div className="card">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">Supplier Orders for {project.name}</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead><tr>{['Order ID','Supplier','Category','Amount','Order Date','Delivery Date','Status','Performance'].map(h => <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>)}</tr></thead>
                <tbody>
                  {d.scOrders.map(o => (
                    <tr key={o.id} className="table-row">
                      <td className="table-cell pl-5 font-mono text-[11px] text-slate-400">{o.id}</td>
                      <td className="table-cell font-semibold text-[12px] text-slate-800">{o.supplier}</td>
                      <td className="table-cell"><span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{o.category}</span></td>
                      <td className="table-cell font-bold text-[12px] text-slate-800">{formatCurrency(o.amount)}</td>
                      <td className="table-cell text-[11px] text-slate-400 whitespace-nowrap">{formatDate(o.orderDate)}</td>
                      <td className="table-cell text-[11px] text-slate-400 whitespace-nowrap">{formatDate(o.deliveryDate)}</td>
                      <td className="table-cell"><Badge status={o.status} /></td>
                      <td className="table-cell">{o.performance === '—' ? <span className="text-slate-300">—</span> : <Badge status={o.performance} />}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'costing' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniStatCard label="Total Area"            value={<span className="text-slate-800">{d.area.toLocaleString()} <span className="text-sm font-normal">sq.ft</span></span>} />
            <MiniStatCard label="Cost / Sq.Ft (Actual)" value={<span className="text-orange-600">${d.costPerSqft}</span>} />
            <MiniStatCard label="Cost / Sq.Ft (Budget)" value={<span className="text-blue-600">${d.budgetPerSqft}</span>} />
            <MiniStatCard label="Variance"              value={<span className={d.costPerSqft > d.budgetPerSqft ? 'text-red-500' : 'text-emerald-600'}>{d.costPerSqft > d.budgetPerSqft ? '+' : ''}{Math.round(((d.costPerSqft - d.budgetPerSqft) / d.budgetPerSqft) * 100)}%</span>} />
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 mb-4">Cost Breakdown by Category</h3>
            <div className="space-y-3">
              {d.categories.map(cat => (
                <div key={cat.name} className="flex items-center gap-3">
                  <span className="text-[12px] text-slate-500 w-40 flex-shrink-0">{cat.name}</span>
                  <ProgressBar value={cat.pct} showLabel={false} color="bg-orange-400" size="sm" />
                  <span className="text-[12px] font-semibold text-slate-700 w-28 text-right">{formatCurrency(cat.cost)}</span>
                  <span className="text-[11px] text-slate-400 w-8 text-right">{cat.pct}%</span>
                  <span className="text-[11px] text-slate-500 w-24 text-right">${Math.round(cat.cost / d.area)}/sq.ft</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[13px] font-bold text-slate-700">Total</span>
              <span className="text-[13px] font-bold text-slate-800">{formatCurrency(project.spent)}</span>
              <span className="text-[13px] font-bold text-orange-600">${d.costPerSqft}/sq.ft</span>
            </div>
          </div>
        </div>
      )}

      {tab === 'sales' && (
        <div className="space-y-5">
          {d.isSellable ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MiniStatCard label="Total Units"    value={<span className="text-slate-800">{d.totalUnits}</span>} />
                <MiniStatCard label="Sold"           value={<span className="text-emerald-600">{d.soldUnits}</span>}  sub={`${Math.round((d.soldUnits / d.totalUnits) * 100)}% sold`} />
                <MiniStatCard label="Sales Revenue"  value={<span className="text-blue-600">{formatCurrency(d.salesRevenue)}</span>} />
                <MiniStatCard label="Available Units"value={<span className="text-amber-600">{d.totalUnits - d.soldUnits - 2}</span>} />
              </div>
              <div className="card">
                <div className="px-5 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">Unit Sales Detail</h3></div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr>{['Unit','Type','Floor','Area','List Price','Sold Price','Buyer','Status'].map(h => <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>)}</tr></thead>
                    <tbody>
                      {d.units.map((u, i) => (
                        <tr key={i} className="table-row">
                          <td className="table-cell pl-5 font-bold text-[12px] text-slate-800">{u.no}</td>
                          <td className="table-cell text-[12px] text-slate-600">{u.type}</td>
                          <td className="table-cell text-[12px] text-slate-600">Floor {u.floor}</td>
                          <td className="table-cell text-[12px] text-slate-600">{u.area.toLocaleString()} sq.ft</td>
                          <td className="table-cell text-[12px] text-slate-700">{formatCurrency(u.listPrice)}</td>
                          <td className="table-cell font-bold text-[12px] text-emerald-600">{u.soldPrice ? formatCurrency(u.soldPrice) : <span className="text-slate-300">—</span>}</td>
                          <td className="table-cell text-[12px] text-slate-600">{u.buyer ?? <span className="text-slate-300">—</span>}</td>
                          <td className="table-cell"><Badge status={u.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="card p-10 text-center">
              <Home className="w-10 h-10 text-slate-200 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">Sales tracking is available for Residential and Hospitality projects.</p>
              <p className="text-slate-400 text-sm mt-1">This is a {project.type} project — revenue is tracked under Finance (In/Out).</p>
            </div>
          )}
        </div>
      )}

      {tab === 'profit' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MiniStatCard label="Contract Revenue" value={<span className="text-emerald-600">{formatCurrency(contractValue)}</span>}                            accent="border-emerald-400" />
            <MiniStatCard label="Total Cost"       value={<span className="text-red-500">{formatCurrency(project.budget)}</span>}                              accent="border-red-400" />
            <MiniStatCard label="Gross Profit"     value={<span className="text-blue-600">{formatCurrency(contractValue - project.budget)}</span>}             accent="border-blue-400" />
            <MiniStatCard label="Profit Margin"    value={<span className="text-orange-600">{Math.round(((contractValue - project.budget) / contractValue) * 100)}%</span>} accent="border-orange-400" />
          </div>
          <div className="card p-5">
            <h3 className="font-bold text-slate-800 mb-4">Profit & Loss Statement</h3>
            <div className="space-y-1">
              <div className="flex justify-between py-2 border-b border-slate-100"><span className="text-sm font-bold text-slate-700">Revenue</span></div>
              <div className="flex justify-between py-1.5 pl-4"><span className="text-[13px] text-slate-600">Contract Value</span><span className="text-[13px] font-semibold text-emerald-600">{formatCurrency(contractValue)}</span></div>
              <div className="flex justify-between py-2 border-b border-slate-100 mt-2"><span className="text-sm font-bold text-slate-700">Cost of Works</span></div>
              {[
                ['Materials',           materialCost],
                ['Labour',              laborCost],
                ['Equipment',           equipmentCost],
                ['Design & Engineering',designCost],
                ['Overhead & Admin',    overheadCost],
                ['Permits & Authority', permitCost],
              ].map(([name, cost]) => (
                <div key={name as string} className="flex justify-between py-1.5 pl-4">
                  <span className="text-[13px] text-slate-600">{name}</span>
                  <span className="text-[13px] text-red-500">({formatCurrency(cost as number)})</span>
                </div>
              ))}
              <div className="flex justify-between py-2 border-t border-slate-200 mt-1"><span className="text-[13px] font-bold text-slate-700">Total Cost</span><span className="text-[13px] font-bold text-red-500">({formatCurrency(project.budget)})</span></div>
              <div className="flex justify-between py-3 border-t-2 border-slate-200 bg-emerald-50 px-3 rounded-lg mt-2">
                <span className="text-sm font-bold text-slate-800">Gross Profit</span>
                <span className="text-sm font-bold text-emerald-600">{formatCurrency(contractValue - project.budget)} ({Math.round(((contractValue - project.budget) / contractValue) * 100)}%)</span>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="px-5 py-4 border-b border-slate-100"><h3 className="font-bold text-slate-800">Monthly P&L Trend</h3></div>
            <table className="w-full">
              <thead><tr>{['Month','Revenue','Cost','Gross Profit','Margin','Status'].map(h => <th key={h} className="table-head first:pl-5">{h}</th>)}</tr></thead>
              <tbody>
                {d.monthlyPL.map(m => (
                  <tr key={m.month} className="table-row">
                    <td className="table-cell pl-5 font-semibold text-[12px] text-slate-700">{m.month} 2024</td>
                    <td className="table-cell font-semibold text-emerald-600 text-[12px]">{formatCurrency(m.revenue)}</td>
                    <td className="table-cell text-red-500 text-[12px]">{formatCurrency(m.cost)}</td>
                    <td className="table-cell font-bold text-[12px] text-slate-800">{formatCurrency(m.profit)}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-2 w-28">
                        <ProgressBar value={m.margin} showLabel={false} size="xs" />
                        <span className="text-[12px] font-semibold text-slate-700 w-8 flex-shrink-0">{m.margin}%</span>
                      </div>
                    </td>
                    <td className="table-cell"><Badge status={m.profit > 0 ? 'Active' : 'At Risk'} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
