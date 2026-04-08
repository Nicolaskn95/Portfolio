import { getProjects } from '@/app/functions/projects'

export default async function Knowledge() {
	const projects = await getProjects()
	const projectCount = projects.all.length

	return (
		<div className="flex flex-row md:flex-col gap-6 p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-lg shadow-black/10 transition-shadow hover:shadow-xl hover:shadow-black/15">
			<Item main={projectCount.toString()} label="Projetos criados" />
			<div
				className="w-px md:w-full md:h-px self-stretch md:self-auto bg-border shrink-0"
				aria-hidden
			/>
			<Item main="+2" label="anos de experiência" />
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
