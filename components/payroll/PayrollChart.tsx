'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts'

const fmt = (v: number) => `$${(v / 1000).toFixed(0)}K`

export default function PayrollChart({ data }: { data: { month: string; gross: number; net: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barGap={4}>
        <defs>
          <linearGradient id="grossGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#f97316" stopOpacity={0.5} />
          </linearGradient>
          <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={46} />
        <Tooltip
          formatter={(v: number) => [fmt(v)]}
          contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: 12 }}
        />
        <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12, paddingTop: '12px' }} />
        <Bar dataKey="gross" fill="url(#grossGrad)" name="Gross" radius={[5, 5, 0, 0]} maxBarSize={30} />
        <Bar dataKey="net" fill="url(#netGrad)" name="Net Pay" radius={[5, 5, 0, 0]} maxBarSize={30} />
      </BarChart>
    </ResponsiveContainer>
  )
}
