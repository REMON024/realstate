import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { formatCurrency, formatDate, formatNumber } from '@/lib/utils'
import { Package, Plus, Filter, Download, AlertTriangle, TrendingDown } from 'lucide-react'
import inventoryData from '@/lib/data/inventory.json'

const categories = [...new Set(inventoryData.map(i => i.category))]

export default function InventoryPage() {
  const totalValue = inventoryData.reduce((s, i) => s + i.totalValue, 0)
  const lowStock = inventoryData.filter(i => i.status === 'Low Stock').length
  const outOfStock = inventoryData.filter(i => i.status === 'Out of Stock').length

  return (
    <DashboardLayout title="Inventory" subtitle="Materials & equipment management">
      <PageHeader
        title="Inventory Management"
        description={`${inventoryData.length} items tracked across all warehouses`}
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Items" value={inventoryData.length} icon={Package} iconColor="text-blue-600" iconBg="bg-blue-100" />
        <StatCard title="Total Value" value={formatCurrency(totalValue)} icon={Package} iconColor="text-green-600" iconBg="bg-green-100" />
        <StatCard
          title="Low Stock"
          value={lowStock}
          change="Reorder needed"
          changeType={lowStock > 0 ? 'down' : 'neutral'}
          icon={AlertTriangle}
          iconColor="text-yellow-600"
          iconBg="bg-yellow-100"
        />
        <StatCard
          title="Out of Stock"
          value={outOfStock}
          change="Urgent reorder"
          changeType={outOfStock > 0 ? 'down' : 'neutral'}
          icon={TrendingDown}
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />
      </div>

      {/* Low stock alerts */}
      {(lowStock > 0 || outOfStock > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-yellow-800">Stock Alert</p>
            <p className="text-sm text-yellow-700 mt-0.5">
              {outOfStock} item(s) are out of stock and {lowStock} item(s) are running low. Reorder to avoid project delays.
            </p>
          </div>
        </div>
      )}

      {/* Category filter + Table */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100">
        <div className="flex items-center gap-2 p-4 border-b border-slate-100 overflow-x-auto">
          <button className="px-4 py-1.5 text-sm rounded-lg font-medium bg-primary-500 text-white whitespace-nowrap">All Categories</button>
          {categories.map((cat) => (
            <button key={cat} className="px-4 py-1.5 text-sm rounded-lg font-medium text-slate-500 hover:bg-slate-100 whitespace-nowrap transition-colors">
              {cat}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Item', 'Category', 'SKU', 'Qty / Unit', 'Min Stock', 'Unit Cost', 'Total Value', 'Warehouse', 'Updated', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-3 px-4 first:pl-6 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0">
                  <td className="py-3.5 px-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Package className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-xs">{item.name}</p>
                        <p className="text-xs text-slate-400">{item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">{item.sku}</td>
                  <td className="py-3.5 px-4">
                    <span className={`font-semibold text-sm ${item.quantity === 0 ? 'text-red-600' : item.quantity < item.minStock ? 'text-yellow-600' : 'text-slate-800'}`}>
                      {formatNumber(item.quantity)}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">{item.unit}</span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{formatNumber(item.minStock)} {item.unit}</td>
                  <td className="py-3.5 px-4 text-slate-700">{formatCurrency(item.unitCost)}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">{formatCurrency(item.totalValue)}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{item.warehouse}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">{formatDate(item.lastUpdated)}</td>
                  <td className="py-3.5 px-4"><Badge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
