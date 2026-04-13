import { PortfolioIntro } from '../components/landing/PortfolioIntro'
import { Container } from '../shared/Container'
import { getProjects } from '../functions/projects'
import { getTechnologies } from '../functions/technologies'
import { Main } from '../components/landing/Main'
import Projects from '../components/projects/Projects'
import Resume from '../components/resume'

export default async function Home() {
	const technologies = await getTechnologies()
	const projects = await getProjects()
	const projectCount = projects.all.length

	return (
		<div>
			<Main technologies={technologies.highlight} />
			<Container className="py-16 flex flex-col gap-10 items-center">
				<PortfolioIntro projectCount={projectCount} />
				<Projects titleKey="highlights" list={projects.highlight} />
				<Projects titleKey="web" list={projects.web} />
				<Projects titleKey="mobile" list={projects.mobile} />
				{/* <Projects titleKey="highlights" list={projects.game} /> */}
				<Resume technologies={technologies.all ?? []} projectCount={projectCount} />
			</Container>
		</div>
	)
}
