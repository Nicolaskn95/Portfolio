import { Container } from './Container'
import Link from 'next/link'
import { Menu } from './Menu'

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
			<Container className="flex h-14 min-w-0 items-center justify-between gap-3 sm:h-16 sm:gap-6">
				<Link
					href="/"
					className="shrink-0 text-sm font-semibold tracking-tight text-white transition-opacity hover:opacity-90 sm:text-base"
					aria-label="Início"
				>
					NN
				</Link>
				<nav className="flex min-w-0 flex-1 items-center justify-center sm:justify-start sm:overflow-visible">
					<Menu />
				</nav>
				<div className="flex shrink-0 items-center">
					<Link
						href="https://www.linkedin.com/in/nicolas-katsuji-nagano-90ba48223/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex h-8 items-center justify-center rounded-full border border-white/20 bg-white/5 px-3 text-xs font-medium text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 sm:h-9 sm:px-4 sm:text-sm"
					>
						<span className="relative z-10">Perfil</span>
					</Link>
				</div>
			</Container>
		</header>
	)
}
