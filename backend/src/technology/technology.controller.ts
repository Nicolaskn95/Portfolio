import { Controller, Get } from '@nestjs/common'
import { Technology } from '@core/technology/Technology'
import { TechnologyPrisma } from './technology.prisma'

@Controller('technologies')
export class TechnologyController {
	constructor(private readonly technologyPrisma: TechnologyPrisma) {}
	@Get()
	async getAll(): Promise<Technology[]> {
		return this.technologyPrisma.getAll()
	}

	@Get('highlights')
	async getHighlights(): Promise<Technology[]> {
		return this.technologyPrisma.getHighlights()
	}
}
