import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { ShoppingCart, Plus, Download, Filter, Eye, Edit, Truck } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const ORDERS = [
  { id: 'PO-2024-001', supplier: 'BuildCo Supplies', items: 3, amount: 245000, date: '2024-05-10', delivery: '2024-05-20', project: 'Skyline Tower', status: 'Delivered' },
  { id: 'PO-2024-002', supplier: 'MetalMaster Corp', items: 2, amount: 85000, date: '2024-05-12', delivery: '2024-05-25', project: 'Greenfield Office', status: 'In Transit' },
  { id: 'PO-2024-003', supplier: 'ElectroSupply Inc', items: 5, amount: 42000, date: '2024-05-15', delivery: '2024-06-01', project: 'Grand Hotel', status: 'Pending' },
  { id: 'PO-2024-004', supplier: 'TileWorld Corp', items: 1, amount: 27500, date: '2024-05-18', delivery: '2024-06-05', project: 'Riverside Villas', status: 'Pending' },
  { id: 'PO-2024-005', supplier: 'SafeGuard PPE', items: 4, amount: 8200, date: '2024-05-22', delivery: '2024-05-28', project: 'General', status: 'Delivered' },
]

export default function PurchasePage() {
  const total = ORDERS.reduce((s, o) => s + o.amount, 0)
  return (
    <DashboardLayout>
      <PageHeader title="Purchase Orders" description="Manage procurement and supplier orders"
        actions={<><button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button><button className="btn-primary"><Plus className="w-4 h-4" /> New PO</button></>}
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Orders" value={ORDERS.length} icon={ShoppingCart} gradient="gradient-blue" />
        <StatCard title="Total Value" value={formatCurrency(total)} icon={ShoppingCart} gradient="gradient-orange" />
        <StatCard title="In Transit" value={ORDERS.filter(o => o.status === 'In Transit').length} icon={Truck} gradient="gradient-purple" />
        <StatCard title="Pending" value={ORDERS.filter(o => o.status === 'Pending').length} icon={ShoppingCart} gradient="gradient-green" />
      </div>
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr>{['PO Number', 'Supplier', 'Items', 'Amount', 'Order Date', 'Delivery', 'Project', 'Status', ''].map(h => <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {ORDERS.map(o => (
                <tr key={o.id} className="table-row">
                  <td className="table-cell pl-5 font-mono text-[12px] font-semibold text-slate-800">{o.id}</td>
                  <td className="table-cell text-[13px] text-slate-700">{o.supplier}</td>
                  <td className="table-cell text-center font-bold text-slate-800">{o.items}</td>
                  <td className="table-cell font-bold text-slate-800">{formatCurrency(o.amount)}</td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(o.date)}</td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(o.delivery)}</td>
                  <td className="table-cell text-[12px] text-slate-600">{o.project}</td>
                  <td className="table-cell"><Badge status={o.status} /></td>
                  <td className="table-cell"><div className="flex gap-1"><button className="w-7 h-7 rounded hover:bg-blue-50 flex items-center justify-center"><Eye className="w-3.5 h-3.5 text-blue-500" /></button><button className="w-7 h-7 rounded hover:bg-amber-50 flex items-center justify-center"><Edit className="w-3.5 h-3.5 text-amber-500" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
