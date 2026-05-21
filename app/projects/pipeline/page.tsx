'use client'

import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import { formatCurrency } from '@/lib/utils'
import {
  Plus, MessageSquare, Clock, FileCheck, Handshake,
  CheckCircle2, Briefcase, ChevronRight, User, Calendar,
  DollarSign, AlertCircle, MoreHorizontal,
} from 'lucide-react'

type Stage = 'Lead' | 'Negotiation' | 'Pending Approval' | 'Contract Signing' | 'Active' | 'Completed'

interface PipelineProject {
  id: string
  name: string
  client: string
  type: string
  estimatedValue: number
  priority: 'High' | 'Medium' | 'Low'
  stage: Stage
  assignedTo: string
  expectedClose: string
  notes: string
  daysInStage: number
  negotiationRound?: number
}

const PIPELINE: PipelineProject[] = [
  { id: 'PP-001', name: 'Harbor View Residences', client: 'Blue Ocean Developers', type: 'Residential', estimatedValue: 18500000, priority: 'High', stage: 'Lead', assignedTo: 'Ahmed Hassan', expectedClose: '2024-06-30', notes: 'Initial meeting scheduled. Client interested in 45-unit complex.', daysInStage: 3 },
  { id: 'PP-002', name: 'Tech Hub Plaza', client: 'InnoTech Corp', type: 'Commercial', estimatedValue: 32000000, priority: 'High', stage: 'Lead', assignedTo: 'Sarah Mitchell', expectedClose: '2024-07-15', notes: 'RFP received. Preparing preliminary cost estimate.', daysInStage: 1 },
  { id: 'PP-003', name: 'Westside Mall Expansion', client: 'RetailGroup Inc', type: 'Commercial', estimatedValue: 11200000, priority: 'Medium', stage: 'Negotiation', assignedTo: 'James Carter', expectedClose: '2024-06-20', notes: 'Client requesting 8% discount on material costs. Counter-proposal sent.', daysInStage: 8, negotiationRound: 2 },
  { id: 'PP-004', name: 'Sunset Villa Complex', client: 'Prime Estates Ltd', type: 'Residential', estimatedValue: 7800000, priority: 'High', stage: 'Negotiation', assignedTo: 'Ahmed Hassan', expectedClose: '2024-06-10', notes: 'Scope change requested — client wants 2 additional floors. Reviewing structural implications.', daysInStage: 12, negotiationRound: 3 },
  { id: 'PP-005', name: 'City Sports Arena', client: 'Metro Municipality', type: 'Infrastructure', estimatedValue: 45000000, priority: 'High', stage: 'Negotiation', assignedTo: 'Sarah Mitchell', expectedClose: '2024-07-01', notes: 'Government tender process. Price negotiation ongoing. Final bid due in 2 weeks.', daysInStage: 5, negotiationRound: 1 },
  { id: 'PP-006', name: 'Green Valley Apartments', client: 'EcoLiving Developers', type: 'Residential', estimatedValue: 9400000, priority: 'Medium', stage: 'Pending Approval', assignedTo: 'David Okonkwo', expectedClose: '2024-06-15', notes: 'Terms agreed. Awaiting board approval from client side. Expected by June 15.', daysInStage: 6 },
  { id: 'PP-007', name: 'Industrial Logistics Hub', client: 'FastFreight Ltd', type: 'Industrial', estimatedValue: 15600000, priority: 'High', stage: 'Pending Approval', assignedTo: 'James Carter', expectedClose: '2024-06-08', notes: 'Finance department review pending. Insurance documentation being finalized.', daysInStage: 4 },
  { id: 'PP-008', name: 'Riverside Business Tower', client: 'Capital Ventures', type: 'Commercial', estimatedValue: 28000000, priority: 'High', stage: 'Contract Signing', assignedTo: 'Ahmed Hassan', expectedClose: '2024-05-30', notes: 'Contract drafted. Legal review complete on our end. Client signing appointment set for May 30.', daysInStage: 2 },
  { id: 'PP-009', name: 'Heritage Hotel Renovation', client: 'Luxury Stays Group', type: 'Hospitality', estimatedValue: 12300000, priority: 'Medium', stage: 'Contract Signing', assignedTo: 'Sarah Mitchell', expectedClose: '2024-06-02', notes: 'Minor clause adjustment requested. Revised contract sent for final review.', daysInStage: 3 },
  { id: 'PP-010', name: 'Skyline Tower', client: 'Metropolitan Development Co', type: 'Residential', estimatedValue: 22000000, priority: 'High', stage: 'Active', assignedTo: 'David Okonkwo', expectedClose: '2025-12-31', notes: 'Construction in progress. Foundation complete. Structural work ongoing.', daysInStage: 180 },
  { id: 'PP-011', name: 'Grand Hotel & Conference Center', client: 'Hospitality International', type: 'Hospitality', estimatedValue: 18750000, priority: 'High', stage: 'Active', assignedTo: 'James Carter', expectedClose: '2025-08-30', notes: 'Interior finishing phase. 72% complete. On schedule.', daysInStage: 210 },
  { id: 'PP-012', name: 'Greenfield Office Complex', client: 'Tech Solutions Ltd', type: 'Commercial', estimatedValue: 14200000, priority: 'Medium', stage: 'Completed', assignedTo: 'Ahmed Hassan', expectedClose: '2024-03-31', notes: 'Project delivered. Final snag list cleared. Handover complete.', daysInStage: 0 },
]

