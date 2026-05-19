'use client'

import { Bell, Search, ChevronDown } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div>
        <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 text-sm bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white w-56 transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full"></span>
        </button>

        {/* User */}
        <button className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-lg hover:bg-slate-100 transition-colors">
          <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            AD
          </div>
          <span className="text-sm font-medium text-slate-700 hidden md:block">Admin</span>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden md:block" />
        </button>
      </div>
    </header>
  )
}
