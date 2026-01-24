import { Project } from '@core'
import ProjectItem from './ProjectItem'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

export interface ProjectProps {
	list: Project[]
	title: string
}

export default function Projects(props: ProjectProps) {
	return (
		<div className="items-center sm:items-start w-7/10 md:w-11/12 xl:w-full gap-5">
			<h3 className="text-2xl font-bold text-white/70">{props.title}</h3>
			<Carousel opts={{ align: 'center', loop: true }}>
				<CarouselContent className="flex">
					{props.list.map((project) => (
						<CarouselItem
							key={project.id}
							className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
						>
							<div key={project.id}>
								<ProjectItem key={project.id} projects={project} />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}
