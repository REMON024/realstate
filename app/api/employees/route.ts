import { NextRequest, NextResponse } from 'next/server'
import employeesData from '@/lib/data/employees.json'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const department = searchParams.get('department')

  let data = [...employeesData]
  if (status) data = data.filter((e) => e.status === status)
  if (department) data = data.filter((e) => e.department === department)

  return NextResponse.json({ data, meta: { total: data.length } })
}
