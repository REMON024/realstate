import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  className?: string
  showLabel?: boolean
  color?: string
}

export default function ProgressBar({ value, className, showLabel = true, color }: ProgressBarProps) {
  const getColor = () => {
    if (color) return color
    if (value >= 80) return 'bg-green-500'
    if (value >= 50) return 'bg-primary-500'
    if (value >= 25) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full progress-bar', getColor())}
          style={{ width: `${value}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-slate-600 w-8 text-right">{value}%</span>
      )}
    </div>
  )
}
