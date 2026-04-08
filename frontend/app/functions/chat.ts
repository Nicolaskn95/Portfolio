'use server'

import { Message } from '../model/Message'

function backendBaseUrl(): string {
	return (
		process.env.API_URL?.replace(/\/$/, '') ??
		process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ??
		'http://localhost:4000'
	)
}

function mapConversation(messages: Message[]) {
	return messages.map((m) => ({
		role: m.side === 'right' ? ('user' as const) : ('assistant' as const),
		content: m.text,
	}))
}

export async function talkToAI(
	chatId: string,
	conversation: Message[],
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
			}),
		})
	} catch {
		return 'Não foi possível contactar o servidor. Tente novamente em instantes.'
	}

	const raw = await response.text()
	let data: { reply?: string; message?: string | string[] } = {}
	try {
		data = raw ? JSON.parse(raw) : {}
	} catch {
		return response.ok
			? null
			: 'Resposta inválida do servidor. Tente novamente.'
	}

	if (!response.ok) {
		const msg = data.message
		const text = Array.isArray(msg) ? msg.join(' ') : msg
		return text || 'O assistente está indisponível no momento.'
	}

	return data.reply ?? null
}
