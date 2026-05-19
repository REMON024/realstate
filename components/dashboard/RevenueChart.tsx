'use client'

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts'

const fmt = (v: number) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M`
  : v >= 1_000 ? `$${(v / 1_000).toFixed(0)}K`
  : `$${v}`

export default function RevenueChart({
  data,
}: {
  data: { month: string; revenue: number; expenses: number; profit: number }[]
}) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="barRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#f97316" stopOpacity={0.6} />
          </linearGradient>
          <linearGradient id="barExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={52} />
        <Tooltip
          formatter={(v: number) => [fmt(v)]}
          contentStyle={{ border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
        />
        <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12, paddingTop: '12px' }} />
        <Bar dataKey="revenue" fill="url(#barRevenue)" name="Revenue" radius={[4, 4, 0, 0]} maxBarSize={28} />
        <Bar dataKey="expenses" fill="url(#barExpenses)" name="Expenses" radius={[4, 4, 0, 0]} maxBarSize={28} />
        <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2.5} dot={{ fill: '#22c55e', r: 4 }} name="Profit" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
