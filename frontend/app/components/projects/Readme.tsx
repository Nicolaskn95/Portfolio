'use client'

import ContentMD from '@/app/shared/ContentMD'
import { useLocale } from '@/app/i18n/LocaleProvider'
import { translatePlain } from '@/app/functions/translate'
import { useEffect, useState } from 'react'

export interface ReadmeProps {
	markdown: string
}

export default function Readme({ markdown }: ReadmeProps) {
	const { locale, t } = useLocale()
	const [displayMd, setDisplayMd] = useState(markdown)
	const [busy, setBusy] = useState(false)

	useEffect(() => {
		setDisplayMd(markdown)
	}, [markdown])

	useEffect(() => {
		if (locale !== 'en') {
			setDisplayMd(markdown)
			setBusy(false)
			return
		}

		let cancelled = false
		setBusy(true)

		;(async () => {
			const out = await translatePlain(markdown, 'pt', 'en')
			if (cancelled) return
			setDisplayMd(out ?? markdown)
			setBusy(false)
		})()

		return () => {
			cancelled = true
		}
	}, [locale, markdown])

	return (
		<div className="flex flex-col items-stretch border p-6 bg-black border-zinc-800 rounded-2xl">
			{busy ? (
				<p className="mb-3 text-sm text-zinc-500" aria-live="polite">
					{t('readme_translating')}
				</p>
			) : null}
			<div className="prose prose-zinc prose-invert" style={{ maxWidth: '100%' }}>
				<ContentMD markdown={displayMd} />
			</div>
		</div>
	)
}
