export interface Project {
  id: string
  name: string
  client: string
  type: string
  status: string
  priority: string
  manager: string
  startDate: string
  endDate: string
  budget: number
  spent: number
  progress: number
  location: string
  workers: number
  description: string
  phase: string
  contractType: string
}

export interface Employee {
  id: string
  name: string
  role: string
  department: string
  email: string
  phone: string
  status: string
  joinDate: string
  salary: number
  location: string
  avatar: string
  skills: string[]
  assignedProjects: string[]
  attendance: number
  performance: number
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  sku: string
  unit: string
  quantity: number
  minStock: number
  unitCost: number
  totalValue: number
  supplier: string
  warehouse: string
  lastUpdated: string
  status: string
}

export interface Invoice {
  id: string
  client: string
  project: string
  amount: number
  tax: number
  total: number
  status: string
  issueDate: string
  dueDate: string
  paidDate: string | null
  type: string
}

export interface Expense {
  id: string
  category: string
  description: string
  amount: number
  date: string
  project: string
  status: string
  approvedBy: string | null
}

export interface Contractor {
  id: string
  company: string
  contact: string
  email: string
  phone: string
  specialty: string
  status: string
  rating: number
  totalContracts: number
  activeContracts: number
  totalValue: number
  location: string
  license: string
  insurance: string
  certifications: string[]
}

export interface PayrollItem {
  employeeId: string
  employeeName: string
  department: string
  basicSalary: number
  overtime: number
  allowances: number
  grossPay: number
  taxDeduction: number
  socialSecurity: number
  healthInsurance: number
  totalDeductions: number
  netPay: number
  bankAccount: string
  status: string
}

export interface WebhookEvent {
  id: string
  event: string
  resource: string
  resourceId: string
  payload: Record<string, unknown>
  timestamp: string
  status: 'success' | 'failed' | 'pending'
  retries: number
}
