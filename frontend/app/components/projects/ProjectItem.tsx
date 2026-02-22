import { Project } from '@core'
import Image from 'next/image'
import Link from 'next/link'

export interface ProjectItemProps {
	projects: Project
}

export default function ProjectItem(props: ProjectItemProps) {
	return (
		<Link href={`/project/${props.projects.id}`}>
			<div className="relative rounded-2xl overflow-hidden min-w-64 min-h-64 border border-zinc-400">
				{props.projects.name}
				<Image
					src={props.projects.images[0]}
					alt={props.projects.name}
					fill
					objectFit="object-cover"
				/>
			</div>
		</Link>
	)
}
