'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface MenuProps {
	href: string
	children: React.ReactNode
	selected: boolean
	newTab?: boolean
}

export function Menu() {
	const path = usePathname()

	return (
		<nav className="flex flex-wrap items-center justify-center gap-3 sm:justify-start sm:gap-6 md:gap-8">
			<MenuItem href="/" selected={path === '/'}>
				Home
			</MenuItem>
			<MenuItem href="/project" selected={path?.startsWith('/project')}>
				Projects
			</MenuItem>
			<MenuItem href="/contact" selected={path === '/contact'}>
				Contact
			</MenuItem>
		</nav>
	)
}

function MenuItem(props: MenuProps) {
	return (
		<Link
			href={props.href}
			target={props.newTab ? '_blank' : '_self'}
			rel={props.newTab ? 'noopener noreferrer' : undefined}
			className={cn(
				'relative whitespace-nowrap text-xs font-medium text-zinc-400 transition-colors duration-200 hover:text-white sm:text-sm',
				props.selected && 'text-white'
			)}
		>
			<span className="relative">
				{props.children}
				{props.selected && (
					<span
						className="absolute -bottom-1 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/80 to-transparent"
						aria-hidden
					/>
				)}
			</span>
		</Link>
	)
}
