import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils'
import {
  Package, Plus, Filter, Download, AlertTriangle,
  TrendingDown, ArrowUpCircle, ArrowDownCircle, Eye, Edit, Trash2, Search,
} from 'lucide-react'
import inventoryData from '@/lib/data/inventory.json'

const CATEGORIES = [...new Set(inventoryData.map(i => i.category))]

export default function InventoryPage() {
  const totalValue = inventoryData.reduce((s, i) => s + i.totalValue, 0)
  const lowStock = inventoryData.filter(i => i.status === 'Low Stock').length
  const outOfStock = inventoryData.filter(i => i.status === 'Out of Stock').length
  const inStock = inventoryData.filter(i => i.status === 'In Stock').length

  return (
    <DashboardLayout>
      <PageHeader
        title="Inventory Management"
        description="Track materials, equipment, and stock levels"
        actions={
          <>
            <button className="btn-secondary"><ArrowUpCircle className="w-4 h-4 text-green-500" /> Stock In</button>
            <button className="btn-secondary"><ArrowDownCircle className="w-4 h-4 text-red-500" /> Stock Out</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> Add Item</button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Items" value={inventoryData.length} subtitle={`${inStock} in stock`} icon={Package} gradient="gradient-blue" />
        <StatCard title="Total Value" value={formatCurrency(totalValue)} subtitle="All warehouses" icon={Package} gradient="gradient-green" />
        <StatCard title="Low Stock" value={lowStock} change={lowStock > 0 ? 'Reorder needed' : 'All good'} trend={lowStock > 0 ? 'down' : 'up'} icon={AlertTriangle} gradient="gradient-orange" />
        <StatCard title="Out of Stock" value={outOfStock} change={outOfStock > 0 ? 'Urgent reorder' : 'All good'} trend={outOfStock > 0 ? 'down' : 'up'} icon={TrendingDown} gradient="gradient-red" />
      </div>

      {/* Alert banner */}
      {(lowStock > 0 || outOfStock > 0) && (
        <div className="flex items-start gap-3 p-4 mb-5 rounded-xl bg-amber-50 border border-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[13px] font-bold text-amber-800">Stock Alert</p>
            <p className="text-[12px] text-amber-700 mt-0.5">
              <strong>{outOfStock}</strong> item(s) out of stock and <strong>{lowStock}</strong> item(s) below minimum. Reorder to avoid project delays.
            </p>
          </div>
        </div>
      )}

      {/* Category summary */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-5">
        {CATEGORIES.map(cat => {
          const items = inventoryData.filter(i => i.category === cat)
          const val = items.reduce((s, i) => s + i.totalValue, 0)
          return (
            <div key={cat} className="card px-3 py-3 cursor-pointer hover:border-orange-300 transition-colors">
              <p className="text-[10px] text-slate-400 font-medium truncate">{cat}</p>
              <p className="text-[15px] font-bold text-slate-800 mt-0.5">{items.length}</p>
              <p className="text-[10px] text-slate-400">{formatCurrency(val)}</p>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 gap-4 flex-wrap">
          <div className="flex items-center gap-1 overflow-x-auto">
            {['All Items', 'In Stock', 'Low Stock', 'Out of Stock'].map((tab, i) => (
              <button key={tab} className={`tab-btn whitespace-nowrap ${i === 0 ? 'tab-btn-active' : 'tab-btn-inactive'}`}>{tab}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <select className="select-field w-44 text-[13px]">
              <option>All Categories</option>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input className="input-field pl-9 w-48 text-[13px]" placeholder="Search items..." />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Item', 'SKU', 'Category', 'Qty', 'Min Stock', 'Unit Cost', 'Total Value', 'Supplier', 'Warehouse', 'Last Updated', 'Status', 'Actions'].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventoryData.map(item => (
                <tr key={item.id} className="table-row">
                  <td className="table-cell pl-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <Package className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-[12px] max-w-[160px] truncate">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-[11px] text-slate-500 font-mono">{item.sku}</td>
                  <td className="table-cell">
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full whitespace-nowrap">{item.category}</span>
                  </td>
                  <td className="table-cell">
                    <span className={`text-[14px] font-bold tabular-nums ${
                      item.quantity === 0 ? 'text-red-600'
                      : item.quantity < item.minStock ? 'text-amber-600'
                      : 'text-slate-800'
                    }`}>
                      {formatNumber(item.quantity)}
                    </span>
                    <span className="text-[11px] text-slate-400 ml-1">{item.unit}</span>
                  </td>
                  <td className="table-cell text-[12px] text-slate-500">{formatNumber(item.minStock)}</td>
                  <td className="table-cell text-[13px] text-slate-700">{formatCurrency(item.unitCost)}</td>
                  <td className="table-cell font-semibold text-slate-800 text-[13px]">{formatCurrency(item.totalValue)}</td>
                  <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{item.supplier}</td>
                  <td className="table-cell text-[11px] text-slate-500 whitespace-nowrap">{item.warehouse}</td>
                  <td className="table-cell text-[11px] text-slate-500 whitespace-nowrap">{formatDate(item.lastUpdated)}</td>
                  <td className="table-cell"><Badge status={item.status} /></td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center"><Eye className="w-3.5 h-3.5 text-blue-500" /></button>
                      <button className="w-7 h-7 rounded-lg hover:bg-amber-50 flex items-center justify-center"><Edit className="w-3.5 h-3.5 text-amber-500" /></button>
                      <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-[12px] text-slate-500">Showing 1–{inventoryData.length} of {inventoryData.length} items · Total value: <strong>{formatCurrency(totalValue)}</strong></p>
          <div className="flex items-center gap-1">
            {[1,2].map(n => (
              <button key={n} className={`w-8 h-8 text-xs rounded-lg font-medium ${n === 1 ? 'bg-orange-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
