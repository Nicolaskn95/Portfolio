import Image from 'next/image'
import { Container } from './Container'
import Link from 'next/link'
import { Menu } from './Menu'

export function Header() {
	return (
		<header className=" flex items-center h-16 bg-black/50">
			<Container className="flex-1 flex justify-center sm:justify-between items-center">
				<div className="flex flex-row items-center gap-10">
					<Link href="/" className="hidden sm:block">
						<Image
							src="/logo_nicolas3.png"
							alt="Logo"
							width={200}
							height={200}
							className="invert"
						/>
					</Link>
					<Menu />
				</div>
				<div className="hidden sm:flex items-center">
					<Link
						href="https://www.linkedin.com/in/nicolas-katsuji-nagano-90ba48223/"
						className="bg-white rounded-full px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100"
						target="_blank"
						rel="noopener noreferrer"
					>
						Perfil
					</Link>
				</div>
			</Container>
		</header>
	)
}
