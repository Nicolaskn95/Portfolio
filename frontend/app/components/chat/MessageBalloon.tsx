import { Message } from '@/app/model/Message'
import ContentMD from '@/app/shared/ContentMD'
import Image from 'next/image'

export interface MessageBalloonProps {
	message: Message
	omitAuthor: boolean
}

export function MessageBalloon(props: MessageBalloonProps) {
	const { message, omitAuthor } = props
	return message.side === 'left' ? <LeftBalloon {...props} /> : <RightBalloon {...props} />
}

const bubbleBase =
	'px-4 py-2.5 max-w-[85%] sm:max-w-[70%] text-[15px] leading-[1.35] shadow-[0_1px_2px_rgba(0,0,0,0.08)]'

function LeftBalloon({ message, omitAuthor }: MessageBalloonProps) {
	return (
		<div className="flex flex-col gap-2 items-start">
			{!omitAuthor && <Image src="/assistant.svg" alt="Assistant" width={40} height={40} />}
			<div className={`flex flex-col ${omitAuthor && 'pl-16'}`}>
				{!omitAuthor && (
					<span className="text-[11px] text-zinc-500 font-medium ml-3 mb-0.5">
						{message.author}
					</span>
				)}
				<div
					className={`${bubbleBase} rounded-[18px] rounded-bl-[4px] bg-[#E5E5EA] text-black`}
				>
					<ContentMD markdown={message.text} />
				</div>
			</div>
		</div>
	)
}

function RightBalloon({ message, omitAuthor }: MessageBalloonProps) {
	return (
		<div className={`flex gap-2 flex-col mr-2 items-end ${omitAuthor && 'pr-2'}`}>
			{!omitAuthor && (
				<span className="text-[11px] text-zinc-500 font-medium mr-3 mb-0.5">
					{message.author}
				</span>
			)}
			<div
				className={`${bubbleBase} rounded-[18px] rounded-br-[4px] bg-[#34C759] text-white`}
			>
				<ContentMD markdown={message.text} />
			</div>
		</div>
	)
}
