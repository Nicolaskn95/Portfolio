import { Controller, Get, Param } from '@nestjs/common'
import { Project as PrismaProject } from '@prisma/client'
import { ProjectPrisma, ProjectWithTechnologies } from './project.prisma'

@Controller('projects')
export class ProjectController {
	constructor(private readonly projectPrisma: ProjectPrisma) {}

	@Get()
	async getAll(): Promise<PrismaProject[]> {
		return this.projectPrisma.getAll()
	}

	@Get(':id')
	async getById(
		@Param('id') id: string,
	): Promise<ProjectWithTechnologies | null> {
		return this.projectPrisma.getById(Number(id))
	}
}
