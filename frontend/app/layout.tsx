import type { Metadata } from 'next'
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
	title: 'Portfolio Nicolas Nagano',
	description: 'Portfolio website of Nicolas Nagano',
}

const font = Montserrat({
	subsets: ['latin'],
	variable: '--font-geist-sans',
	weight: ['400', '700'],
})

const fontProfessional = Plus_Jakarta_Sans({
	subsets: ['latin'],
	variable: '--font-professional',
	weight: ['400', '500', '600', '700'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${font.className} ${fontProfessional.variable} antialiased`}>
				{children}
			</body>
		</html>
	)
}
