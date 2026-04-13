'use client'

import { useLocale } from '@/app/i18n/LocaleProvider'
import { Message } from '@/app/model/Message'
import ContentMD from '@/app/shared/ContentMD'
import Image from 'next/image'

export interface MessageBalloonProps {
	message: Message
	omitAuthor: boolean
}

function normalizeAuthorLabel(author: string, t: (key: string) => string): string {
	const a = author.trim().toLowerCase()
	if (a === 'visitante' || a === 'visitor') return t('chat_label_visitor')
	if (a === 'assistente virtual' || a === 'virtual assistant') return t('chat_label_assistant')
	return author
}

export function MessageBalloon(props: MessageBalloonProps) {
	const { message, omitAuthor } = props
	return message.side === 'left' ? <LeftBalloon {...props} /> : <RightBalloon {...props} />
}

const bubbleBase =
	'min-w-0 max-w-[90%] overflow-x-auto px-3 py-2 text-sm leading-[1.4] shadow-[0_1px_2px_rgba(0,0,0,0.08)] sm:max-w-[70%] sm:px-4 sm:py-2.5 sm:text-[15px] sm:leading-[1.35]'

function LeftBalloon({ message, omitAuthor }: MessageBalloonProps) {
	const { t } = useLocale()
	const label = normalizeAuthorLabel(message.author, t)

	return (
		<div className="flex w-full min-w-0 max-w-full flex-col items-start gap-1.5 sm:gap-2">
			{!omitAuthor && (
				<Image
					src="/bot.png"
					alt={t('chat_assistant_avatar_alt')}
					width={70}
					height={70}
					className="size-10 shrink-0 sm:size-[70px]"
				/>
			)}
			<div className={`flex min-w-0 flex-col ${omitAuthor ? 'pl-11 sm:pl-16' : ''}`}>
				{!omitAuthor && (
					<span className="text-[10px] text-zinc-500 font-medium ml-2 mb-0.5 sm:ml-3 sm:text-[11px]">
						{label}
					</span>
				)}
				<div
					className={`${bubbleBase} rounded-[14px] rounded-bl-[4px] bg-[#E5E5EA] text-black sm:rounded-[18px]`}
				>
					<ContentMD markdown={message.text} tone="neutral" />
				</div>
			</div>
		</div>
	)
}

function RightBalloon({ message, omitAuthor }: MessageBalloonProps) {
	const { t } = useLocale()
	const label = normalizeAuthorLabel(message.author, t)

	return (
		<div
			className={`mr-0 flex w-full min-w-0 max-w-full flex-col items-end gap-1.5 sm:mr-2 sm:gap-2 ${omitAuthor ? 'pr-0 sm:pr-2' : ''}`}
		>
			{!omitAuthor && (
				<span className="text-[10px] text-zinc-500 font-medium mr-2 mb-0.5 sm:mr-3 sm:text-[11px]">
					{label}
				</span>
			)}
			<div
				className={`${bubbleBase} rounded-[14px] rounded-br-[4px] bg-[#34C759] text-white sm:rounded-[18px]`}
			>
				<ContentMD markdown={message.text} tone="inverse" />
			</div>
		</div>
	)
}
