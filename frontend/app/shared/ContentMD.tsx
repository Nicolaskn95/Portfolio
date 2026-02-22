import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export interface ContentMDProps {
	markdown: string
}

export default function ContentMD({ markdown }: ContentMDProps) {
	return (
		<Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} skipHtml={false}>
			{markdown}
		</Markdown>
	)
}
