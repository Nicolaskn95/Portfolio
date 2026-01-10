import { Module } from '@nestjs/common'
import { DbModule } from 'src/db/db.module'
import { ProjectController } from './project.controller'
import { ProjectPrisma } from './project.prisma'

@Module({
	providers: [ProjectPrisma],
	controllers: [ProjectController],
	imports: [DbModule],
})
export class ProjectModule {}
