'use client'

import { Header } from '@/app/shared/Header'
import { Technology } from '@core/technology/Technology'
import Technologies from '../technologies/Technologies'
import Image from 'next/image'
import { TypingText } from './TypingText'
import { ShootingStars } from '@/components/ui/shooting-stars'
import { StarsBackground } from '@/components/ui/stars-background'

interface MainProps {
	technologies: Technology[]
}

export function Main(props: MainProps) {
	return (
		<section className="relative flex min-h-screen flex-col bg-neutral-950 text-zinc-100 overflow-hidden">
			<ShootingStars />
			<StarsBackground />
			<Header />
			<div className="relative z-10 flex flex-1 flex-col justify-center items-center px-4 py-12 sm:py-16">
				<div className="flex flex-col gap-8 items-center justify-center max-w-4xl mx-auto w-full">
					<div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
						<div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 ring-1 ring-zinc-700/50 shadow-xl">
							<Image
								src="/rosto.png"
								alt="Nicolas Nagano"
								fill
								className="object-cover"
								priority
								sizes="(max-width: 640px) 144px, 176px"
							/>
						</div>
						<div className="flex flex-col items-center justify-center gap-3 shrink-0 w-full max-w-[min(92vw,280px)]">
							<div className="text-center font-professional text-zinc-100">
								<p className="text-xl sm:text-2xl font-semibold tracking-tight">
									Nicolas Nagano
								</p>
								<p className="text-sm sm:text-base font-medium tracking-[0.2em] uppercase text-zinc-400 mt-0.5">
									Software Developer
								</p>
							</div>
						</div>
					</div>
					<div className="w-full max-w-xl">
						<TypingText />
					</div>
					<Technologies list={props.technologies} />
				</div>
			</div>
		</section>
	)
}
