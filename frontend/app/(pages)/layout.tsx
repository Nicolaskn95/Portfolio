import { ChatButton } from '../components/chat/ChatButton'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div>
			{children}
			<ChatButton />
		</div>
	)
}
