'use client'

import { useLocale } from '@/app/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

export function LanguageToggle() {
	const { locale, setLocale, t } = useLocale()

	return (
		<div
			className="inline-flex items-center rounded-full border border-white/20 bg-white/5 p-0.5"
			role="group"
			aria-label={t('lang_switch_aria')}
		>
			<button
				type="button"
				onClick={() => setLocale('pt')}
				className={cn(
					'rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 sm:text-sm',
					locale === 'pt'
						? 'bg-white/15 text-white'
						: 'text-zinc-400 hover:text-white',
				)}
				aria-pressed={locale === 'pt'}
			>
				{t('lang_pt')}
			</button>
			<button
				type="button"
				onClick={() => setLocale('en')}
				className={cn(
					'rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 sm:text-sm',
					locale === 'en'
						? 'bg-white/15 text-white'
						: 'text-zinc-400 hover:text-white',
				)}
				aria-pressed={locale === 'en'}
			>
				{t('lang_en')}
			</button>
		</div>
	)
}
