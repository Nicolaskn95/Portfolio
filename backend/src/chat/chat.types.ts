export type ChatRole = 'user' | 'assistant'

export interface ChatMessagePayload {
	role: ChatRole
	content: string
}

export type ChatUiLocale = 'pt' | 'en'

export interface ChatRequestBody {
	chatId?: string
	messages: ChatMessagePayload[]
	/** Idioma ativo no front; o modelo deve responder nesse idioma. */
	locale?: ChatUiLocale
}
