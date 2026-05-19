'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const COLORS: Record<string, string> = {
  'In Progress': '#3b82f6',
  'Completed':   '#22c55e',
  'Planning':    '#a855f7',
  'On Hold':     '#f59e0b',
  'Cancelled':   '#ef4444',
}

const RADIAN = Math.PI / 180
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
  cx: number; cy: number; midAngle: number; innerRadius: number; outerRadius: number; percent: number
}) => {
  if (percent < 0.08) return null
  const r = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + r * Math.cos(-midAngle * RADIAN)
  const y = cy + r * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {Math.round(percent * 100)}%
    </text>
  )
}

export default function ProjectStatusChart({ projects }: { projects: { status: string }[] }) {
  const counts = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1
    return acc
  }, {})
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }))
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <div>
      <ResponsiveContainer width="100%" height={190}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={renderLabel}
          >
            {data.map(entry => (
              <Cell key={entry.name} fill={COLORS[entry.name] ?? '#94a3b8'} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number, name: string) => [`${v} (${Math.round((v / total) * 100)}%)`, name]}
            contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: 12 }}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Custom legend */}
      <div className="space-y-1.5 mt-1">
        {data.map(d => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[d.name] ?? '#94a3b8' }} />
              <span className="text-xs text-slate-600">{d.name}</span>
            </div>
            <span className="text-xs font-semibold text-slate-700">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
