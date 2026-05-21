import { NextRequest, NextResponse } from 'next/server'
import inventoryData from '@/lib/data/inventory.json'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const category = searchParams.get('category')
  const warehouse = searchParams.get('warehouse')

  let data = [...inventoryData]
  if (status) data = data.filter((i) => i.status === status)
  if (category) data = data.filter((i) => i.category === category)
  if (warehouse) data = data.filter((i) => i.warehouse === warehouse)

  return NextResponse.json({ data, meta: { total: data.length } })
}
