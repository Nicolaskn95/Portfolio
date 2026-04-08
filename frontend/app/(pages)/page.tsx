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
	console.log(projectCount)

	return (
		<div>
			<Main technologies={technologies.highlight} />
			<Container className="py-16 flex flex-col gap-10 items-center">
				<p
					className="w-7/10 text-sm text-zinc-400 md:w-11/12 xl:w-full sm:text-left"
					aria-live="polite"
				>
					{projectCount === 0
						? 'Nenhum projeto cadastrado no portfólio.'
						: projectCount === 1
							? '1 projeto cadastrado no portfólio.'
							: `${projectCount} projetos cadastrados no portfólio.`}
				</p>
				<Projects title="Destaques" list={projects.highlight} />
				<Projects title="Web" list={projects.web} />
				<Projects title="Mobile" list={projects.mobile} />
				{/* <Projects title="Jogos" list={projects.game} /> */}
				<Resume technologies={technologies.all ?? []} />
			</Container>
		</div>
	)
}
