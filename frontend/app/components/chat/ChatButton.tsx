'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { IconX } from '@tabler/icons-react'
import { ChatWindow } from './ChatWindow'

const SCROLL_THRESHOLD_PX = 120

export function ChatButton() {
	const [open, setOpen] = useState(false)
	const [showOnScroll, setShowOnScroll] = useState(false)

	useEffect(() => {
		function onScroll() {
			setShowOnScroll(window.scrollY > SCROLL_THRESHOLD_PX)
		}
		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	if (open) {
		return (
			<div className="fixed bottom-12 right-4 left-4 z-50 w-auto max-w-[400px] sm:bottom-14 sm:right-5 sm:left-auto sm:max-w-[500px]">
				<button
					type="button"
					onClick={() => setOpen(false)}
					className="absolute -top-1 -right-1 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-zinc-700 text-white shadow-md transition-colors hover:bg-zinc-600 sm:-top-2 sm:-right-2 sm:h-8 sm:w-8"
					aria-label="Fechar chat"
				>
					<IconX size={18} />
				</button>
				<ChatWindow />
			</div>
		)
	}

	const particles = [
		{ x: '40px', y: '-40px', bg: '#ff5733' },
		{ x: '-40px', y: '-40px', bg: '#ffbd33' },
		{ x: '50px', y: '10px', bg: '#dbf227' },
		{ x: '-50px', y: '15px', bg: '#ff5733' },
		{ x: '10px', y: '50px', bg: '#ffbd33' },
		{ x: '-15px', y: '-55px', bg: '#fff' },
		{ x: '30px', y: '30px', bg: '#ff5733' },
		{ x: '-35px', y: '40px', bg: '#dbf227' },
		{ x: '-50px', y: '15px', bg: '#ff5733' },
		{ x: '10px', y: '50px', bg: '#ffbd33' },
		{ x: '-15px', y: '-55px', bg: '#fff' },
		{ x: '30px', y: '30px', bg: '#ff5733' },
		{ x: '-35px', y: '40px', bg: '#dbf227' },
		{ x: '30px', y: '30px', bg: '#ff5733' },
		{ x: '-35px', y: '40px', bg: '#dbf227' },
		{ x: '-50px', y: '15px', bg: '#ff5733' },
		{ x: '10px', y: '50px', bg: '#ffbd33' },
		{ x: '-15px', y: '-55px', bg: '#fff' },
		{ x: '30px', y: '30px', bg: '#ff5733' },
		{ x: '-35px', y: '40px', bg: '#dbf227' },
	]

	return (
		<button
			type="button"
			onClick={() => setOpen(true)}
			aria-label="Abrir chat"
			className="group fixed bottom-12 right-4 z-50 flex cursor-pointer items-end justify-end gap-0 border-0 bg-transparent p-0 sm:bottom-14 sm:right-5"
			style={{
				opacity: showOnScroll ? 1 : 0,
				pointerEvents: showOnScroll ? 'auto' : 'none',
				transition: 'opacity 0.2s ease-out',
			}}
		>
			{/* Explosão de partículas (centro do robô) */}
			{showOnScroll && (
				<div
					className="chat-explosion z-0 right-8 bottom-8 sm:right-[72.5px] sm:bottom-[72.5px]"
					aria-hidden
				>
					{particles.map((p, i) => (
						<div
							key={i}
							className="chat-explosion-particle"
							style={
								{
									'--x': p.x,
									'--y': p.y,
									background: p.bg,
								} as React.CSSProperties
							}
						/>
					))}
				</div>
			)}
			<div
				className="relative z-10 flex items-end justify-end origin-bottom-right"
				style={
					showOnScroll
						? {
								animation: 'chat-robot-pop-in 0.4s ease-out 0.15s forwards',
								opacity: 0,
							}
						: undefined
				}
			>
				{/* Mobile: balão em cima do gif. Desktop: balão à esquerda, só no hover */}
				<div
					className="pointer-events-none absolute left-1/2 bottom-full mb-2 -translate-x-1/2 rounded-2xl rounded-br-sm bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-800 shadow-[0_2px_10px_rgba(0,0,0,0.15)] max-w-[120px] sm:left-auto sm:right-full sm:bottom-0 sm:mb-14 sm:mr-1 sm:translate-x-0 sm:rounded-br-sm sm:px-3 sm:py-2 sm:text-sm sm:max-w-[140px] sm:opacity-0 sm:transition-opacity sm:duration-200 sm:group-hover:opacity-100"
					aria-hidden
				>
					<span>Posso ajudar?</span>
					{/* Seta para baixo no mobile */}
					<div
						className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-8 border-t-white sm:hidden"
						aria-hidden
					/>
					{/* Seta para a direita no desktop */}
					<div
						className="absolute -right-2 bottom-3 hidden w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-8 border-l-white sm:block sm:bottom-4 sm:border-t-[6px] sm:border-b-[6px] sm:border-l-8"
						aria-hidden
					/>
				</div>
				<Image
					src="/chat.gif"
					alt="Assistente virtual"
					width={150}
					height={150}
					className="h-16 w-16 sm:h-[150px] sm:w-[150px]"
				/>
			</div>
		</button>
	)
}
