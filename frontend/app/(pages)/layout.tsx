import { ChatButton } from '../components/chat/ChatButton'
import { Footer } from '../shared/Footer'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="flex min-h-screen flex-col">
			{children}
			<Footer />
			<ChatButton />
		</div>
	)
}
