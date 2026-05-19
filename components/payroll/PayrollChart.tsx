'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const fmt = (v: number) => `$${(v / 1000).toFixed(0)}K`

export default function PayrollChart({ data }: { data: { month: string; gross: number; net: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={46} />
        <Tooltip
          formatter={(value: number) => [fmt(value)]}
          contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: 12 }}
        />
        <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="gross" fill="#f97316" name="Gross" radius={[4, 4, 0, 0]} />
        <Bar dataKey="net" fill="#3b82f6" name="Net" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
