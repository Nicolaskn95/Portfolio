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
		<div className="flex max-h-[85dvh] min-h-0 flex-col overflow-hidden rounded-xl bg-zinc-300 text-black sm:max-h-[75dvh] sm:rounded-2xl">
			<div className="flex shrink-0 items-center justify-between bg-white p-3 sm:p-4">
				<h2 className="truncate text-base font-bold sm:text-xl">Ola Visitante!</h2>
				<button
					type="button"
					onClick={clearMessages}
					className="flex shrink-0 touch-manipulation p-1 -m-1"
					aria-label="Limpar conversa"
				>
					<IconReload size={22} className="text-black sm:size-6" />
				</button>
			</div>
			{messages.length === 0 ? (
				<div className="flex min-h-[200px] flex-1 flex-col items-center justify-center gap-2 px-4 py-6 sm:min-h-[280px] sm:py-8">
					<div className="flex size-24 items-center justify-center sm:size-36 md:size-48">
						<IconMessages size={256} stroke={0.2} className="size-full text-black/30" />
					</div>
					<span className="text-sm sm:text-base">Vamos conversar?</span>
				</div>
			) : (
				<div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-2 py-2 sm:px-3 sm:py-3">
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
						<div className="flex justify-start">
							<Image
								src="/pensando.gif"
								alt="Pensando..."
								width={50}
								height={50}
								className="size-8 sm:size-12"
							/>
						</div>
					)}
					<div ref={chatEndRef} />
				</div>
			)}
			<div className="h-px shrink-0 bg-zinc-400" />
			<div className="flex shrink-0 items-center gap-1.5 rounded-full bg-white p-1.5 m-2 sm:m-4 sm:gap-2 sm:p-1 sm:h-10">
				<input
					type="text"
					value={text}
					placeholder={
						!canSendMore ? 'Aguarde...' : 'Mensagem...'
					}
					className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 pl-2 sm:pl-3 sm:text-base"
					onChange={(e) => setText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') sendMessage()
					}}
					disabled={!canSendMore}
				/>
				<Button
					className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-400 transition-colors hover:bg-green-500 disabled:pointer-events-none disabled:opacity-50 sm:h-9 sm:w-9"
					size="icon"
					onClick={sendMessage}
					disabled={!canSendMore || !text.trim()}
				>
					<IconSend size={18} className="sm:size-5" />
				</Button>
			</div>
		</div>
	)
}
