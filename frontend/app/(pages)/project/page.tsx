import { redirect } from 'next/navigation'
import { getProjects } from '@/app/functions/projects'

export default async function ProjectsPage() {
	const projects = await getProjects()
	const firstProject = projects.all[0]

	if (firstProject) {
		redirect(`/project/${firstProject.id}`)
	}

	return null
}
