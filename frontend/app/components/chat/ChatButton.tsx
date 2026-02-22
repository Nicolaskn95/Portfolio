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
			<div className="fixed bottom-5 right-5 z-50 w-[400px] sm:w-[500px]">
				<button
					type="button"
					onClick={() => setOpen(false)}
					className="absolute -top-2 -right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-700 text-white shadow-md hover:bg-zinc-600 transition-colors"
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
			className="fixed bottom-5 right-5 z-50 flex cursor-pointer items-end justify-end gap-0 border-0 bg-transparent p-0"
			style={{
				opacity: showOnScroll ? 1 : 0,
				pointerEvents: showOnScroll ? 'auto' : 'none',
				transition: 'opacity 0.2s ease-out',
			}}
		>
			{/* Explosão de partículas (centro do robô) */}
			{showOnScroll && (
				<div
					className="chat-explosion z-0"
					style={{ right: '72.5px', bottom: '72.5px' }}
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
				className="relative z-10 flex items-end gap-0 origin-bottom-right"
				style={
					showOnScroll
						? {
								animation: 'chat-robot-pop-in 0.4s ease-out 0.15s forwards',
								opacity: 0,
							}
						: undefined
				}
			>
				<div className="relative mb-4 mr-0 px-3 py-2 rounded-2xl rounded-br-sm bg-white text-zinc-800 text-sm font-medium max-w-[140px] shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
					<span>Posso ajudar?</span>
					<div
						className="absolute -right-2 bottom-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-8 border-l-white"
						aria-hidden
					/>
				</div>
				<Image src="/chat.gif" alt="Assistente virtual" width={150} height={150} />
			</div>
		</button>
	)
}
