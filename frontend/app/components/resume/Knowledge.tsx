'use client'

import { useLocale } from '@/app/i18n/LocaleProvider'

export default function Knowledge(props: { projectCount: number }) {
	const { t } = useLocale()

	return (
		<div className="flex flex-row md:flex-col gap-6 p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-lg shadow-black/10 transition-shadow hover:shadow-xl hover:shadow-black/15">
			<Item main={props.projectCount.toString()} label={t('resume_knowledge_projects')} />
			<div
				className="w-px md:w-full md:h-px self-stretch md:self-auto bg-border shrink-0"
				aria-hidden
			/>
			<Item main="+2" label={t('resume_knowledge_years')} />
		</div>
	)
}

function Item(props: { main: string; label: string }) {
	return (
		<div className="flex flex-1 flex-col items-center justify-center gap-1 text-center">
			<span className="text-3xl font-bold tabular-nums text-primary font-professional tracking-tight">
				{props.main}
			</span>
			<span className="text-sm text-muted-foreground">{props.label}</span>
		</div>
	)
}
