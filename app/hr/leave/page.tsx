import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { Users, Calendar, CheckCircle2, XCircle, Clock, Plus, Download, Eye, Edit } from 'lucide-react'
import { formatDate } from '@/lib/utils'

const LEAVES = [
  { id: 'LV-001', employee: 'Thomas Brown', avatar: 'TB', dept: 'Design', type: 'Medical Leave', from: '2024-05-20', to: '2024-05-31', days: 12, reason: 'Medical treatment and recovery', status: 'Approved', applied: '2024-05-15' },
  { id: 'LV-002', employee: 'Carlos Mendez', avatar: 'CM', dept: 'Field Operations', type: 'Annual Leave', from: '2024-06-03', to: '2024-06-07', days: 5, reason: 'Family vacation', status: 'Pending', applied: '2024-05-20' },
  { id: 'LV-003', employee: 'Jennifer Lee', avatar: 'JL', dept: 'Finance', type: 'Casual Leave', from: '2024-05-22', to: '2024-05-22', days: 1, reason: 'Personal errand', status: 'Approved', applied: '2024-05-21' },
  { id: 'LV-004', employee: 'David Kim', avatar: 'DK', dept: 'Engineering', type: 'Sick Leave', from: '2024-05-28', to: '2024-05-29', days: 2, reason: 'Flu and fever', status: 'Pending', applied: '2024-05-27' },
  { id: 'LV-005', employee: 'Michael Torres', avatar: 'MT', dept: 'Engineering', type: 'Emergency Leave', from: '2024-05-10', to: '2024-05-10', days: 1, reason: 'Family emergency', status: 'Approved', applied: '2024-05-10' },
]

export default function LeavePage() {
  return (
    <DashboardLayout>
      <PageHeader
        title="Leave Management"
        description="Review and manage employee leave requests"
        actions={
          <>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> New Leave Request</button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Requests" value={LEAVES.length} icon={Calendar} gradient="gradient-blue" />
        <StatCard title="Approved" value={LEAVES.filter(l => l.status === 'Approved').length} trend="up" icon={CheckCircle2} gradient="gradient-green" />
        <StatCard title="Pending" value={LEAVES.filter(l => l.status === 'Pending').length} icon={Clock} gradient="gradient-orange" />
        <StatCard title="Total Days" value={LEAVES.reduce((s, l) => s + l.days, 0)} icon={Calendar} gradient="gradient-purple" />
      </div>

      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Leave Requests</h3>
          <div className="flex items-center gap-1">
            {['All', 'Pending', 'Approved', 'Rejected'].map((tab, i) => (
              <button key={tab} className={`tab-btn ${i === 0 ? 'tab-btn-active' : 'tab-btn-inactive'}`}>{tab}</button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Employee', 'Leave Type', 'From', 'To', 'Days', 'Reason', 'Applied On', 'Status', 'Actions'].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEAVES.map(l => (
                <tr key={l.id} className="table-row">
                  <td className="table-cell pl-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 text-[11px] font-bold flex items-center justify-center">{l.avatar}</div>
                      <div>
                        <p className="font-semibold text-slate-800 text-[13px]">{l.employee}</p>
                        <p className="text-[11px] text-slate-400">{l.dept}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-[12px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{l.type}</span>
                  </td>
                  <td className="table-cell text-[12px] text-slate-600">{formatDate(l.from)}</td>
                  <td className="table-cell text-[12px] text-slate-600">{formatDate(l.to)}</td>
                  <td className="table-cell text-center font-bold text-slate-800">{l.days}</td>
                  <td className="table-cell max-w-[160px]"><p className="text-[12px] text-slate-600 truncate">{l.reason}</p></td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(l.applied)}</td>
                  <td className="table-cell"><Badge status={l.status} /></td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg hover:bg-emerald-50 flex items-center justify-center" title="Approve">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center" title="Reject">
                        <XCircle className="w-3.5 h-3.5 text-red-500" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center" title="View">
                        <Eye className="w-3.5 h-3.5 text-blue-500" />
                      </button>
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
