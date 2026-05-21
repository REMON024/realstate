import { cn } from '@/lib/utils'

export default function MiniStatCard({
  label, value, sub, accent, className,
}: {
  label: string
  value: React.ReactNode
  sub?: string
  accent?: string
  className?: string
}) {
  return (
    <div className={cn('card p-4', accent && `border-l-4 ${accent}`, className)}>
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <div className="text-xl font-bold">{value}</div>
      {sub && <p className="text-[11px] text-slate-400 mt-1">{sub}</p>}
    </div>
  )
}
