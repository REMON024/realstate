import { type LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  change?: string
  trend?: 'up' | 'down' | 'flat'
  icon: LucideIcon
  gradient: string
}

export default function StatCard({
  title, value, subtitle, change, trend = 'flat', icon: Icon, gradient,
}: StatCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-slate-400'

  return (
    <div className="card p-5 flex items-start justify-between group hover:shadow-card-md transition-shadow duration-200">
      <div className="flex-1 min-w-0">
        <p className="text-[12.5px] font-medium text-slate-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        {change && (
          <div className={cn('flex items-center gap-1 mt-2', trendColor)}>
            <TrendIcon className="w-3 h-3" />
            <span className="text-xs font-medium">{change}</span>
          </div>
        )}
      </div>
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ml-4',
        gradient
      )}>
        <Icon className="w-5 h-5 text-white" />
      </div>
    </div>
  )
}
