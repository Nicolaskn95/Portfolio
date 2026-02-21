'use client'

import { useEffect, useState } from 'react'

const PHRASE = 'Modelando problemas do mundo real e arquitetando soluções no mundo digital.'
const TYPING_MS = 80
const PAUSE_MS = 3000
const DELETING_MS = 40

export function TypingText() {
	const [text, setText] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)

	useEffect(() => {
		if (!isDeleting) {
			if (text.length < PHRASE.length) {
				const t = setTimeout(() => setText(PHRASE.slice(0, text.length + 1)), TYPING_MS)
				return () => clearTimeout(t)
			}
			const t = setTimeout(() => setIsDeleting(true), PAUSE_MS)
			return () => clearTimeout(t)
		}
		if (text.length > 0) {
			const t = setTimeout(() => setText(PHRASE.slice(0, text.length - 1)), DELETING_MS)
			return () => clearTimeout(t)
		}
		setIsDeleting(false)
	}, [text, isDeleting])

	return (
		<p className="min-h-10 text-center text-lg sm:text-xl md:text-2xl text-foreground/90 font-light tracking-tight">
			{text}
			<span className="animate-pulse">|</span>
		</p>
	)
}
