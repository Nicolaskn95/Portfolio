import { Module } from '@nestjs/common'
import { ProjectModule } from '../project/project.module'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'

@Module({
	imports: [ProjectModule],
	controllers: [ChatController],
	providers: [ChatService],
})
export class ChatModule {}
