import { Technology } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaProvider } from '../db/prisma.provider'

@Injectable()
export class TechnologyPrisma {
	constructor(private readonly prisma: PrismaProvider) {}

	async getAll(): Promise<Technology[]> {
		return this.prisma.technology.findMany()
	}

	async getHighlights(): Promise<Technology[]> {
		return this.prisma.technology.findMany({
			where: {
				highlight: true,
			},
		})
	}
}
