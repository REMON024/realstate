import DashboardLayout from '@/components/layout/DashboardLayout'
import projectsData from '@/lib/data/projects.json'
import ProjectDetailTabs from './ProjectDetailTabs'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  return projectsData.map(p => ({ id: p.id }))
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projectsData.find(p => p.id === params.id)
  if (!project) notFound()
  return (
    <DashboardLayout>
      <ProjectDetailTabs project={project} />
    </DashboardLayout>
  )
}
