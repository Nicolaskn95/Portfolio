'use client'

import { useLocale } from '@/app/i18n/LocaleProvider'
import { Technology } from '@core/technology/Technology'
import TechnologiesWorked from './TechnologiesWorked'
import Knowledge from './Knowledge'
import MiniCV from './MiniCV'

interface ResumeProps {
	technologies: Technology[]
	projectCount: number
}

export default function Resume(props: ResumeProps) {
	const { t } = useLocale()

	return (
		<section className="w-full max-w-6xl mx-auto">
			<h2 className="text-2xl font-bold text-foreground mb-6 font-professional tracking-tight">
				{t('resume_title')}
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
				<MiniCV />
				<Knowledge projectCount={props.projectCount} />
				<TechnologiesWorked list={props.technologies} />
			</div>
		</section>
	)
}
