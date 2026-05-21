import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { Package, ShoppingCart, Truck, CheckCircle2, Plus, Filter, Eye, Edit, Download } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const MATERIALS = [
  { id: 'MPO-2024-001', material: 'Portland Cement OPC 42.5', category: 'Cement', supplier: 'BuildCo Supplies Ltd', qty: 800, unit: 'Bags', unitPrice: 185, total: 148000, project: 'Skyline Tower', orderDate: '2024-05-01', status: 'Delivered', qualityCheck: 'Passed' },
  { id: 'MPO-2024-002', material: 'Steel Rebar 12mm Grade 60', category: 'Steel Rebar', supplier: 'MetalMaster Corp', qty: 25, unit: 'Tons', unitPrice: 5200, total: 130000, project: 'Grand Hotel', orderDate: '2024-05-02', status: 'Delivered', qualityCheck: 'Passed' },
  { id: 'MPO-2024-003', material: 'Red Clay Bricks Class A', category: 'Bricks', supplier: 'BuildCo Supplies Ltd', qty: 50000, unit: 'Pcs', unitPrice: 1.8, total: 90000, project: 'Riverside Villas', orderDate: '2024-05-04', status: 'Delivered', qualityCheck: 'Passed' },
  { id: 'MPO-2024-004', material: 'Washed River Sand', category: 'Sand & Aggregate', supplier: 'BuildCo Supplies Ltd', qty: 80, unit: 'Tons', unitPrice: 420, total: 33600, project: 'Skyline Tower', orderDate: '2024-05-05', status: 'Delivered', qualityCheck: 'Passed' },
  { id: 'MPO-2024-005', material: 'Porcelain Floor Tiles 60×60', category: 'Ceramic Tiles', supplier: 'TileWorld Corp', qty: 3200, unit: 'Sqm', unitPrice: 48, total: 153600, project: 'Grand Hotel', orderDate: '2024-05-06', status: 'In Transit', qualityCheck: 'Pending' },
  { id: 'MPO-2024-006', material: 'Tempered Glass Panels 12mm', category: 'Glass Panels', supplier: 'GlasCraft Industries', qty: 240, unit: 'Sqm', unitPrice: 380, total: 91200, project: 'Greenfield Office', orderDate: '2024-05-07', status: 'In Transit', qualityCheck: 'Pending' },
  { id: 'MPO-2024-007', material: 'Hardwood Timber Beams 4×6', category: 'Timber', supplier: 'TimberPro Woodworks', qty: 150, unit: 'Pcs', unitPrice: 320, total: 48000, project: 'Riverside Villas', orderDate: '2024-05-08', status: 'Delivered', qualityCheck: 'Passed' },
  { id: 'MPO-2024-008', material: 'Exterior Weather Shield Paint', category: 'Paint', supplier: 'PrimeCoat Paints', qty: 1200, unit: 'Litres', unitPrice: 22, total: 26400, project: 'Medical Center', orderDate: '2024-05-09', status: 'Pending', qualityCheck: 'Pending' },
  { id: 'MPO-2024-009', material: 'HDPE Pipe 200mm PN16', category: 'PVC Pipes', supplier: 'PipeWorld Solutions', qty: 800, unit: 'Metres', unitPrice: 68, total: 54400, project: 'Skyline Tower', orderDate: '2024-05-10', status: 'In Transit', qualityCheck: 'Pending' },
  { id: 'MPO-2024-010', material: 'PVC Electrical Conduit 25mm', category: 'Electrical Conduit', supplier: 'ElectroSupply Inc', qty: 2400, unit: 'Metres', unitPrice: 12, total: 28800, project: 'Grand Hotel', orderDate: '2024-05-11', status: 'Delivered', qualityCheck: 'Passed' },
  { id: 'MPO-2024-011', material: 'Ready Mix Concrete M35', category: 'Ready Mix Concrete', supplier: 'BuildCo Supplies Ltd', qty: 320, unit: 'Cu.m', unitPrice: 680, total: 217600, project: 'Skyline Tower', orderDate: '2024-05-12', status: 'Delivered', qualityCheck: 'Passed' },
  { id: 'MPO-2024-012', material: 'Bituminous Waterproofing Membrane', category: 'Waterproofing', supplier: 'BuildCo Supplies Ltd', qty: 1800, unit: 'Sqm', unitPrice: 34, total: 61200, project: 'Grand Hotel', orderDate: '2024-05-13', status: 'Pending', qualityCheck: 'Pending' },
  { id: 'MPO-2024-013', material: 'Steel Rebar 16mm Grade 60', category: 'Steel Rebar', supplier: 'MetalMaster Corp', qty: 18, unit: 'Tons', unitPrice: 5400, total: 97200, project: 'Medical Center', orderDate: '2024-05-14', status: 'In Transit', qualityCheck: 'Pending' },
  { id: 'MPO-2024-014', material: 'Hollow Concrete Blocks 20cm', category: 'Bricks', supplier: 'BuildCo Supplies Ltd', qty: 12000, unit: 'Pcs', unitPrice: 4.5, total: 54000, project: 'Greenfield Office', orderDate: '2024-05-15', status: 'Delivered', qualityCheck: 'Passed' },
  { id: 'MPO-2024-015', material: 'Crushed Granite Aggregate 20mm', category: 'Sand & Aggregate', supplier: 'BuildCo Supplies Ltd', qty: 60, unit: 'Tons', unitPrice: 390, total: 23400, project: 'Riverside Villas', orderDate: '2024-05-16', status: 'Delivered', qualityCheck: 'Passed' },
  { id: 'MPO-2024-016', material: 'Plywood Shuttering Sheets 18mm', category: 'Timber', supplier: 'TimberPro Woodworks', qty: 400, unit: 'Sheets', unitPrice: 145, total: 58000, project: 'Skyline Tower', orderDate: '2024-05-17', status: 'Pending', qualityCheck: 'Pending' },
  { id: 'MPO-2024-017', material: 'Interior Emulsion Paint White', category: 'Paint', supplier: 'PrimeCoat Paints', qty: 900, unit: 'Litres', unitPrice: 18, total: 16200, project: 'Greenfield Office', orderDate: '2024-05-18', status: 'Pending', qualityCheck: 'Pending' },
  { id: 'MPO-2024-018', material: 'Polished Marble Tiles 80×80', category: 'Ceramic Tiles', supplier: 'TileWorld Corp', qty: 1400, unit: 'Sqm', unitPrice: 125, total: 175000, project: 'Grand Hotel', orderDate: '2024-05-19', status: 'In Transit', qualityCheck: 'Pending' },
]

