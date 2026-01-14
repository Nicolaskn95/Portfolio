import { Technology } from '@core/technology/Technology'

interface TechnologiesWorkedProps {
	technologies: Technology[]
}

export default function TechnologiesWorked(props: TechnologiesWorkedProps) {
	return props.technologies ? (
		<div className="flex justify-center items-center p-6 lg:w-72 bg-black border border-zinc-600 rounded-lg">
			<div className="flex justify-center gap-3 flex-wrap">
				{props.technologies.map((tech) => (
					<div key={tech.id}>
						<span className="text-red-500 font-bold">#</span>
						<span>{tech.name}</span>
					</div>
				))}
			</div>
		</div>
	) : null
}
