import { Header } from '@/app/shared/Header'
import { Container } from '@/app/shared/Container'
import Link from 'next/link'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'

export default function ContactPage() {
	return (
		<div className="relative min-h-screen bg-neutral-950 text-zinc-100 overflow-hidden">
			<ShootingStars />
			<StarsBackground />
			<Header />
			<Container className="relative z-10 py-16 flex flex-col items-center gap-12">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-4">Contato</h1>
					<p className="text-zinc-400 max-w-md">
						Fique à vontade para se conectar comigo através das plataformas abaixo.
					</p>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
					<ContactCard
						href="https://www.linkedin.com/in/nicolas-katsuji-nagano-90ba48223/"
						title="LinkedIn"
						description="Conecte-se comigo profissionalmente"
						icon={<LinkedInIcon />}
					/>
					<ContactCard
						href="https://github.com/Nicolaskn95"
						title="GitHub"
						description="Confira meus repositórios"
						icon={<GitHubIcon />}
					/>
				</div>
			</Container>
		</div>
	)
}

interface ContactCardProps {
	href: string
	title: string
	description: string
	icon: React.ReactNode
}

function ContactCard({ href, title, description, icon }: ContactCardProps) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex flex-col items-center gap-4 p-8 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-800/50 hover:scale-105"
		>
			<div className="text-zinc-400 group-hover:text-white transition-colors duration-300">
				{icon}
			</div>
			<div className="text-center">
				<h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
				<p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors duration-300">
					{description}
				</p>
			</div>
		</Link>
	)
}

function LinkedInIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
		</svg>
	)
}

function GitHubIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
		</svg>
	)
}
