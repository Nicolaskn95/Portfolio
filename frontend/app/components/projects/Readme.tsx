import ContentMD from '@/app/shared/ContentMD'

export interface ReadmeProps {
	markdown: string
}

export default function Readme({ markdown }: ReadmeProps) {
	return (
		<div className="flex flex-col items-stretch border p-6 bg-black border-zinc-800 rounded-2xl">
			<div className="prose prose-zinc prose-invert" style={{ maxWidth: '100%' }}>
				<ContentMD markdown={markdown} />
			</div>
		</div>
	)
}
