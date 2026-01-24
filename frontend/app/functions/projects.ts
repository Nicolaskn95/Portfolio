import { Project, Type } from '@core'
import { httpGet } from './api'

export async function getProjects() {
	const response = await httpGet<Project[]>('/projects')
	const projects = Array.isArray(response) ? response : []

	return {
		all: projects,
		get mobile() {
			return projects.filter((project) => project.type === Type.MOBILE)
		},
		get web() {
			return projects.filter((project) => project.type === Type.WEB)
		},
		get game() {
			return projects.filter((project) => project.type === Type.GAME)
		},
		get highlight() {
			return projects.filter((project) => project.highlight)
		},
	}
}

export async function getProject(id: string): Promise<Project | null> {
	return await httpGet(`projects/${id}`)
}
