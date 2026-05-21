import { NextResponse } from 'next/server'
import projectsData from '@/lib/data/projects.json'
import employeesData from '@/lib/data/employees.json'
import inventoryData from '@/lib/data/inventory.json'
import financeData from '@/lib/data/finance.json'
import contractorsData from '@/lib/data/contractors.json'

export async function GET() {
  return NextResponse.json({
    projects: {
      total: projectsData.length,
      active: projectsData.filter((p) => p.status === 'In Progress').length,
      completed: projectsData.filter((p) => p.status === 'Completed').length,
      onHold: projectsData.filter((p) => p.status === 'On Hold').length,
      totalBudget: projectsData.reduce((s, p) => s + p.budget, 0),
      totalSpent: projectsData.reduce((s, p) => s + p.spent, 0),
    },
    employees: {
      total: employeesData.length,
      active: employeesData.filter((e) => e.status === 'Active').length,
      onLeave: employeesData.filter((e) => e.status === 'On Leave').length,
    },
    inventory: {
      total: inventoryData.length,
      lowStock: inventoryData.filter((i) => i.status === 'Low Stock').length,
      outOfStock: inventoryData.filter((i) => i.status === 'Out of Stock').length,
      totalValue: inventoryData.reduce((s, i) => s + i.totalValue, 0),
    },
    finance: {
      ytdRevenue: financeData.monthlyRevenue.reduce((s, m) => s + m.revenue, 0),
      ytdExpenses: financeData.monthlyRevenue.reduce((s, m) => s + m.expenses, 0),
      ytdProfit: financeData.monthlyRevenue.reduce((s, m) => s + m.profit, 0),
      overdueInvoices: financeData.invoices.filter((i) => i.status === 'Overdue').length,
    },
    contractors: {
      total: contractorsData.length,
      active: contractorsData.filter((c) => c.status === 'Active').length,
    },
  })
}
