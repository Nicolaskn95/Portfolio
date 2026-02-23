'use client'

import { Container } from './Container'
import Link from 'next/link'
import { Menu } from './Menu'

const HEADER_STARS = [
	{ left: '8%', top: '30%', delay: '0s', duration: '2.5s' },
	{ left: '22%', top: '60%', delay: '0.4s', duration: '3s' },
	{ left: '45%', top: '25%', delay: '1s', duration: '2.2s' },
	{ left: '55%', top: '70%', delay: '0.2s', duration: '2.8s' },
	{ left: '72%', top: '40%', delay: '0.7s', duration: '3.2s' },
	{ left: '88%', top: '55%', delay: '0.5s', duration: '2.6s' },
	{ left: '15%', top: '75%', delay: '1.2s', duration: '2.4s' },
	{ left: '38%', top: '50%', delay: '0.9s', duration: '2.9s' },
	{ left: '65%', top: '20%', delay: '0.3s', duration: '3.1s' },
	{ left: '92%', top: '35%', delay: '1.1s', duration: '2.3s' },
] as const

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full overflow-hidden border-b border-white/10 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
			{/* Camada espacial: estrelas e brilho */}
			<div
				className="pointer-events-none absolute inset-0 z-0"
				aria-hidden
			>
				{/* Gradiente sutil de nebulosa */}
				<div
					className="absolute inset-0 bg-linear-to-b from-white/6 via-transparent to-white/4 opacity-60"
					style={{ animation: 'header-space-shimmer 8s ease-in-out infinite' }}
				/>
				{/* Estrelas cintilantes */}
				{HEADER_STARS.map((star, i) => (
					<span
						key={i}
						className="absolute size-1 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.6)]"
						style={{
							left: star.left,
							top: star.top,
							animation: `header-star-twinkle ${star.duration} ease-in-out infinite`,
							animationDelay: star.delay,
						}}
					/>
				))}
			</div>
			<Container className="relative z-10 flex h-14 min-w-0 items-center justify-between gap-3 sm:h-16 sm:gap-6">
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
