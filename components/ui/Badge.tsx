import { cn } from '@/lib/utils'

const STATUS_MAP: Record<string, string> = {
  // Project
  'In Progress': 'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
  'Completed':   'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  'Planning':    'bg-purple-100 text-purple-700 ring-1 ring-purple-200',
  'On Hold':     'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  'Cancelled':   'bg-red-100 text-red-700 ring-1 ring-red-200',
  // Employee
  'Active':      'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  'Inactive':    'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  'On Leave':    'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  // Finance
  'Paid':        'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  'Pending':     'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  'Overdue':     'bg-red-100 text-red-700 ring-1 ring-red-200',
  'Draft':       'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
  'Sent':        'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
  'Processing':  'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
  // Inventory
  'In Stock':     'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  'Low Stock':    'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  'Out of Stock': 'bg-red-100 text-red-700 ring-1 ring-red-200',
  // Contractor
  'At Risk':     'bg-red-100 text-red-700 ring-1 ring-red-200',
  // Payroll
  'Approved':    'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  'Rejected':    'bg-red-100 text-red-700 ring-1 ring-red-200',
  // Leave
  'Accepted':    'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200',
  'Open':        'bg-blue-100 text-blue-700 ring-1 ring-blue-200',
  // Priority
  'High':        'bg-red-100 text-red-700 ring-1 ring-red-200',
  'Medium':      'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  'Low':         'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
}

export default function Badge({ status, className }: { status: string; className?: string }) {
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-[3px] rounded-full text-[11px] font-semibold',
      STATUS_MAP[status] ?? 'bg-slate-100 text-slate-600 ring-1 ring-slate-200',
      className
    )}>
      {status}
    </span>
  )
}
