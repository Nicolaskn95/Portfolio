import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ChatModule } from './chat/chat.module'
import { DbModule } from './db/db.module'
import { ProjectModule } from './project/project.module'
import { TechnologyModule } from './technology/technology.module'
import { TranslateModule } from './translate/translate.module'

@Module({
	imports: [DbModule, ProjectModule, TechnologyModule, ChatModule, TranslateModule],
	controllers: [AppController],
})
export class AppModule {}
