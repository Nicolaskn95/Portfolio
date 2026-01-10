import { Controller, Get, Param } from '@nestjs/common'
import { ProjectPrisma } from './project.prisma'
import { Project } from '@core/project/Project'

@Controller('projects')
export class ProjectController {
	constructor(private readonly projectPrisma: ProjectPrisma) {}

	@Get()
	async getAll(): Promise<Project[]> {
		return this.projectPrisma.getAll()
	}

	@Get(':id')
	async getById(@Param('id') id: string): Promise<Project | null> {
		return this.projectPrisma.getById(Number(id))
	}
}
