import Image from 'next/image'

export default function MiniCV() {
	return (
		<div className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl border border-border bg-card/80 backdrop-blur-sm shadow-lg shadow-black/10 transition-shadow hover:shadow-xl hover:shadow-black/15">
			<div className="relative w-full sm:w-40 h-52 sm:h-52 shrink-0 rounded-xl overflow-hidden bg-muted">
				<Image
					src="/rosto.jpg"
					alt="Nicolas Nagano"
					fill
					className="object-cover"
					sizes="(max-width: 640px) 100vw, 10rem"
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
