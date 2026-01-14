import { Main } from '../components/landing/Main'
import Resume from '../components/resume'
import { getTechnologies } from '../functions/technologies'
import { Container } from '../shared/Container'

export default async function Home() {
	const technologies = await getTechnologies()

	return (
		<div>
			<Main />
			<Container className="py-16">
				<Resume technologies={technologies.all} />
			</Container>
		</div>
	)
}
