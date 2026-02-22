import { Technology } from '@core'
import { httpGet } from './api'

export async function getTechnologies() {
	const response = await httpGet<Technology[]>('/technologies')
	const technologies = Array.isArray(response) ? response : []

	return {
		all: technologies,
		get highlight() {
			return technologies.filter((tech) => tech.highlight)
		},
	}
}
