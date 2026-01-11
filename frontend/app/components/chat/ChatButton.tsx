import Image from 'next/image'

export function ChatButton() {
	return (
		<div className="fixed bottom-5 right-5 cursor-pointer">
			<Image src="/chat.svg" alt="Chat Icon" width={50} height={50} />
		</div>
	)
}
