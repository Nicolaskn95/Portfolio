import type { Metadata } from 'next'
import { Geist, Geist_Mono, Montserrat } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
	title: 'Profolio Nagano',
	description: 'Portfolio website of Nagano',
}

const font = Montserrat({
	subsets: ['latin'],
	variable: '--font-geist-sans',
	weight: ['400', '700'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${font.className} antialiased`}>{children}</body>
		</html>
	)
}
