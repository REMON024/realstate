'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FolderOpen,
  Users,
  DollarSign,
  Package,
  BarChart3,
  UserCheck,
  Wrench,
  Settings,
  Building2,
  Bell,
  ChevronRight,
  HardHat,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    label: 'Main',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/projects', label: 'Projects', icon: FolderOpen },
      { href: '/contractors', label: 'Contractors', icon: Wrench },
      { href: '/clients', label: 'Clients', icon: Building2 },
    ],
  },
  {
    label: 'Human Resources',
    items: [
      { href: '/employees', label: 'Employees', icon: Users },
      { href: '/payroll', label: 'Payroll', icon: DollarSign },
    ],
  },
  {
    label: 'Finance & Inventory',
    items: [
      { href: '/finance', label: 'Finance', icon: BarChart3 },
      { href: '/inventory', label: 'Inventory', icon: Package },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/reports', label: 'Reports', icon: UserCheck },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-sidebar flex flex-col z-30">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <HardHat className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="text-white font-bold text-base leading-tight block">ConstructERP</span>
          <span className="text-white/40 text-xs">Enterprise Edition</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 mb-1">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium group',
                        active
                          ? 'bg-primary-500 text-white'
                          : 'text-white/60 hover:bg-sidebar-hover hover:text-white'
                      )}
                    >
                      <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {active && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User profile */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-hover cursor-pointer transition-colors">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Admin User</p>
            <p className="text-white/40 text-xs truncate">admin@constructerp.com</p>
          </div>
          <Bell className="w-4 h-4 text-white/40 flex-shrink-0" />
        </div>
      </div>
    </aside>
  )
}
