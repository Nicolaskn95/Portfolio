import { Module } from '@nestjs/common'
import { TechnologyController } from './technology.controller'
import { TechnologyPrisma } from './technology.prisma'
import { DbModule } from '../db/db.module'

@Module({
	controllers: [TechnologyController],
	providers: [TechnologyPrisma],
	imports: [DbModule],
})
export class TechnologyModule {}
