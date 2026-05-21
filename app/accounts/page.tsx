import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import StatCard from '@/components/ui/StatCard'
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle2, Clock, Plus, Download, Filter, Eye, Edit, Send, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const ACCOUNTS = [
  { id: 'ACC-001', name: 'Main Operating Account', type: 'Current', bank: 'National Bank', balance: 8450000, currency: 'USD', status: 'Active', lastTransaction: '2024-05-21' },
  { id: 'ACC-002', name: 'Project Reserve Fund', type: 'Savings', bank: 'City Bank', balance: 12300000, currency: 'USD', status: 'Active', lastTransaction: '2024-05-20' },
  { id: 'ACC-003', name: 'Payroll Account', type: 'Current', bank: 'National Bank', balance: 2100000, currency: 'USD', status: 'Active', lastTransaction: '2024-05-18' },
  { id: 'ACC-004', name: 'Tax Provision Account', type: 'Savings', bank: 'Metro Bank', balance: 3750000, currency: 'USD', status: 'Active', lastTransaction: '2024-05-15' },
  { id: 'ACC-005', name: 'Skyline Tower Escrow', type: 'Escrow', bank: 'Trust Bank', balance: 6200000, currency: 'USD', status: 'Active', lastTransaction: '2024-05-14' },
  { id: 'ACC-006', name: 'Grand Hotel Project Fund', type: 'Current', bank: 'City Bank', balance: 4800000, currency: 'USD', status: 'Active', lastTransaction: '2024-05-12' },
]

const TRANSACTIONS = [
  { id: 'TXN-2024-0521', description: 'Client Payment - Skyline Tower Milestone 4', type: 'Credit', amount: 2400000, date: '2024-05-21', account: 'Main Operating', project: 'Skyline Tower', reference: 'INV-2024-015' },
  { id: 'TXN-2024-0520', description: 'Steel Rebar Purchase - BuildCo Supplies', type: 'Debit', amount: 385000, date: '2024-05-20', account: 'Main Operating', project: 'Grand Hotel', reference: 'PO-2024-042' },
  { id: 'TXN-2024-0519', description: 'Monthly Payroll Processing - May 2024', type: 'Debit', amount: 1250000, date: '2024-05-19', account: 'Payroll Account', project: 'General', reference: 'PAY-2024-05' },
  { id: 'TXN-2024-0518', description: 'Contractor Payment - Elite Foundation Works', type: 'Debit', amount: 750000, date: '2024-05-18', account: 'Main Operating', project: 'Medical Center', reference: 'CTR-2024-018' },
  { id: 'TXN-2024-0517', description: 'Advance Receipt - Riverside Villas Unit 8A', type: 'Credit', amount: 320000, date: '2024-05-17', account: 'Main Operating', project: 'Riverside Villas', reference: 'SALE-2024-08' },
  { id: 'TXN-2024-0516', description: 'Equipment Rental - Skyline Tower Crane', type: 'Debit', amount: 95000, date: '2024-05-16', account: 'Main Operating', project: 'Skyline Tower', reference: 'RENT-2024-09' },
  { id: 'TXN-2024-0515', description: 'Tax Payment - Q1 2024', type: 'Debit', amount: 875000, date: '2024-05-15', account: 'Tax Provision', project: 'General', reference: 'TAX-2024-Q1' },
  { id: 'TXN-2024-0514', description: 'Final Payment - Grand Hotel Land Purchase', type: 'Debit', amount: 5500000, date: '2024-05-14', account: 'Grand Hotel Fund', project: 'Grand Hotel', reference: 'LAND-2024-03' },
  { id: 'TXN-2024-0513', description: 'Progress Billing - Greenfield Office Complex', type: 'Credit', amount: 1850000, date: '2024-05-13', account: 'Main Operating', project: 'Greenfield Office', reference: 'INV-2024-014' },
  { id: 'TXN-2024-0512', description: 'Cement & Aggregate Purchase', type: 'Debit', amount: 210000, date: '2024-05-12', account: 'Main Operating', project: 'Medical Center', reference: 'PO-2024-041' },
]

export default function AccountsPage() {
  const totalBalance = ACCOUNTS.reduce((s, a) => s + a.balance, 0)
  const totalCredits = TRANSACTIONS.filter(t => t.type === 'Credit').reduce((s, t) => s + t.amount, 0)
  const totalDebits = TRANSACTIONS.filter(t => t.type === 'Debit').reduce((s, t) => s + t.amount, 0)

  return (
    <DashboardLayout>
      <PageHeader
        title="Accounts"
        description="Bank accounts, transactions, and financial ledger"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> New Entry</button>
          </>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Balance" value={formatCurrency(totalBalance)} change="Across all accounts" trend="up" icon={DollarSign} gradient="gradient-green" />
        <StatCard title="Total Accounts" value={ACCOUNTS.length} subtitle="All active" icon={DollarSign} gradient="gradient-blue" />
        <StatCard title="Total Credits" value={formatCurrency(totalCredits)} change="This month" trend="up" icon={TrendingUp} gradient="gradient-orange" />
        <StatCard title="Total Debits" value={formatCurrency(totalDebits)} change="This month" trend="down" icon={AlertTriangle} gradient="gradient-red" />
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {ACCOUNTS.map(acc => (
          <div key={acc.id} className="card p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[13px] font-bold text-slate-800 leading-tight">{acc.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{acc.bank} · {acc.type}</p>
              </div>
              <span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{acc.status}</span>
            </div>
            <p className="text-xl font-bold text-slate-800">{formatCurrency(acc.balance)}</p>
            <p className="text-[11px] text-slate-400 mt-1">Last txn: {formatDate(acc.lastTransaction)}</p>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800">Recent Transactions</h3>
            <p className="text-xs text-slate-400">{TRANSACTIONS.length} recent entries</p>
          </div>
          <button className="btn-primary text-xs py-1.5"><Plus className="w-3.5 h-3.5" /> Add</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['TXN ID', 'Description', 'Account', 'Project', 'Type', 'Amount', 'Date', 'Ref', ''].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map(txn => (
                <tr key={txn.id} className="table-row">
                  <td className="table-cell pl-5 font-mono text-[11px] text-slate-500">{txn.id}</td>
                  <td className="table-cell">
                    <p className="text-[12px] text-slate-700 max-w-[200px] truncate">{txn.description}</p>
                  </td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{txn.account}</td>
                  <td className="table-cell">
                    <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{txn.project}</span>
                  </td>
                  <td className="table-cell">
                    <div className={`flex items-center gap-1 text-[12px] font-medium ${txn.type === 'Credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                      {txn.type === 'Credit'
                        ? <ArrowUpRight className="w-3.5 h-3.5" />
                        : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {txn.type}
                    </div>
                  </td>
                  <td className={`table-cell font-bold text-[13px] ${txn.type === 'Credit' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {txn.type === 'Credit' ? '+' : '-'}{formatCurrency(txn.amount)}
                  </td>
                  <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">{formatDate(txn.date)}</td>
                  <td className="table-cell font-mono text-[11px] text-slate-400">{txn.reference}</td>
                  <td className="table-cell">
                    <div className="flex gap-1">
                      <button className="w-6 h-6 rounded hover:bg-blue-50 flex items-center justify-center"><Eye className="w-3 h-3 text-blue-500" /></button>
                      <button className="w-6 h-6 rounded hover:bg-amber-50 flex items-center justify-center"><Edit className="w-3 h-3 text-amber-500" /></button>
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
