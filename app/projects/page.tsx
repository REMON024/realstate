import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import StatCard from '@/components/ui/StatCard'
import {
  FolderKanban, Plus, Search, Filter, Download,
  MapPin, Users, Calendar, DollarSign, HardHat,
  Eye, Edit, Trash2, TrendingUp,
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import projectsData from '@/lib/data/projects.json'

const TABS = ['All', 'In Progress', 'Planning', 'On Hold', 'Completed']

const TYPE_ICON: Record<string, string> = {
  Residential: 'bg-blue-50 text-blue-500',
  Commercial: 'bg-purple-50 text-purple-500',
  Industrial: 'bg-amber-50 text-amber-500',
  Infrastructure: 'bg-teal-50 text-teal-500',
  Hospitality: 'bg-pink-50 text-pink-500',
}

export default function ProjectsPage() {
  const stats = {
    total: projectsData.length,
    active: projectsData.filter(p => p.status === 'In Progress').length,
    completed: projectsData.filter(p => p.status === 'Completed').length,
    totalBudget: projectsData.reduce((s, p) => s + p.budget, 0),
    totalWorkers: projectsData.filter(p => p.status === 'In Progress').reduce((s, p) => s + p.workers, 0),
    avgProgress: Math.round(projectsData.reduce((s, p) => s + p.progress, 0) / projectsData.length),
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Project Management"
        description="Monitor and manage all construction projects"
        actions={
          <>
            <button className="btn-secondary"><Filter className="w-4 h-4" /> Filter</button>
            <button className="btn-secondary"><Download className="w-4 h-4" /> Export</button>
            <button className="btn-primary"><Plus className="w-4 h-4" /> New Project</button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Projects" value={stats.total} subtitle={`${stats.active} currently active`} icon={FolderKanban} gradient="gradient-blue" />
        <StatCard title="Total Budget" value={formatCurrency(stats.totalBudget)} subtitle="All projects combined" icon={DollarSign} gradient="gradient-orange" />
        <StatCard title="Site Workers" value={stats.totalWorkers} subtitle="Deployed on active sites" icon={Users} gradient="gradient-purple" />
        <StatCard title="Avg Progress" value={`${stats.avgProgress}%`} subtitle="Across all projects" trend="up" change="On track" icon={TrendingUp} gradient="gradient-green" />
      </div>

      {/* Table card */}
      <div className="card">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 gap-4 flex-wrap">
          <div className="flex items-center gap-1 overflow-x-auto">
            {TABS.map(tab => (
              <button key={tab} className={`tab-btn whitespace-nowrap ${tab === 'All' ? 'tab-btn-active' : 'tab-btn-inactive'}`}>
                {tab}
                {tab !== 'All' && (
                  <span className="ml-1.5 text-[10px] bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded-full">
                    {projectsData.filter(p => p.status === tab).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="relative flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input className="input-field pl-9 w-52 text-[13px]" placeholder="Search projects..." />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['Project', 'Client', 'Type', 'Manager', 'Budget', 'Progress', 'Phase', 'Timeline', 'Priority', 'Status', 'Actions'].map(h => (
                  <th key={h} className="table-head first:pl-5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectsData.map(p => (
                <tr key={p.id} className="table-row">
                  <td className="table-cell pl-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${TYPE_ICON[p.type] ?? 'bg-slate-50 text-slate-500'}`}>
                        <HardHat className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-[13px]">{p.name}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-2.5 h-2.5" />
                          {p.location.split(',').slice(-2).join(',').trim()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <p className="text-[13px] text-slate-700">{p.client}</p>
                    <p className="text-[11px] text-slate-400">{p.contractType}</p>
                  </td>
                  <td className="table-cell">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${TYPE_ICON[p.type] ?? 'bg-slate-100 text-slate-600'}`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center">
                        {p.manager.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-[12px] text-slate-700 whitespace-nowrap">{p.manager}</span>
                    </div>
                  </td>
                  <td className="table-cell">
                    <p className="font-semibold text-slate-800 text-[13px]">{formatCurrency(p.budget)}</p>
                    <p className="text-[11px] text-slate-400">{formatCurrency(p.spent)} spent</p>
                  </td>
                  <td className="table-cell" style={{ minWidth: 140 }}>
                    <ProgressBar value={p.progress} size="sm" />
                  </td>
                  <td className="table-cell">
                    <span className="text-[12px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">{p.phase}</span>
                  </td>
                  <td className="table-cell whitespace-nowrap">
                    <p className="text-[12px] text-slate-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {formatDate(p.endDate)}
                    </p>
                    <p className="text-[11px] text-slate-400">Started {formatDate(p.startDate)}</p>
                  </td>
                  <td className="table-cell"><Badge status={p.priority} /></td>
                  <td className="table-cell"><Badge status={p.status} /></td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center transition-colors" title="View">
                        <Eye className="w-3.5 h-3.5 text-blue-500" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-amber-50 flex items-center justify-center transition-colors" title="Edit">
                        <Edit className="w-3.5 h-3.5 text-amber-500" />
                      </button>
                      <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors" title="Delete">
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
          <p className="text-[12px] text-slate-500">Showing 1–{projectsData.length} of {projectsData.length} projects</p>
          <div className="flex items-center gap-1">
            {[1,2,3].map(n => (
              <button key={n} className={`w-8 h-8 text-xs rounded-lg font-medium ${n === 1 ? 'bg-orange-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>{n}</button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
