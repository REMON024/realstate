import { NextRequest, NextResponse } from 'next/server'
import projectsData from '@/lib/data/projects.json'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const type = searchParams.get('type')
  const page = parseInt(searchParams.get('page') ?? '1')
  const limit = parseInt(searchParams.get('limit') ?? '20')

  let data = [...projectsData]

  if (status) data = data.filter((p) => p.status === status)
  if (type) data = data.filter((p) => p.type === type)

  const total = data.length
  const start = (page - 1) * limit
  const paginated = data.slice(start, start + limit)

  return NextResponse.json({
    data: paginated,
    meta: { total, page, limit, pages: Math.ceil(total / limit) },
  })
}
