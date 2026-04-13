'use client'
import { useState } from 'react'
import { Id } from '@core'
import { useLocalStorage } from './useLocalStorage'
import { Message } from '@/app/model/Message'
import { talkToAI } from '@/app/functions/chat'
import { useLocale } from '@/app/i18n/LocaleProvider'

export function useChat() {
	const { locale, t } = useLocale()
	const [chatId] = useLocalStorage<string>('chatId', Id.generate())
	const [messages, setMessages] = useLocalStorage<Message[]>('messages', [])
	const [thinking, setThinking] = useState<boolean>(false)

	async function addMessage(text: string) {
		let trailingUserCount = 0
		for (let i = messages.length - 1; i >= 0 && messages[i].side === 'right'; i--)
			trailingUserCount++
		if (trailingUserCount >= 2) return

		try {
			setThinking(true)
			const newMessage: Message = {
				id: Id.generate(),
				text,
				author: t('chat_label_visitor'),
				side: 'right',
			}

			setMessages((msgs) => [...msgs, newMessage])

			const reponse = await talkToAI(chatId, [...messages, newMessage], locale)
			if (!reponse) return

			const reponseAImessage: Message = {
				id: Id.generate(),
				text: reponse,
				author: t('chat_label_assistant'),
				side: 'left',
			}

			setMessages((msgs) => [...msgs, reponseAImessage])
		} catch (error) {
			console.error('Error adding message:', error)
		} finally {
			setThinking(false)
		}
	}

	function clearMessages() {
		setMessages([])
	}

	let trailingUserCount = 0
	for (let i = messages.length - 1; i >= 0 && messages[i].side === 'right'; i--)
		trailingUserCount++
	const canSendMore = trailingUserCount < 2

	return {
		chatId,
		messages,
		thinking,
		addMessage,
		clearMessages,
		canSendMore,
	}
}
