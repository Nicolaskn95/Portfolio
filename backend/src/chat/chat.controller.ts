import { Body, Controller, Post } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatRequestBody } from './chat.types'

@Controller('chat')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

	@Post()
	async chat(@Body() body: ChatRequestBody) {
		const messages = Array.isArray(body?.messages) ? body.messages : []
		const reply = await this.chatService.respond(messages)
		return { reply }
	}
}
