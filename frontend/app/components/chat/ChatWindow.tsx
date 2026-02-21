'use client'
import { Button } from '@/components/ui/button'
import { useChat } from '@/hooks/useChat'
import { IconMessages, IconReload, IconSend } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { MessageBalloon } from './MessageBalloon'
import Image from 'next/image'

export function ChatWindow() {
	const [text, setText] = useState<string>('')
	const { messages, clearMessages, addMessage, thinking, canSendMore } = useChat()
	const chatEndRef = useRef<HTMLDivElement>(null)

	function sendMessage() {
		if (!canSendMore || !text.trim()) return
		addMessage(text)
		setText('')
	}

	useEffect(() => {
		if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	return (
		<div className="flex flex-col bg-zinc-300 rounded-2xl text-black overflow-hidden">
			<div className="flex justify-between items-center bg-white p-4">
				<h2 className="text-xl font-bold">Ola Visitante!</h2>
				<IconReload
					size={25}
					className="cursor-pointer text-black"
					onClick={clearMessages}
				/>
			</div>
			{messages.length === 0 ? (
				<div className="flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px]">
					<IconMessages size={230} stroke={0.2} className="text-black/30" />
					<span>Vamos conversar?</span>
				</div>
			) : (
				<div className="flex flex-col min-h-[400px] sm:min-h-[500px] max-h-[400px] sm:max-h-[500px] overflow-y-scroll gap-2">
					{messages.map((message, i) => {
						const sameAuthor = i > 0 && messages[i - 1].author === message.author
						return (
							<MessageBalloon
								key={message.id}
								message={message}
								omitAuthor={sameAuthor}
							/>
						)
					})}
					{thinking && (
						<Image src="/pensando.gif" alt="Thinking" width={50} height={50} />
					)}
					<div ref={chatEndRef} />
				</div>
			)}
			<div className="h-px bg-zinc-400 mt-4" />
			<div className="flex items-center gap-2 p-1 rounded-full h-10 bg-white m-4">
				<input
					type="text"
					value={text}
					placeholder={!canSendMore ? 'Aguarde a resposta para enviar mais' : 'Mensagem...'}
					className="flex-1 bg-transparent border-none outline-none pl-3"
					onChange={(e) => setText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') sendMessage()
					}}
					disabled={!canSendMore}
				/>
				<Button
					className="flex justify-center items-center bg-green-400 hover:bg-green-500 transition-colors min-h-8 min-w-8 rounded-full disabled:opacity-50 disabled:pointer-events-none"
					size="icon"
					onClick={sendMessage}
					disabled={!canSendMore || !text.trim()}
				>
					<IconSend size={20} />
				</Button>
			</div>
		</div>
	)
}