const CATEGORIES = ['All', 'Cement', 'Steel Rebar', 'Bricks', 'Sand & Aggregate', 'Ceramic Tiles', 'Glass Panels', 'Timber', 'Paint', 'PVC Pipes', 'Electrical Conduit', 'Ready Mix Concrete', 'Waterproofing']

export default function MaterialsPurchasePage() {
  const totalPurchases = MATERIALS.length
  const totalAmount = MATERIALS.reduce((s, m) => s + m.total, 0)
  const pendingDeliveries = MATERIALS.filter(m => m.status === 'In Transit' || m.status === 'Pending').length
  const thisMonthAmount = MATERIALS.filter(m => m.orderDate.startsWith('2024-05')).reduce((s, m) => s + m.total, 0)

  return (
    <DashboardLayout>
      <PageHeader
        title="Materials Purchase"
        description="Track material procurement orders, deliveries and quality checks"
        actions={
          <>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> New Purchase</button>
          </>
        }
      />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Purchases" value={totalPurchases} icon={ShoppingCart} gradient="gradient-blue" />
        <StatCard title="Total Amount" value={formatCurrency(totalAmount)} icon={Package} gradient="gradient-orange" />
        <StatCard title="Pending Deliveries" value={pendingDeliveries} icon={Truck} gradient="gradient-purple" />
        <StatCard title="This Month" value={formatCurrency(thisMonthAmount)} icon={CheckCircle2} gradient="gradient-green" />
      </div>

      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`px-3 py-1 rounded-full text-[12px] font-medium transition-colors ${cat === 'All' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['PO ID', 'Material', 'Category', 'Supplier', 'Qty / Unit', 'Unit Price', 'Total', 'Project', 'Order Date', 'Delivery', 'Quality', ''].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATERIALS.map(m => (
                <tr key={m.id} className="table-row">
                  <td className="table-cell pl-5 font-mono text-[12px] font-semibold text-slate-800">{m.id}</td>
                  <td className="table-cell max-w-[180px]">
                    <p className="text-[13px] font-medium text-slate-800 truncate">{m.material}</p>
                  </td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{m.category}</td>
                  <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{m.supplier}</td>
                  <td className="table-cell text-[12px] text-slate-700 whitespace-nowrap">
                    <span className="font-semibold">{m.qty.toLocaleString()}</span>
                    <span className="text-slate-400 ml-1">{m.unit}</span>
                  </td>
                  <td className="table-cell text-[12px] text-slate-700 whitespace-nowrap">{formatCurrency(m.unitPrice)}</td>
                  <td className="table-cell font-bold text-slate-800 whitespace-nowrap">{formatCurrency(m.total)}</td>
                  <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{m.project}</td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(m.orderDate)}</td>
                  <td className="table-cell"><Badge status={m.status} /></td>
                  <td className="table-cell">
                    {m.qualityCheck === 'Passed' ? (
                      <div className="flex items-center gap-1 text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="text-[12px] font-semibold">Passed</span>
                      </div>
                    ) : (
                      <span className="text-[12px] text-slate-400 font-medium">Pending</span>
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
