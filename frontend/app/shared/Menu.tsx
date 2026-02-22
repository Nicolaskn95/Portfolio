'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MenuProps {
	href: string
	children: React.ReactNode
	selected: boolean
	newTab?: boolean
}

export function Menu() {
	const path = usePathname()

	return (
		<nav className="flex gap-6">
			<MenuItem href="/" selected={path === '/'}>
				Home
			</MenuItem>
			<MenuItem href="/project/1" selected={path?.startsWith('/project')}>
				Projects
			</MenuItem>
			<MenuItem
				href="https://api.whatsapp.com/send/?phone:5515991663664&text&type=phone_number"
				selected={false}
				newTab={true}
			>
				Contact
			</MenuItem>
		</nav>
	)
}

function MenuItem(props: MenuProps) {
	return (
		<Link href={props.href} target={props.newTab ? '_blank' : '_self'}>
			<span
				className={`flex items-center gap-2 text-sm border-red-600 hover:text-white ${
					props.selected ? 'border-b-4 text-white' : 'text-zinc-300'
				}`}
			>
				{props.children}
			</span>
		</Link>
	)
}
