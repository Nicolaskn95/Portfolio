'use client'

import { useLocale } from '@/app/i18n/LocaleProvider'
import { useEffect, useState } from 'react'

const TYPING_MS = 80
const PAUSE_MS = 3000
const DELETING_MS = 40

export function TypingText() {
	const { t } = useLocale()
	const phrase = t('typing_phrase')
	const [text, setText] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)

	useEffect(() => {
		setText('')
		setIsDeleting(false)
	}, [phrase])

	useEffect(() => {
		if (!isDeleting) {
			if (text.length < phrase.length) {
				const timer = setTimeout(() => setText(phrase.slice(0, text.length + 1)), TYPING_MS)
				return () => clearTimeout(timer)
			}
			const timer = setTimeout(() => setIsDeleting(true), PAUSE_MS)
			return () => clearTimeout(timer)
		}
		if (text.length > 0) {
			const timer = setTimeout(() => setText(phrase.slice(0, text.length - 1)), DELETING_MS)
			return () => clearTimeout(timer)
		}
		setIsDeleting(false)
	}, [text, isDeleting, phrase])

	return (
		<p className="min-h-10 text-center text-lg sm:text-xl md:text-2xl text-foreground/90 font-light tracking-tight">
			{text}
			<span className="animate-pulse">|</span>
		</p>
	)
}
