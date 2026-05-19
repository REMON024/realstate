import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { Users, Calendar, CheckCircle2, XCircle, Clock, Download, Filter } from 'lucide-react'
import employeesData from '@/lib/data/employees.json'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEKS = ['20 May', '21 May', '22 May', '23 May', '24 May', '25 May']

function randStatus(emp: string, day: string) {
  const seed = (emp.charCodeAt(0) + day.charCodeAt(0)) % 10
  if (seed < 7) return 'Present'
  if (seed < 8) return 'Absent'
  if (seed < 9) return 'Late'
  return 'Leave'
}

const STATUS_DOT: Record<string, string> = {
  Present: 'bg-emerald-500',
  Absent:  'bg-red-500',
  Late:    'bg-amber-500',
  Leave:   'bg-blue-500',
}

export default function AttendancePage() {
  const avg = Math.round(employeesData.reduce((s, e) => s + e.attendance, 0) / employeesData.length)

  return (
    <DashboardLayout>
      <PageHeader
        title="Attendance Management"
        description="Track daily employee attendance across all departments"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><CheckCircle2 className="w-4 h-4" /> Mark Attendance</button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Employees" value={employeesData.length} icon={Users} gradient="gradient-blue" />
        <StatCard title="Present Today" value={10} trend="up" change="83% attendance" icon={CheckCircle2} gradient="gradient-green" />
        <StatCard title="Absent Today" value={1} icon={XCircle} gradient="gradient-red" />
        <StatCard title="Avg Attendance" value={`${avg}%`} trend="up" icon={Calendar} gradient="gradient-orange" />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        {Object.entries(STATUS_DOT).map(([status, cls]) => (
          <div key={status} className="flex items-center gap-1.5 text-[12px] text-slate-600">
            <span className={`w-2.5 h-2.5 rounded-full ${cls}`} />
            {status}
          </div>
        ))}
      </div>

      {/* Attendance grid */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-head pl-5">Employee</th>
              <th className="table-head">Dept</th>
              {WEEKS.map(d => <th key={d} className="table-head text-center whitespace-nowrap">{d}</th>)}
              <th className="table-head text-center">Monthly %</th>
            </tr>
          </thead>
          <tbody>
            {employeesData.map(emp => (
              <tr key={emp.id} className="table-row">
                <td className="table-cell pl-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 text-[11px] font-bold flex items-center justify-center">{emp.avatar}</div>
                    <span className="font-medium text-slate-800 text-[13px]">{emp.name}</span>
                  </div>
                </td>
                <td className="table-cell text-[12px] text-slate-500">{emp.department}</td>
                {WEEKS.map(d => {
                  const s = randStatus(emp.id, d)
                  return (
                    <td key={d} className="table-cell text-center">
                      <span title={s} className={`inline-block w-3 h-3 rounded-full ${STATUS_DOT[s]}`} />
                    </td>
                  )
                })}
                <td className="table-cell text-center">
                  <span className={`text-[12px] font-bold ${emp.attendance >= 95 ? 'text-emerald-600' : emp.attendance >= 85 ? 'text-amber-600' : 'text-red-600'}`}>
                    {emp.attendance}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
