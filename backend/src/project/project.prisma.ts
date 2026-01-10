import { Project } from '@core/project/Project'
import { Injectable } from '@nestjs/common'
import { PrismaProvider } from 'src/db/prisma.provider'

@Injectable()
export class ProjectPrisma {
	constructor(private readonly prisma: PrismaProvider) {}

	async getAll(): Promise<Project[]> {
		return this.prisma.project.findMany() as any
	}

	async getById(id: number): Promise<Project | null> {
		return this.prisma.project.findUnique({
			where: { id },
			include: { technologies: true },
		}) as any
	}
}
