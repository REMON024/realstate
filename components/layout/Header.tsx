'use client'

import { Bell, Search, ChevronDown, Menu, Home, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

const BREADCRUMBS: Record<string, string[]> = {
  '/dashboard': ['Dashboard'],
  '/projects': ['Operations', 'Projects'],
  '/projects/sites': ['Operations', 'Projects', 'Sites'],
  '/projects/tasks': ['Operations', 'Projects', 'Tasks'],
  '/clients': ['Operations', 'Clients'],
  '/contractors': ['Operations', 'Contractors'],
  '/employees': ['HR', 'Employees'],
  '/employees/departments': ['HR', 'Employees', 'Departments'],
  '/hr/attendance': ['HR', 'Attendance'],
  '/hr/leave': ['HR', 'Leave Management'],
  '/payroll': ['HR', 'Payroll'],
  '/accounts/invoices': ['Finance', 'Invoices'],
  '/accounts/expenses': ['Finance', 'Expenses'],
  '/accounts/income': ['Finance', 'Income'],
  '/accounts': ['Finance', 'Accounts'],
  '/purchase': ['Finance', 'Purchase Orders'],
  '/purchase/suppliers': ['Finance', 'Suppliers'],
  '/inventory': ['Warehouse', 'Inventory'],
  '/inventory/stock-in': ['Warehouse', 'Stock In'],
  '/inventory/stock-out': ['Warehouse', 'Stock Out'],
  '/reports': ['Analytics', 'Reports'],
  '/settings': ['System', 'Settings'],
}

const TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/projects': 'Project Management',
  '/projects/sites': 'Construction Sites',
  '/projects/tasks': 'Task Management',
  '/clients': 'Client Management',
  '/contractors': 'Contractor Management',
  '/employees': 'Employee Management',
  '/employees/departments': 'Departments',
  '/hr/attendance': 'Attendance Management',
  '/hr/leave': 'Leave Management',
  '/payroll': 'Payroll Management',
  '/accounts': 'Accounts Overview',
  '/accounts/invoices': 'Invoices',
  '/accounts/expenses': 'Expenses',
  '/accounts/income': 'Income',
  '/purchase': 'Purchase Orders',
  '/purchase/suppliers': 'Suppliers',
  '/inventory': 'Inventory Management',
  '/reports': 'Reports & Analytics',
  '/settings': 'System Settings',
}

export default function Header() {
  const pathname = usePathname()
  const crumbs = BREADCRUMBS[pathname] ?? ['Page']
  const title = TITLES[pathname] ?? 'Page'

  return (
    <header
      className="fixed top-0 right-0 z-30 bg-white border-b border-slate-200 flex items-center justify-between px-6"
      style={{
        left: 'var(--sidebar-w)',
        height: 'var(--header-h)',
      }}
    >
      {/* Left — breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Home className="w-3.5 h-3.5 text-slate-400" />
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <span className={i === crumbs.length - 1 ? 'text-slate-700 font-semibold' : 'text-slate-400'}>
              {c}
            </span>
          </span>
        ))}
      </div>

      {/* Right — search + notifications + user */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden lg:flex items-center">
          <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-3 py-2 text-[13px] bg-slate-100 rounded-lg border border-transparent
                       focus:outline-none focus:bg-white focus:border-orange-400 w-52 transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Notification */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-[18px] h-[18px] text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200" />

        {/* User */}
        <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold">
            AD
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-[13px] font-semibold text-slate-700 leading-none">Admin</p>
            <p className="text-[11px] text-slate-400 leading-none mt-0.5">Super Admin</p>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
        </button>
      </div>
    </header>
  )
}
