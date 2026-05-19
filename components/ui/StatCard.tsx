import { type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  subtitle?: string
}

export default function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor = 'text-primary-600',
  iconBg = 'bg-primary-100',
  subtitle,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-card card-hover border border-slate-100">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-800 mt-1 leading-tight">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          {change && (
            <span
              className={cn(
                'inline-flex items-center gap-1 text-xs font-medium mt-2',
                changeType === 'up' && 'text-green-600',
                changeType === 'down' && 'text-red-600',
                changeType === 'neutral' && 'text-slate-500'
              )}
            >
              {changeType === 'up' && '↑'}
              {changeType === 'down' && '↓'}
              {change}
            </span>
          )}
        </div>
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
          <Icon className={cn('w-5 h-5', iconColor)} />
        </div>
      </div>
    </div>
  )
}
