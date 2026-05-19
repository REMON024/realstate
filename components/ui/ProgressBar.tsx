import { cn } from '@/lib/utils'

export default function ProgressBar({
  value,
  showLabel = true,
  size = 'sm',
  color,
}: {
  value: number
  showLabel?: boolean
  size?: 'xs' | 'sm' | 'md'
  color?: string
}) {
  const h = size === 'xs' ? 'h-1' : size === 'sm' ? 'h-1.5' : 'h-2.5'
  const clr = color ?? (value >= 80 ? 'bg-emerald-500' : value >= 50 ? 'bg-orange-500' : value >= 25 ? 'bg-amber-500' : 'bg-red-500')

  return (
    <div className="flex items-center gap-2.5">
      <div className={cn('flex-1 bg-slate-100 rounded-full overflow-hidden', h)}>
        <div
          className={cn('h-full rounded-full transition-all duration-700', clr)}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-semibold text-slate-600 w-8 text-right tabular-nums">
          {value}%
        </span>
      )}
    </div>
  )
}
