export type ChatRole = 'user' | 'assistant'

export interface ChatMessagePayload {
	role: ChatRole
	content: string
}

export interface ChatRequestBody {
	chatId?: string
	messages: ChatMessagePayload[]
}
