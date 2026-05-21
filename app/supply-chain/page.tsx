import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { Truck, Package, Globe, Star, Plus, Filter, Eye, Edit, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const SUPPLIERS = [
  { id: 'SUP-001', name: 'BuildCo Supplies Ltd', category: 'Cement & Aggregate', location: 'Dubai, UAE', rating: 5, totalOrders: 48, onTime: 96, quality: 98, status: 'Active' },
  { id: 'SUP-002', name: 'MetalMaster Corp', category: 'Steel & Metal', location: 'Sharjah, UAE', rating: 4, totalOrders: 35, onTime: 89, quality: 94, status: 'Active' },
  { id: 'SUP-003', name: 'ElectroSupply Inc', category: 'Electrical', location: 'Abu Dhabi, UAE', rating: 4, totalOrders: 27, onTime: 91, quality: 95, status: 'Active' },
  { id: 'SUP-004', name: 'PipeWorld Solutions', category: 'Plumbing', location: 'Ajman, UAE', rating: 3, totalOrders: 19, onTime: 78, quality: 88, status: 'Active' },
  { id: 'SUP-005', name: 'TileWorld Corp', category: 'Tiles & Ceramics', location: 'Ras Al Khaimah, UAE', rating: 5, totalOrders: 41, onTime: 94, quality: 97, status: 'Active' },
  { id: 'SUP-006', name: 'GlasCraft Industries', category: 'Glass & Glazing', location: 'Dubai, UAE', rating: 4, totalOrders: 22, onTime: 86, quality: 92, status: 'Active' },
  { id: 'SUP-007', name: 'PrimeCoat Paints', category: 'Paint', location: 'Fujairah, UAE', rating: 3, totalOrders: 14, onTime: 71, quality: 85, status: 'Inactive' },
  { id: 'SUP-008', name: 'TimberPro Woodworks', category: 'Wood & Timber', location: 'Dubai, UAE', rating: 4, totalOrders: 31, onTime: 88, quality: 93, status: 'Active' },
  { id: 'SUP-009', name: 'SafeGuard PPE', category: 'Safety Equipment', location: 'Sharjah, UAE', rating: 5, totalOrders: 56, onTime: 97, quality: 99, status: 'Active' },
  { id: 'SUP-010', name: 'HeavyLift Machinery', category: 'Heavy Machinery', location: 'Abu Dhabi, UAE', rating: 4, totalOrders: 18, onTime: 83, quality: 91, status: 'Inactive' },
]

const ORDERS = [
  { id: 'ORD-2024-001', supplier: 'BuildCo Supplies Ltd', materials: 'Portland Cement × 500 bags, Gravel × 20 tons', amount: 148500, orderDate: '2024-05-01', expectedDelivery: '2024-05-12', status: 'Delivered', performance: 'On Time' },
  { id: 'ORD-2024-002', supplier: 'MetalMaster Corp', materials: 'Steel Rebar 12mm × 15 tons, Structural Steel × 8 tons', amount: 215000, orderDate: '2024-05-03', expectedDelivery: '2024-05-20', status: 'Delivered', performance: 'On Time' },
  { id: 'ORD-2024-003', supplier: 'ElectroSupply Inc', materials: 'Electrical Conduit × 800m, Junction Boxes × 120 pcs', amount: 42000, orderDate: '2024-05-08', expectedDelivery: '2024-05-22', status: 'In Transit', performance: 'On Time' },
  { id: 'ORD-2024-004', supplier: 'TileWorld Corp', materials: 'Ceramic Floor Tiles × 2500 sqm', amount: 87500, orderDate: '2024-05-10', expectedDelivery: '2024-05-28', status: 'In Transit', performance: 'On Time' },
  { id: 'ORD-2024-005', supplier: 'SafeGuard PPE', materials: 'Safety Helmets × 200, Hi-Vis Vests × 300, Gloves × 500 pairs', amount: 18200, orderDate: '2024-05-12', expectedDelivery: '2024-05-16', status: 'Delivered', performance: 'On Time' },
  { id: 'ORD-2024-006', supplier: 'GlasCraft Industries', materials: 'Double Glazed Panels × 180 sqm, Curtain Wall Units × 24', amount: 326000, orderDate: '2024-05-14', expectedDelivery: '2024-06-05', status: 'Processing', performance: 'On Time' },
  { id: 'ORD-2024-007', supplier: 'PipeWorld Solutions', materials: 'HDPE Pipes 200mm × 600m, PPR Fittings × 400 pcs', amount: 54300, orderDate: '2024-05-15', expectedDelivery: '2024-05-25', status: 'Delayed', performance: 'Delayed' },
  { id: 'ORD-2024-008', supplier: 'TimberPro Woodworks', materials: 'Timber Beams 4×6 × 120 pcs, Plywood Sheets × 300', amount: 76800, orderDate: '2024-05-17', expectedDelivery: '2024-06-01', status: 'Processing', performance: 'On Time' },
  { id: 'ORD-2024-009', supplier: 'BuildCo Supplies Ltd', materials: 'River Sand × 50 tons, Crushed Stone × 30 tons', amount: 62000, orderDate: '2024-05-18', expectedDelivery: '2024-05-24', status: 'Delivered', performance: 'On Time' },
  { id: 'ORD-2024-010', supplier: 'PrimeCoat Paints', materials: 'Exterior Paint × 800L, Interior Emulsion × 600L', amount: 28400, orderDate: '2024-05-19', expectedDelivery: '2024-05-30', status: 'Delayed', performance: 'Delayed' },
  { id: 'ORD-2024-011', supplier: 'MetalMaster Corp', materials: 'Mild Steel Plates × 5 tons, Angle Iron × 3 tons', amount: 94500, orderDate: '2024-05-20', expectedDelivery: '2024-06-08', status: 'Processing', performance: 'On Time' },
  { id: 'ORD-2024-012', supplier: 'HeavyLift Machinery', materials: 'Tower Crane Rental × 3 months, Concrete Pump × 1 month', amount: 485000, orderDate: '2024-05-22', expectedDelivery: '2024-06-01', status: 'In Transit', performance: 'On Time' },
]

export default function SupplyChainPage() {
  const activeSuppliers = SUPPLIERS.filter(s => s.status === 'Active').length
  const activeOrders = ORDERS.filter(o => o.status === 'In Transit' || o.status === 'Processing').length
  const onTimeOrders = ORDERS.filter(o => o.performance === 'On Time').length
  const onTimePct = Math.round((onTimeOrders / ORDERS.length) * 100)
  const totalProcurement = ORDERS.reduce((s, o) => s + o.amount, 0)

  return (
    <DashboardLayout>
      <PageHeader
        title="Supply Chain Management"
        description="Monitor suppliers, track orders and procurement performance"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> Add Supplier</button>
          </>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Suppliers" value={activeSuppliers} icon={Globe} gradient="gradient-blue" />
        <StatCard title="Active Orders" value={activeOrders} icon={Package} gradient="gradient-orange" />
        <StatCard title="On-Time Delivery" value={`${onTimePct}%`} icon={CheckCircle2} gradient="gradient-green" />
        <StatCard title="Total Procurement" value={formatCurrency(totalProcurement)} icon={Truck} gradient="gradient-purple" />
      </div>

      <div className="card mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-[14px] font-semibold text-slate-800">Supplier Network</h2>
          <span className="text-[12px] text-slate-400">{SUPPLIERS.length} suppliers</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Supplier Name', 'Category', 'Location', 'Rating', 'Total Orders', 'On-Time %', 'Quality Score', 'Status', ''].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SUPPLIERS.map(s => (
                <tr key={s.id} className="table-row">
                  <td className="table-cell pl-5">
                    <div>
                      <p className="text-[13px] font-semibold text-slate-800">{s.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{s.id}</p>
                    </div>
                  </td>
                  <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{s.category}</td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{s.location}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < s.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                      ))}
                    </div>
                  </td>
                  <td className="table-cell text-center font-bold text-slate-800">{s.totalOrders}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5 w-16">
                        <div className={`h-1.5 rounded-full ${s.onTime >= 90 ? 'bg-emerald-500' : s.onTime >= 80 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${s.onTime}%` }} />
                      </div>
                      <span className="text-[12px] font-semibold text-slate-700">{s.onTime}%</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className={`text-[12px] font-bold ${s.quality >= 95 ? 'text-emerald-600' : s.quality >= 88 ? 'text-amber-600' : 'text-red-500'}`}>{s.quality}%</span>
                  </td>
                  <td className="table-cell"><Badge status={s.status} /></td>
                  <td className="table-cell">
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded hover:bg-blue-50 flex items-center justify-center"><Eye className="w-3.5 h-3.5 text-blue-500" /></button>
                      <button className="w-7 h-7 rounded hover:bg-amber-50 flex items-center justify-center"><Edit className="w-3.5 h-3.5 text-amber-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-[14px] font-semibold text-slate-800">Order Tracking</h2>
          <span className="text-[12px] text-slate-400">{ORDERS.length} orders</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Order ID', 'Supplier', 'Materials', 'Amount', 'Order Date', 'Expected Delivery', 'Status', 'Performance', ''].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map(o => (
                <tr key={o.id} className="table-row">
                  <td className="table-cell pl-5 font-mono text-[12px] font-semibold text-slate-800">{o.id}</td>
                  <td className="table-cell text-[13px] text-slate-700 whitespace-nowrap">{o.supplier}</td>
                  <td className="table-cell max-w-[220px]">
                    <p className="text-[12px] text-slate-500 truncate">{o.materials}</p>
                  </td>
                  <td className="table-cell font-bold text-slate-800 whitespace-nowrap">{formatCurrency(o.amount)}</td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(o.orderDate)}</td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(o.expectedDelivery)}</td>
                  <td className="table-cell"><Badge status={o.status} /></td>
                  <td className="table-cell">
                    {o.performance === 'Delayed' ? (
                      <div className="flex items-center gap-1 text-red-500">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span className="text-[12px] font-semibold">Delayed</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="text-[12px] font-semibold">On Time</span>
                      </div>
                    )}
                  </td>
                  <td className="table-cell">
                    <div className="flex gap-1">
                      <button className="w-7 h-7 rounded hover:bg-blue-50 flex items-center justify-center"><Eye className="w-3.5 h-3.5 text-blue-500" /></button>
                      <button className="w-7 h-7 rounded hover:bg-amber-50 flex items-center justify-center"><Edit className="w-3.5 h-3.5 text-amber-500" /></button>
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
