import { Technology } from '../technology/Technology'
import { Level } from './Level'
import { Type } from './Type'

export interface Project {
	id: number
	name: string
	description: string
	type: Type
	images: string[]
	level: Level
	repository: string
	highlight: boolean
	technologies?: Technology[]
}
