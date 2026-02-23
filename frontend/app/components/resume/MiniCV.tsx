import Image from 'next/image'

export default function MiniCV() {
	return (
		<div className="flex flex-col sm:flex-row gap-5 p-4 sm:p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-lg shadow-black/10 transition-shadow hover:shadow-xl hover:shadow-black/15">
			<div className="relative mx-auto w-full max-w-[200px] shrink-0 overflow-hidden rounded-xl bg-muted aspect-3/4 sm:mx-0 sm:h-48 sm:max-w-none sm:w-36 sm:aspect-auto md:h-52 md:w-40">
				<Image
					src="/rosto.jpg"
					alt="Nicolas Nagano"
					fill
					className="object-cover object-top"
					sizes="(max-width: 640px) 200px, (max-width: 768px) 9rem, 10rem"
				/>
			</div>
			<div className="flex flex-col justify-center gap-3 min-w-0">
				<div className="flex flex-col gap-0.5">
					<span className="text-lg font-semibold text-foreground font-professional tracking-tight">
						Nicolas Katsuji Nagano
					</span>
					<span className="text-sm text-muted-foreground font-medium">
						Software Developer
					</span>
				</div>
				<p className="text-sm text-muted-foreground leading-relaxed">
					Cristão, marido e pai. Como desenvolvedor, busco a excelência em meu trabalho
					como forma de honrar e servir ao Senhor Jesus Cristo.
				</p>
			</div>
		</div>
	)
}
