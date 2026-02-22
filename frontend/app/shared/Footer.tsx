import Image from 'next/image'

export function Footer() {
	return (
		<footer className="mt-auto bg-card/40 py-6">
			<div className="mx-auto max-w-3xl px-6 text-center flex flex-col items-center gap-4">
				<div className="relative h-12 w-full max-w-[850px] sm:h-16 sm:max-w-[850px]">
					<Image
						src="/logo_nicolas3.png"
						alt="Nicolas Nagano"
						fill
						className="invert object-contain"
						priority
						sizes="(max-width: 640px) 880px, 850px"
					/>
				</div>

				<blockquote className="text-xs sm:text-sm md:text-base text-muted-foreground italic leading-relaxed max-w-md">
					&quot;Consagre ao Senhor tudo o que você faz, e os seus planos serão
					bem-sucedidos.&quot; — Provérbios 16:3
				</blockquote>
			</div>
		</footer>
	)
}
