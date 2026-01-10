import { Project } from '../project/Project'

export interface Technology {
	id: number
	name: string
	description: string
	image: string
	highlight: boolean
	projects?: Project[]
}
