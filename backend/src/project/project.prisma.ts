import { Prisma, Project as PrismaProject } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaProvider } from '../db/prisma.provider'

export type ProjectWithTechnologies = Prisma.ProjectGetPayload<{
	include: { technologies: true }
}>

@Injectable()
export class ProjectPrisma {
	constructor(private readonly prisma: PrismaProvider) {}

	async getAll(): Promise<PrismaProject[]> {
		return this.prisma.project.findMany()
	}

	async getById(id: number): Promise<ProjectWithTechnologies | null> {
		return this.prisma.project.findUnique({
			where: { id },
			include: { technologies: true },
		})
	}
}
