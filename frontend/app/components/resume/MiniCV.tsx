import Image from 'next/image'

export default function MiniCV() {
	return (
		<div className="flex">
			<div className="relative min-w-64 h-60">
				<Image src="/my-image.png" alt="Mini CV" width={300} height={400} />
			</div>
			<div className="flex flex-col gap-5 self-center py-6">
				<div className="flex flex-col">
					<span>Nicolas Katsuji Nagano</span>
					<span>Software Developer</span>
				</div>
				<p>
					Passionate software developer with experience in building web and mobile
					applications.
				</p>
			</div>
		</div>
	)
}
