'use server'

import { messages, type Locale } from '../i18n/messages'
import { Message } from '../model/Message'

function backendBaseUrl(): string {
	return (
		process.env.API_URL?.replace(/\/$/, '') ??
		process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ??
		'http://localhost:4000'
	)
}

function mapConversation(messagesArg: Message[]) {
	return messagesArg.map((m) => ({
		role: m.side === 'right' ? ('user' as const) : ('assistant' as const),
		content: m.text,
	}))
}

function chatMessage(locale: Locale, key: string): string {
	return messages[locale][key] ?? messages.pt[key] ?? key
}

export async function talkToAI(
	chatId: string,
	conversation: Message[],
	locale: Locale = 'pt',
): Promise<string | null> {
	const url = `${backendBaseUrl()}/chat`
	let response: Response
	try {
		response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chatId,
				messages: mapConversation(conversation),
				locale,
			}),
		})
	} catch {
		return chatMessage(locale, 'chat_error_network')
	}

	const raw = await response.text()
	let data: { reply?: string; message?: string | string[] } = {}
	try {
		data = raw ? JSON.parse(raw) : {}
	} catch {
		return response.ok
			? null
			: chatMessage(locale, 'chat_error_parse')
	}

	if (!response.ok) {
		const msg = data.message
		const text = Array.isArray(msg) ? msg.join(' ') : msg
		return text || chatMessage(locale, 'chat_error_unavailable')
	}

	return data.reply ?? null
}
