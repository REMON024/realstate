import { NextResponse } from 'next/server'
import financeData from '@/lib/data/finance.json'

export async function GET() {
  const totalRevenue = financeData.monthlyRevenue.reduce((s, m) => s + m.revenue, 0)
  const totalExpenses = financeData.monthlyRevenue.reduce((s, m) => s + m.expenses, 0)
  const totalProfit = financeData.monthlyRevenue.reduce((s, m) => s + m.profit, 0)

  return NextResponse.json({
    data: financeData,
    summary: {
      totalRevenue,
      totalExpenses,
      totalProfit,
      profitMargin: Math.round((totalProfit / totalRevenue) * 100),
    },
  })
}
