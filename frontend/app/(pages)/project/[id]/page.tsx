import { Header } from '@/app/shared/Header'

export default async function ProjectPage(props: { params: Promise<{ id: string }> }) {
	const { id } = await props.params
	return (
		<div className="bg-black">
			<Header />
			<div>Detalhes do projeto {id}</div>
		</div>
	)
}
