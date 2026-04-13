'use client'

import ContentMD from '@/app/shared/ContentMD'
import { useLocale } from '@/app/i18n/LocaleProvider'
import { translatePlain } from '@/app/functions/translate'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export interface ReadmeProps {
	markdown: string
}

export default function Readme({ markdown }: ReadmeProps) {
	const { locale, t } = useLocale()
	const [displayMd, setDisplayMd] = useState(markdown)
	const [busy, setBusy] = useState(false)
	const [translateFailed, setTranslateFailed] = useState(false)
	const translateRequestId = useRef(0)

	useEffect(() => {
		if (locale !== 'en') {
			setDisplayMd(markdown)
			setBusy(false)
			setTranslateFailed(false)
			return
		}

		const id = ++translateRequestId.current
		setBusy(true)
		setTranslateFailed(false)
		setDisplayMd(markdown)

		;(async () => {
			const out = await translatePlain(markdown, 'auto', 'en')
			if (translateRequestId.current !== id) return
			if (out === null) {
				setTranslateFailed(true)
				setDisplayMd(markdown)
			} else {
				setTranslateFailed(false)
				setDisplayMd(out)
			}
			setBusy(false)
		})()
	}, [locale, markdown])

	return (
		<div className="flex flex-col items-stretch border border-zinc-800 bg-black p-6 rounded-2xl">
			{busy ? (
				<div
					className="mb-5 flex gap-3 rounded-xl border border-cyan-400/35 bg-linear-to-r from-cyan-950/80 via-zinc-900/90 to-cyan-950/50 px-4 py-3.5 shadow-[0_0_32px_rgba(34,211,238,0.18)] sm:gap-4 sm:px-5 sm:py-4"
					role="status"
					aria-live="polite"
					aria-busy="true"
				>
					<div className="relative flex shrink-0 items-center justify-center">
						<span
							className="absolute size-10 rounded-full bg-cyan-400/25 blur-md sm:size-11"
							aria-hidden
						/>
						<Loader2
							className="relative size-7 text-cyan-300 animate-spin sm:size-8"
							strokeWidth={2.25}
							aria-hidden
						/>
					</div>
					<div className="min-w-0 flex-1">
						<p className="text-sm font-semibold tracking-tight text-cyan-50 sm:text-base">
							{t('readme_translating')}
						</p>
						<p className="mt-0.5 text-xs leading-snug text-cyan-100/75 sm:text-sm">
							{t('readme_translating_hint')}
						</p>
						<div
							className="mt-2.5 h-1 overflow-hidden rounded-full bg-zinc-800/80"
							aria-hidden
						>
							<div className="readme-translate-bar h-full w-1/3 rounded-full bg-cyan-400/90" />
						</div>
					</div>
				</div>
			) : null}
			{!busy && translateFailed ? (
				<div
					className="mb-4 rounded-xl border border-amber-500/40 bg-amber-950/40 px-4 py-3 text-sm text-amber-100/95 shadow-[0_0_20px_rgba(245,158,11,0.12)]"
					role="alert"
				>
					<p className="font-medium">{t('readme_translate_failed')}</p>
					<p className="mt-1 text-xs text-amber-200/80">{t('readme_translate_failed_hint')}</p>
				</div>
			) : null}
			<div className="relative min-w-0">
				{busy ? (
					<div
						className="pointer-events-none absolute inset-0 z-[1] rounded-lg bg-black/35 ring-1 ring-inset ring-cyan-500/25"
						aria-hidden
					/>
				) : null}
				<div
					className={cn(
						'prose prose-zinc prose-invert relative transition-[opacity,filter] duration-300',
						busy && 'opacity-[0.42] blur-[0.35px]',
					)}
					style={{ maxWidth: '100%' }}
				>
					<ContentMD markdown={displayMd} />
				</div>
			</div>
		</div>
	)
}
