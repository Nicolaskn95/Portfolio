import Readme from '@/app/components/projects/Readme'
import Technologies from '@/app/components/technologies/Technologies'
import { getReadme } from '@/app/functions/github'
import { getProject } from '@/app/functions/projects'
import { Container } from '@/app/shared/Container'
import ContentMD from '@/app/shared/ContentMD'
import { Header } from '@/app/shared/Header'
import { ImagesCarousel } from '@/app/shared/ImagesCarousel'

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params
	const project = await getProject(id)
	if (!project) return null
	const readme = await getReadme(project?.repository)

	return project ? (
		<div className="bg-black">
			<Header />
			<Container className="py-7 flex flex-col items-center gap-10">
				<h1 className="text-3xl font-bold self-start">{project.name}</h1>
				<ImagesCarousel images={project.images.slice(1)} />
				<Technologies list={project.technologies} isSmallSize={true} />
				<Readme markdown={readme} />
			</Container>
		</div>
	) : null
}
