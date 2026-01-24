import { Technology } from '@core/technology/Technology'
import Image from 'next/image'

interface TechnologiesProps {
	list?: Technology[]
	isSmallSize?: boolean
}

export default function Technologies(props: TechnologiesProps) {
	return props.list ? (
		<div className="flex justify-center gap-4 flex-wrap ">
			{props.list.map((tech) => (
				<div key={tech.id} className="flex flex-col items-center gap-1">
					<span
						className={`relative h-11 w-11 rounded-xl overflow-hidden ${!props.isSmallSize && 'sm:h-16 sm:w-16'}`}
					>
						<Image src={tech.image} alt={tech.name} fill />
					</span>
					<span className="text-[10px] text-zinc-500">{tech.name}</span>
				</div>
			))}
		</div>
	) : null
}