const STAGES: { id: Stage; label: string; icon: React.ElementType; color: string; bg: string; border: string; badgeBg: string }[] = [
  { id: 'Lead', label: 'Lead', icon: Briefcase, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', badgeBg: 'bg-slate-200 text-slate-700' },
  { id: 'Negotiation', label: 'Negotiation', icon: MessageSquare, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', badgeBg: 'bg-amber-200 text-amber-800' },
  { id: 'Pending Approval', label: 'Pending Approval', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', badgeBg: 'bg-blue-200 text-blue-800' },
  { id: 'Contract Signing', label: 'Contract Signing', icon: FileCheck, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', badgeBg: 'bg-purple-200 text-purple-800' },
  { id: 'Active', label: 'Active', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200', badgeBg: 'bg-emerald-200 text-emerald-800' },
  { id: 'Completed', label: 'Completed', icon: Handshake, color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', badgeBg: 'bg-green-200 text-green-800' },
]

const PRIORITY_COLORS: Record<string, string> = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-slate-100 text-slate-600',
}

export default function ProjectPipelinePage() {
  const totalPipelineValue = PIPELINE.filter(p => p.stage !== 'Completed').reduce((s, p) => s + p.estimatedValue, 0)
  const activeDeals = PIPELINE.filter(p => !['Completed'].includes(p.stage)).length
  const negotiationCount = PIPELINE.filter(p => p.stage === 'Negotiation').length
  const closingThisMonth = PIPELINE.filter(p => p.stage === 'Contract Signing').length

  return (
    <DashboardLayout>
      <PageHeader
        title="Project Pipeline"
        description="Track projects from initial lead through negotiation to contract and delivery"
        actions={
          <>
            <button className="btn-secondary"><ChevronRight className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> New Lead</button>
          </>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-xs text-slate-400 mb-1">Pipeline Value</p>
          <p className="text-xl font-bold text-slate-800">{formatCurrency(totalPipelineValue)}</p>
          <p className="text-[11px] text-slate-400 mt-1">Excl. completed projects</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-400 mb-1">Active Deals</p>
          <p className="text-xl font-bold text-blue-600">{activeDeals}</p>
          <p className="text-[11px] text-slate-400 mt-1">Across all stages</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-400 mb-1">In Negotiation</p>
          <p className="text-xl font-bold text-amber-600">{negotiationCount}</p>
          <p className="text-[11px] text-slate-400 mt-1">Awaiting agreement</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-400 mb-1">Closing This Month</p>
          <p className="text-xl font-bold text-purple-600">{closingThisMonth}</p>
          <p className="text-[11px] text-slate-400 mt-1">Contract signing stage</p>
        </div>
      </div>

      {/* Stage Flow Indicator */}
      <div className="card p-4 mb-6">
        <div className="flex items-center gap-1 overflow-x-auto">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon
            const count = PIPELINE.filter(p => p.stage === stage.id).length
            const value = PIPELINE.filter(p => p.stage === stage.id).reduce((s, p) => s + p.estimatedValue, 0)
            return (
              <div key={stage.id} className="flex items-center gap-1 flex-shrink-0">
                <div className={`flex flex-col items-center px-4 py-3 rounded-xl border ${stage.bg} ${stage.border} min-w-[130px]`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${stage.color}`} />
                    <span className={`text-[12px] font-semibold ${stage.color}`}>{stage.label}</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${stage.badgeBg}`}>{count} projects</span>
                  <span className="text-[11px] text-slate-500 mt-0.5">{formatCurrency(value)}</span>
                </div>
                {idx < STAGES.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STAGES.map(stage => {
          const Icon = stage.icon
          const projects = PIPELINE.filter(p => p.stage === stage.id)
          return (
            <div key={stage.id} className="flex-shrink-0 w-72">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-t-xl border-t border-x ${stage.border} ${stage.bg}`}>
                <Icon className={`w-4 h-4 ${stage.color}`} />
                <span className={`text-[12px] font-bold ${stage.color}`}>{stage.label}</span>
                <span className={`ml-auto text-[11px] font-bold px-2 py-0.5 rounded-full ${stage.badgeBg}`}>{projects.length}</span>
              </div>
              <div className={`space-y-3 p-2 rounded-b-xl border-b border-x ${stage.border} bg-slate-50 min-h-[200px]`}>
                {projects.map(proj => (
                  <div key={proj.id} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-slate-800 leading-tight truncate">{proj.name}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate">{proj.client}</p>
                      </div>
                      <button className="w-6 h-6 rounded hover:bg-slate-100 flex items-center justify-center flex-shrink-0 ml-1">
                        <MoreHorizontal className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 mb-2">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${PRIORITY_COLORS[proj.priority]}`}>{proj.priority}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">{proj.type}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-2">
                      <DollarSign className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                      <span className="text-[12px] font-bold text-emerald-700">{formatCurrency(proj.estimatedValue)}</span>
                    </div>

                    {proj.stage === 'Negotiation' && proj.negotiationRound && (
                      <div className="flex items-center gap-1.5 mb-2 px-2 py-1 bg-amber-50 rounded-lg border border-amber-100">
                        <MessageSquare className="w-3 h-3 text-amber-500 flex-shrink-0" />
                        <span className="text-[11px] text-amber-700 font-medium">Round {proj.negotiationRound} of negotiations</span>
                      </div>
                    )}

                    {proj.daysInStage > 10 && proj.stage !== 'Active' && proj.stage !== 'Completed' && (
                      <div className="flex items-center gap-1.5 mb-2 px-2 py-1 bg-red-50 rounded-lg border border-red-100">
                        <AlertCircle className="w-3 h-3 text-red-400 flex-shrink-0" />
                        <span className="text-[11px] text-red-600 font-medium">{proj.daysInStage} days in this stage</span>
                      </div>
                    )}

                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mb-2">{proj.notes}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] text-slate-500">{proj.assignedTo.split(' ')[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span className="text-[10px] text-slate-500">{new Date(proj.expectedClose).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className={`w-8 h-8 rounded-full ${stage.bg} ${stage.border} border flex items-center justify-center mb-2`}>
                      <Icon className={`w-4 h-4 ${stage.color}`} />
                    </div>
                    <p className="text-[11px] text-slate-400">No projects</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Pipeline List Table */}
      <div className="card mt-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800">All Pipeline Projects</h3>
            <p className="text-xs text-slate-400">{PIPELINE.length} total deals</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['ID', 'Project', 'Client', 'Type', 'Stage', 'Value', 'Priority', 'Assigned To', 'Expected Close', 'Days in Stage'].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PIPELINE.map(proj => {
                const stage = STAGES.find(s => s.id === proj.stage)!
                return (
                  <tr key={proj.id} className="table-row">
                    <td className="table-cell pl-5 font-mono text-[11px] text-slate-500">{proj.id}</td>
                    <td className="table-cell">
                      <p className="text-[12px] font-semibold text-slate-800">{proj.name}</p>
                    </td>
                    <td className="table-cell text-[12px] text-slate-600">{proj.client}</td>
                    <td className="table-cell">
                      <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{proj.type}</span>
                    </td>
                    <td className="table-cell">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${stage.badgeBg}`}>{proj.stage}</span>
                    </td>
                    <td className="table-cell font-bold text-[12px] text-slate-800">{formatCurrency(proj.estimatedValue)}</td>
                    <td className="table-cell">
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${PRIORITY_COLORS[proj.priority]}`}>{proj.priority}</span>
                    </td>
                    <td className="table-cell text-[12px] text-slate-600">{proj.assignedTo}</td>
                    <td className="table-cell text-[12px] text-slate-500 whitespace-nowrap">
                      {new Date(proj.expectedClose).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="table-cell">
                      <span className={`text-[12px] font-semibold ${proj.daysInStage > 10 && proj.stage !== 'Active' && proj.stage !== 'Completed' ? 'text-red-500' : 'text-slate-600'}`}>
                        {proj.stage === 'Completed' ? '—' : `${proj.daysInStage}d`}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
