import DashboardLayout from '@/components/layout/DashboardLayout'
import PageHeader from '@/components/ui/PageHeader'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import StatCard from '@/components/ui/StatCard'
import { formatCurrency, formatDate } from '@/lib/utils'
import { FolderOpen, Plus, Filter, Download, MapPin, Users, Calendar } from 'lucide-react'
import projectsData from '@/lib/data/projects.json'

export default function ProjectsPage() {
  const stats = {
    total: projectsData.length,
    active: projectsData.filter((p) => p.status === 'In Progress').length,
    completed: projectsData.filter((p) => p.status === 'Completed').length,
    totalBudget: projectsData.reduce((s, p) => s + p.budget, 0),
  }

  return (
    <DashboardLayout title="Projects" subtitle="Manage all construction projects">
      <PageHeader
        title="All Projects"
        description={`${stats.total} projects total`}
        actions={
          <>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors font-medium">
              <Plus className="w-4 h-4" /> New Project
            </button>
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Projects" value={stats.total} icon={FolderOpen} iconColor="text-blue-600" iconBg="bg-blue-100" />
        <StatCard title="In Progress" value={stats.active} icon={FolderOpen} iconColor="text-primary-600" iconBg="bg-primary-100" />
        <StatCard title="Completed" value={stats.completed} icon={FolderOpen} iconColor="text-green-600" iconBg="bg-green-100" />
        <StatCard title="Total Budget" value={formatCurrency(stats.totalBudget)} icon={FolderOpen} iconColor="text-purple-600" iconBg="bg-purple-100" />
      </div>

      {/* Filter tabs */}
      <div className="bg-white rounded-xl shadow-card border border-slate-100">
        <div className="flex items-center gap-1 p-4 border-b border-slate-100 overflow-x-auto">
          {['All', 'In Progress', 'Planning', 'On Hold', 'Completed'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1.5 text-sm rounded-lg font-medium whitespace-nowrap transition-colors ${
                tab === 'All'
                  ? 'bg-primary-500 text-white'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="p-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="border border-slate-200 rounded-xl p-5 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm group-hover:text-primary-600 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-slate-400">{project.id} · {project.type}</p>
                  </div>
                </div>
                <Badge status={project.status} />
              </div>

              <p className="text-xs text-slate-500 mb-3 line-clamp-2">{project.description}</p>

              {/* Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Progress</span>
                  <span className="font-medium text-slate-700">{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} showLabel={false} />
              </div>

              {/* Budget */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-slate-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-slate-400">Budget</p>
                  <p className="text-sm font-semibold text-slate-700">{formatCurrency(project.budget)}</p>
                </div>
                <div className="bg-slate-50 rounded-lg px-3 py-2">
                  <p className="text-xs text-slate-400">Spent</p>
                  <p className="text-sm font-semibold text-slate-700">{formatCurrency(project.spent)}</p>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {project.location.split(',')[1]?.trim() ?? project.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {project.workers} workers
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(project.endDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
