import { Container } from './Container'
import Link from 'next/link'
import { Menu } from './Menu'

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
			<Container className="flex h-16 items-center justify-between gap-6">
				<Link
					href="/"
					className="shrink-0 font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
					aria-label="Início"
				>
					NN
				</Link>
				<nav className="flex flex-1 items-center justify-center sm:justify-start">
					<Menu />
				</nav>
				<div className="hidden shrink-0 items-center sm:flex">
					<Link
						href="https://www.linkedin.com/in/nicolas-katsuji-nagano-90ba48223/"
						target="_blank"
						rel="noopener noreferrer"
						className="group relative inline-flex h-9 items-center justify-center rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
					>
						<span className="relative z-10">Perfil</span>
					</Link>
				</div>
			</Container>
		</header>
	)
}
