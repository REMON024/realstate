import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET ?? 'whsec_default_dev_secret'

function verifySignature(payload: string, signature: string): boolean {
  const expected = createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex')
  return `sha256=${expected}` === signature
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get('x-webhook-signature') ?? ''

  if (signature && !verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const event = body.event as string | undefined
  const resourceId = body.resourceId as string | undefined

  // Route to handlers
  switch (event) {
    case 'project.created':
    case 'project.updated':
    case 'project.completed':
      await handleProjectEvent(event, body)
      break
    case 'invoice.created':
    case 'invoice.paid':
    case 'invoice.overdue':
      await handleInvoiceEvent(event, body)
      break
    case 'employee.added':
    case 'employee.updated':
      await handleEmployeeEvent(event, body)
      break
    case 'payroll.processed':
      await handlePayrollEvent(event, body)
      break
    case 'inventory.low_stock':
    case 'inventory.out_of_stock':
      await handleInventoryEvent(event, body)
      break
    default:
      console.warn(`Unhandled webhook event: ${event}`)
  }

  return NextResponse.json({
    received: true,
    event,
    resourceId,
    timestamp: new Date().toISOString(),
  })
}

async function handleProjectEvent(event: string, payload: Record<string, unknown>) {
  console.log(`[Webhook] Project event: ${event}`, { id: payload.resourceId })
}

async function handleInvoiceEvent(event: string, payload: Record<string, unknown>) {
  console.log(`[Webhook] Invoice event: ${event}`, { id: payload.resourceId })
}

async function handleEmployeeEvent(event: string, payload: Record<string, unknown>) {
  console.log(`[Webhook] Employee event: ${event}`, { id: payload.resourceId })
}

async function handlePayrollEvent(event: string, payload: Record<string, unknown>) {
  console.log(`[Webhook] Payroll event: ${event}`, { id: payload.resourceId })
}

async function handleInventoryEvent(event: string, payload: Record<string, unknown>) {
  console.log(`[Webhook] Inventory alert: ${event}`, { id: payload.resourceId })
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'ConstructERP Webhook',
    version: '1.0.0',
    supportedEvents: [
      'project.created', 'project.updated', 'project.completed',
      'invoice.created', 'invoice.paid', 'invoice.overdue',
      'employee.added', 'employee.updated',
      'payroll.processed',
      'inventory.low_stock', 'inventory.out_of_stock',
    ],
  })
}
