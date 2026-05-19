import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { formatCurrency } from '@/lib/utils'
import { DollarSign, Users, TrendingUp, Calendar, Plus, Download } from 'lucide-react'
import payrollData from '@/lib/data/payroll.json'
import PayrollChart from '@/components/payroll/PayrollChart'

export default function PayrollPage() {
  const current = payrollData.payrollPeriods[0]

  return (
    <DashboardLayout title="Payroll" subtitle="Employee compensation management">
      <PageHeader
        title="Payroll Management"
        description={`Current period: ${current.period}`}
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Download className="w-4 h-4" /> Export Payslips
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
              <Plus className="w-4 h-4" /> Run Payroll
            </button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Gross Payroll"
          value={formatCurrency(current.totalGross)}
          subtitle={current.period}
          icon={DollarSign}
          iconColor="text-green-600"
          iconBg="bg-green-100"
        />
        <StatCard
          title="Total Deductions"
          value={formatCurrency(current.totalDeductions)}
          subtitle="Tax + Insurance"
          icon={TrendingUp}
          iconColor="text-red-600"
          iconBg="bg-red-100"
        />
        <StatCard
          title="Net Payroll"
          value={formatCurrency(current.totalNet)}
          subtitle="Take-home pay"
          icon={DollarSign}
          iconColor="text-primary-600"
          iconBg="bg-primary-100"
        />
        <StatCard
          title="Employees"
          value={current.employeeCount}
          subtitle="This period"
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-card border border-slate-100">
          <div className="mb-4">
            <h3 className="font-semibold text-slate-800">Payroll Trend</h3>
            <p className="text-xs text-slate-400">Monthly gross vs net — 2024</p>
          </div>
          <PayrollChart data={payrollData.monthlyPayrollTrend} />
        </div>

        {/* Period history */}
        <div className="bg-white rounded-xl p-5 shadow-card border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Payroll History</h3>
          <div className="space-y-3">
            {payrollData.payrollPeriods.map((period) => (
              <div key={period.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-primary-200 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-800">{period.period}</p>
                  <p className="text-xs text-slate-400">{period.employeeCount} employees</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-700">{formatCurrency(period.totalNet)}</p>
                  <Badge status={period.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payroll items table */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div>
            <h3 className="font-semibold text-slate-800">Payroll Details — {current.period}</h3>
            <p className="text-xs text-slate-400">Individual employee payroll breakdown</p>
          </div>
          <Badge status={current.status} />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['Employee', 'Dept', 'Basic', 'Overtime', 'Allowances', 'Gross', 'Deductions', 'Net Pay', 'Account', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wide py-3 px-4 first:pl-6 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payrollData.payrollItems.map((item) => (
                <tr key={item.employeeId} className="border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0">
                  <td className="py-3.5 px-4 pl-6">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-xs font-bold">
                        {item.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{item.employeeName}</p>
                        <p className="text-xs text-slate-400">{item.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-500">{item.department}</td>
                  <td className="py-3.5 px-4 text-slate-700">{formatCurrency(item.basicSalary)}</td>
                  <td className="py-3.5 px-4 text-slate-700">{formatCurrency(item.overtime)}</td>
                  <td className="py-3.5 px-4 text-slate-700">{formatCurrency(item.allowances)}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{formatCurrency(item.grossPay)}</td>
                  <td className="py-3.5 px-4 text-red-600">-{formatCurrency(item.totalDeductions)}</td>
                  <td className="py-3.5 px-4 font-bold text-green-700">{formatCurrency(item.netPay)}</td>
                  <td className="py-3.5 px-4 text-xs text-slate-500 font-mono">{item.bankAccount}</td>
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
