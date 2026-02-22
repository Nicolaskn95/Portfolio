import { Technology } from '@core/technology/Technology'

interface TechnologiesWorkedProps {
	list: Technology[]
}

export default function TechnologiesWorked(props: TechnologiesWorkedProps) {
	if (!props.list?.length) return null

	return (
		<div className="flex flex-col p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-lg shadow-black/10 transition-shadow hover:shadow-xl hover:shadow-black/15">
			<span className="text-sm font-semibold text-foreground mb-3 font-professional">
				Tecnologias
			</span>
			<div className="flex flex-wrap gap-2 justify-center md:justify-start">
				{props.list.map((tech) => (
					<span
						key={tech.id}
						className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-muted"
					>
						<span className="text-primary/90 mr-1">#</span>
						{tech.name}
					</span>
				))}
			</div>
		</div>
	)
}
