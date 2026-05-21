import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import {
  Users, Plus, Search, Filter, Download,
  Mail, Phone, Star, Eye, Edit, Trash2,
  UserCheck, UserX, Briefcase,
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import employeesData from '@/lib/data/employees.json'

export default function EmployeesPage() {
  const depts = [...new Set(employeesData.map(e => e.department))]
  const avgPerf = Math.round(employeesData.reduce((s, e) => s + e.performance, 0) / employeesData.length)
  const avgAtt = Math.round(employeesData.reduce((s, e) => s + e.attendance, 0) / employeesData.length)

  return (
    <DashboardLayout>
      <PageHeader
        title="Employee Management"
        description="Manage your workforce across all departments"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> Add Employee</button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Employees" value={employeesData.length} subtitle={`${depts.length} departments`} icon={Users} gradient="gradient-blue" />
        <StatCard title="Active" value={employeesData.filter(e => e.status === 'Active').length} trend="up" change="Operational" icon={UserCheck} gradient="gradient-green" />
        <StatCard title="Avg Performance" value={`${avgPerf}%`} subtitle="This quarter" trend="up" icon={Star} gradient="gradient-orange" />
        <StatCard title="Avg Attendance" value={`${avgAtt}%`} subtitle="Last 30 days" trend="up" icon={Briefcase} gradient="gradient-purple" />
      </div>

      {/* Department summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {depts.slice(0, 4).map(dept => {
          const count = employeesData.filter(e => e.department === dept).length
          return (
            <div key={dept} className="card px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">{dept}</p>
                <p className="text-lg font-bold text-slate-800">{count} <span className="text-xs text-slate-400 font-normal">staff</span></p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <Users className="w-4 h-4 text-orange-500" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 gap-4 flex-wrap">
          <div className="flex items-center gap-1 overflow-x-auto">
            {['All Employees', 'Active', 'On Leave', 'Inactive'].map((tab, i) => (
              <button key={tab} className={`tab-btn whitespace-nowrap ${i === 0 ? 'tab-btn-active' : 'tab-btn-inactive'}`}>{tab}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <select className="select-field w-40 text-[13px]">
              <option>All Departments</option>
              {depts.map(d => <option key={d}>{d}</option>)}
            </select>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input className="input-field pl-9 w-48 text-[13px]" placeholder="Search employees..." />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['#', 'Employee', 'Department', 'Role', 'Contact', 'Salary', 'Attendance', 'Performance', 'Joined', 'Status', 'Actions'].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employeesData.map((emp, idx) => (
                <tr key={emp.id} className="table-row">
                  <td className="table-cell pl-5 text-[12px] text-slate-400 font-mono">{String(idx + 1).padStart(2, '0')}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                        {emp.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-[13px]">{emp.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="text-[12px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{emp.department}</span>
                  </td>
                  <td className="table-cell text-[12px] text-slate-600 whitespace-nowrap">{emp.role}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-0.5">
                      <Mail className="w-3 h-3" /> {emp.email}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Phone className="w-3 h-3" /> {emp.phone}
                    </div>
                  </td>
                  <td className="table-cell">
                    <p className="font-semibold text-slate-800 text-[13px]">{formatCurrency(emp.salary)}</p>
                    <p className="text-[11px] text-slate-400">per year</p>
                  </td>
                  <td className="table-cell" style={{ minWidth: 120 }}>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-16">
                        <div
                          className={`h-full rounded-full ${emp.attendance >= 95 ? 'bg-emerald-500' : emp.attendance >= 85 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${emp.attendance}%` }}
                        />
                      </div>
                      <span className="text-[12px] font-semibold text-slate-700">{emp.attendance}%</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <div className="flex">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-3 h-3 ${s <= Math.round(emp.performance / 20) ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-600 font-semibold ml-1">{emp.performance}%</span>
                    </div>
                  </td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(emp.joinDate)}</td>
                  <td className="table-cell"><Badge status={emp.status} /></td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center" title="View">
                        <Eye className="w-3.5 h-3.5 text-blue-500" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-amber-50 flex items-center justify-center" title="Edit">
                        <Edit className="w-3.5 h-3.5 text-amber-500" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center" title="Delete">
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-[12px] text-slate-500">Showing 1–{employeesData.length} of {employeesData.length} employees</p>
          <div className="flex items-center gap-1">
            {[1, 2].map(n => (
              <button key={n} className={`w-8 h-8 text-xs rounded-lg font-medium ${n === 1 ? 'bg-orange-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
