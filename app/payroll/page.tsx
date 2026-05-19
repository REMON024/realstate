import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import PayrollChart from '@/components/payroll/PayrollChart'
import { formatCurrency } from '@/lib/utils'
import { DollarSign, Users, TrendingUp, Calendar, Plus, Download, Play, Eye, FileText } from 'lucide-react'
import payrollData from '@/lib/data/payroll.json'

export default function PayrollPage() {
  const current = payrollData.payrollPeriods[0]
  const deductionRate = Math.round((current.totalDeductions / current.totalGross) * 100)

  return (
    <DashboardLayout>
      <PageHeader
        title="Payroll Management"
        description={`Current period: ${current.period}`}
        actions={
          <>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export Payslips</button>
            <button className="btn-secondary"><FileText className="w-4 h-4" /> Payroll Report</button>
            <button className="btn-primary"><Play className="w-4 h-4" /> Process Payroll</button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Gross Payroll" value={formatCurrency(current.totalGross)} subtitle={current.period} icon={DollarSign} gradient="gradient-orange" />
        <StatCard title="Total Deductions" value={formatCurrency(current.totalDeductions)} subtitle={`${deductionRate}% of gross`} icon={TrendingUp} gradient="gradient-red" />
        <StatCard title="Net Payroll" value={formatCurrency(current.totalNet)} subtitle="Take-home total" trend="up" icon={DollarSign} gradient="gradient-green" />
        <StatCard title="Employees" value={current.employeeCount} subtitle="This period" icon={Users} gradient="gradient-blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Chart */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-800">Payroll Trend</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly gross vs net — 2024</p>
            </div>
          </div>
          <PayrollChart data={payrollData.monthlyPayrollTrend} />
        </div>

        {/* Payroll history */}
        <div className="card p-5">
          <h3 className="font-bold text-slate-800 mb-4">Payroll History</h3>
          <div className="space-y-3">
            {payrollData.payrollPeriods.map(period => (
              <div key={period.id} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-slate-800">{period.period}</p>
                    <p className="text-[11px] text-slate-400">{period.employeeCount} employees · {period.processedBy}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-bold text-slate-800">{formatCurrency(period.totalNet)}</p>
                  <Badge status={period.status} />
                </div>
              </div>
            ))}
          </div>

          {/* Breakdown donut */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-[12px] font-semibold text-slate-600 mb-3">May 2024 Breakdown</p>
            <div className="space-y-2.5">
              {[
                { label: 'Basic Salary', pct: 78, color: 'bg-orange-500' },
                { label: 'Overtime', pct: 10, color: 'bg-blue-500' },
                { label: 'Allowances', pct: 12, color: 'bg-emerald-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-semibold text-slate-700">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payroll details table */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800">Employee Payroll — {current.period}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Individual compensation breakdown</p>
          </div>
          <Badge status={current.status} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Employee', 'Dept', 'Basic', 'Overtime', 'Allowances', 'Gross Pay', 'Tax', 'SS', 'Health', 'Total Deductions', 'Net Pay', 'Account', 'Status', ''].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payrollData.payrollItems.map(item => (
                <tr key={item.employeeId} className="table-row">
                  <td className="table-cell pl-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                        {item.employeeName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-[13px]">{item.employeeName}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{item.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell text-[12px] text-slate-500">{item.department}</td>
                  <td className="table-cell text-[13px] text-slate-700">{formatCurrency(item.basicSalary)}</td>
                  <td className="table-cell text-[13px] text-slate-700">{formatCurrency(item.overtime)}</td>
                  <td className="table-cell text-[13px] text-slate-700">{formatCurrency(item.allowances)}</td>
                  <td className="table-cell">
                    <span className="text-[13px] font-bold text-slate-800">{formatCurrency(item.grossPay)}</span>
                  </td>
                  <td className="table-cell text-[12px] text-red-500">-{formatCurrency(item.taxDeduction)}</td>
                  <td className="table-cell text-[12px] text-red-500">-{formatCurrency(item.socialSecurity)}</td>
                  <td className="table-cell text-[12px] text-red-500">-{formatCurrency(item.healthInsurance)}</td>
                  <td className="table-cell">
                    <span className="text-[13px] font-semibold text-red-600">-{formatCurrency(item.totalDeductions)}</span>
                  </td>
                  <td className="table-cell">
                    <span className="text-[13px] font-bold text-emerald-600">{formatCurrency(item.netPay)}</span>
                  </td>
                  <td className="table-cell text-[12px] text-slate-500 font-mono">{item.bankAccount}</td>
                  <td className="table-cell"><Badge status={item.status} /></td>
                  <td className="table-cell">
                    <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center">
                      <Eye className="w-3.5 h-3.5 text-blue-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50">
                <td colSpan={5} className="py-3.5 pl-5 text-[12px] font-bold text-slate-600">TOTALS</td>
                <td className="py-3.5 px-4 text-[13px] font-bold text-slate-800">{formatCurrency(current.totalGross)}</td>
                <td colSpan={3} />
                <td className="py-3.5 px-4 text-[13px] font-bold text-red-600">-{formatCurrency(current.totalDeductions)}</td>
                <td className="py-3.5 px-4 text-[13px] font-bold text-emerald-600">{formatCurrency(current.totalNet)}</td>
                <td colSpan={3} />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
