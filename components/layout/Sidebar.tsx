'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard, FolderKanban, Users, DollarSign, Package,
  BarChart3, Wrench, Building2, Settings, HardHat, ChevronDown,
  ClipboardList, Calendar, UserCheck, Wallet, TrendingUp,
  ShoppingCart, Truck, FileText, Shield, Bell, LogOut,
  PiggyBank, Calculator, Home, Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  href: string
  label: string
  icon: React.ElementType
  badge?: number
  children?: { href: string; label: string; badge?: number }[]
}

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: 'MAIN',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    group: 'OPERATIONS',
    items: [
      {
        href: '/projects', label: 'Projects', icon: FolderKanban,
        children: [
          { href: '/projects', label: 'All Projects' },
          { href: '/projects/sites', label: 'Construction Sites' },
          { href: '/projects/tasks', label: 'Task Management' },
          { href: '/projects/milestones', label: 'Milestones' },
        ],
      },
      { href: '/clients', label: 'Clients', icon: Building2 },
      { href: '/contractors', label: 'Contractors', icon: Wrench },
    ],
  },
  {
    group: 'HUMAN RESOURCES',
    items: [
      {
        href: '/employees', label: 'Employees', icon: Users,
        children: [
          { href: '/employees', label: 'Employee List' },
          { href: '/employees/departments', label: 'Departments' },
          { href: '/employees/designations', label: 'Designations' },
        ],
      },
      {
        href: '/hr', label: 'HR Management', icon: UserCheck,
        children: [
          { href: '/hr/attendance', label: 'Attendance' },
          { href: '/hr/leave', label: 'Leave Management' },
          { href: '/hr/performance', label: 'Performance' },
        ],
      },
      {
        href: '/payroll', label: 'Payroll', icon: Wallet,
        children: [
          { href: '/payroll', label: 'Payroll List' },
          { href: '/payroll/process', label: 'Process Payroll' },
          { href: '/payroll/salary', label: 'Salary Structure' },
        ],
      },
    ],
  },
  {
    group: 'FINANCE',
    items: [
      {
        href: '/capital-investment', label: 'Capital Investment', icon: PiggyBank,
        children: [
          { href: '/capital-investment', label: 'Investments' },
          { href: '/capital-investment/returns', label: 'Returns' },
        ],
      },
      {
        href: '/accounts', label: 'Accounts', icon: DollarSign,
        children: [
          { href: '/accounts/invoices', label: 'Invoices' },
          { href: '/accounts/expenses', label: 'Expenses' },
          { href: '/accounts/income', label: 'Income' },
          { href: '/accounts/transactions', label: 'Transactions' },
        ],
      },
      {
        href: '/purchase', label: 'Purchase', icon: ShoppingCart,
        children: [
          { href: '/purchase', label: 'Purchase Orders' },
          { href: '/purchase/materials', label: 'Materials Purchase' },
          { href: '/purchase/suppliers', label: 'Suppliers' },
        ],
      },
      {
        href: '/supply-chain', label: 'Supply Chain', icon: Globe,
        children: [
          { href: '/supply-chain', label: 'Overview' },
          { href: '/supply-chain/suppliers', label: 'Supplier Network' },
          { href: '/supply-chain/orders', label: 'Order Tracking' },
        ],
      },
    ],
  },
  {
    group: 'WAREHOUSE',
    items: [
      {
        href: '/inventory', label: 'Inventory', icon: Package,
        children: [
          { href: '/inventory', label: 'Stock List' },
          { href: '/inventory/stock-in', label: 'Stock In' },
          { href: '/inventory/stock-out', label: 'Stock Out' },
          { href: '/inventory/categories', label: 'Categories' },
        ],
      },
    ],
  },
  {
    group: 'ANALYTICS',
    items: [
      { href: '/costing', label: 'Cost per Sq. Ft.', icon: Calculator },
      { href: '/sales', label: 'Sales', icon: Home },
      { href: '/profit', label: 'Profit Analysis', icon: TrendingUp },
      { href: '/reports', label: 'Reports', icon: BarChart3 },
    ],
  },
  {
    group: 'SYSTEM',
    items: [
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    NAV.forEach(g => g.items.forEach(item => {
      if (item.children?.some(c => pathname.startsWith(c.href)) || pathname.startsWith(item.href)) {
        init[item.href] = true
      }
    }))
    return init
  })

  const toggle = (href: string) =>
    setOpenGroups(prev => ({ ...prev, [href]: !prev[href] }))

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-40 overflow-hidden"
      style={{ width: 'var(--sidebar-w)', background: 'var(--color-sidebar)' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-sidebar-border flex-shrink-0">
        <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-orange flex-shrink-0">
          <HardHat className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-[15px] leading-none">ConstructERP</p>
          <p className="text-sidebar-heading text-[11px] mt-0.5">Construction Management</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4">
        {NAV.map(group => (
          <div key={group.group}>
            <p className="text-sidebar-heading text-[10px] font-semibold tracking-widest px-3 mb-1.5">
              {group.group}
            </p>
            <ul className="space-y-0.5">
              {group.items.map(item => {
                const Icon = item.icon
                const active = isActive(item.href)
                const open = openGroups[item.href]
                const hasChildren = !!item.children?.length

                return (
                  <li key={item.href}>
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => toggle(item.href)}
                          className={cn(
                            'nav-item w-full',
                            active ? 'text-white' : 'nav-item-inactive'
                          )}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="flex-1 text-left">{item.label}</span>
                          <ChevronDown
                            className={cn(
                              'w-3.5 h-3.5 transition-transform duration-200',
                              open ? 'rotate-180' : ''
                            )}
                          />
                        </button>
                        {open && (
                          <ul className="mt-0.5 ml-3.5 pl-3.5 border-l border-sidebar-border space-y-0.5">
                            {item.children!.map(child => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'flex items-center gap-2 px-3 py-2 text-[12.5px] font-medium rounded-lg transition-colors',
                                    pathname === child.href
                                      ? 'text-orange-400 bg-white/5'
                                      : 'text-sidebar-text hover:text-white hover:bg-white/5'
                                  )}
                                >
                                  <span className={cn(
                                    'w-1.5 h-1.5 rounded-full flex-shrink-0',
                                    pathname === child.href ? 'bg-orange-400' : 'bg-white/20'
                                  )} />
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'nav-item',
                          active ? 'nav-item-active' : 'nav-item-inactive'
                        )}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="flex-1">{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="ml-auto bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="flex-shrink-0 px-2.5 py-3 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">Admin User</p>
            <p className="text-sidebar-text text-xs truncate">Super Administrator</p>
          </div>
          <LogOut className="w-3.5 h-3.5 text-sidebar-text hover:text-white transition-colors" />
        </div>
      </div>
    </aside>
  )
}
