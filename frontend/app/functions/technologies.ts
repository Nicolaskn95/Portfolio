import { Technology } from '@core/technology/Technology'
import { httpGet } from './api'

export async function getTechnologies() {
	const technologies: Technology[] = await httpGet('/technologies')

	return {
		all: technologies,
		get highlight() {
			return technologies.filter((tech) => tech.highlight)
		},
	}
}
