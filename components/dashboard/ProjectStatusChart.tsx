'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface Project {
  status: string
}

const STATUS_COLORS: Record<string, string> = {
  'In Progress': '#3b82f6',
  'Completed': '#22c55e',
  'Planning': '#a855f7',
  'On Hold': '#eab308',
  'Cancelled': '#ef4444',
}

export default function ProjectStatusChart({ projects }: { projects: Project[] }) {
  const statusCount = projects.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] ?? 0) + 1
    return acc
  }, {})

  const data = Object.entries(statusCount).map(([name, value]) => ({ name, value }))

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={55}
          outerRadius={80}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? '#94a3b8'} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ResponsiveContainer>
  )
}
