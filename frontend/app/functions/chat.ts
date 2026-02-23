'use server'
import { Message } from '../model/Message'

export async function talkToAI(chatId: string, message: Message): Promise<string | null> {
	const webhookUrl = process.env.CHAT_WEBHOOK_URL
	if (!webhookUrl) return null

	const response = await fetch(webhookUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ chatId, message: message.text }),
	})

	const reponseMessage = await response.text()
	console.log(reponseMessage)
	return reponseMessage
}
