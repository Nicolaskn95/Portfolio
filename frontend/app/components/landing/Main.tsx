import { Header } from '@/app/shared/Header'

export function Main() {
	return (
		<div className=" flex flex-col h-125 bg-[url('/principal.jpg')] bg-cover bg-center">
			<Header />
			<div className="flex-1 flex flex-col justify-center items-center">
				<h1 className="flex gap-3 items-center">
					<span className="w-2 h-2 rounded-full bg-red-500"></span>
					<span className="text-3xl sm:text-5xl font-bold text-center">
						Nicolas Nagano
					</span>
					<span className="w-2 h-2 rounded-full bg-red-500"></span>
				</h1>
				<h2 className="text-zinc-500">Software Developer</h2>
			</div>
		</div>
	)
}
