import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Users, Plus, Filter, Download, Mail, Phone, Star } from 'lucide-react'
import employeesData from '@/lib/data/employees.json'

export default function EmployeesPage() {
  const deptCount = employeesData.reduce<Record<string, number>>((acc, e) => {
    acc[e.department] = (acc[e.department] ?? 0) + 1
    return acc
  }, {})
  const departments = Object.keys(deptCount)

  return (
    <DashboardLayout title="Employees" subtitle="Human resources management">
      <PageHeader
        title="All Employees"
        description={`${employeesData.length} employees across ${departments.length} departments`}
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
              <Plus className="w-4 h-4" /> Add Employee
            </button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Employees"
          value={employeesData.length}
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
        <StatCard
          title="Active"
          value={employeesData.filter((e) => e.status === 'Active').length}
          icon={Users}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="On Leave"
          value={employeesData.filter((e) => e.status === 'On Leave').length}
          icon={Users}
          iconColor="text-yellow-600"
          iconBg="bg-yellow-100"
        />
        <StatCard
          title="Avg. Performance"
          value={`${Math.round(employeesData.reduce((s, e) => s + e.performance, 0) / employeesData.length)}%`}
          icon={Star}
          iconColor="text-primary-600"
          iconBg="bg-primary-100"
        />
      </div>

      {/* Department filter */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100">
        <div className="flex items-center gap-2 p-4 border-b border-slate-100 overflow-x-auto">
          <button className="px-4 py-1.5 text-sm rounded-lg font-medium bg-primary-500 text-white whitespace-nowrap">All Departments</button>
          {departments.map((dept) => (
            <button key={dept} className="px-4 py-1.5 text-sm rounded-lg font-medium text-slate-500 hover:bg-slate-100 whitespace-nowrap transition-colors">
              {dept} <span className="ml-1 text-xs text-slate-400">({deptCount[dept]})</span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Employee', 'Department', 'Email / Phone', 'Salary', 'Status', 'Attendance', 'Performance', ''].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-3 px-4 first:pl-6">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employeesData.map((emp) => (
                <tr key={emp.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {emp.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{emp.name}</p>
                        <p className="text-xs text-slate-400">{emp.role} · {emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-slate-700">{emp.department}</span>
                    <p className="text-xs text-slate-400">Joined {formatDate(emp.joinDate)}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 text-slate-500 text-xs mb-0.5">
                      <Mail className="w-3 h-3" /> {emp.email}
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Phone className="w-3 h-3" /> {emp.phone}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {formatCurrency(emp.salary)}/yr
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge status={emp.status} />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full w-16">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: `${emp.attendance}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600">{emp.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium text-slate-700">{emp.performance}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button className="text-xs text-primary-600 hover:underline font-medium">View</button>
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
