'use client'

import { useLocale } from '@/app/i18n/LocaleProvider'

export function PortfolioIntro(props: { projectCount: number }) {
	const { t } = useLocale()
	const n = props.projectCount
	const copy =
		n === 0 ? t('home_projects_0') : n === 1 ? t('home_projects_1') : t('home_projects_n', { count: n })

	return (
		<p
			className="w-7/10 text-sm text-zinc-400 md:w-11/12 xl:w-full sm:text-left"
			aria-live="polite"
		>
			{copy}
		</p>
	)
}
