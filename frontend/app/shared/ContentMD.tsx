import Markdown, { type Components } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

export interface ContentMDProps {
	markdown: string
	/** Bordas e links: mensagem do bot (fundo claro) vs visitante (fundo verde). Omitir para páginas (readme, projeto). */
	tone?: 'neutral' | 'inverse'
}

function buildComponents(tone: ContentMDProps['tone']): Partial<Components> {
	const isInverse = tone === 'inverse'
	const cellBorder = isInverse ? 'border-white/25' : 'border-zinc-900/15'
	const linkClass = isInverse
		? 'break-all underline decoration-white/60 underline-offset-2 text-white'
		: 'break-all underline underline-offset-2 text-blue-700'

	return {
		p: ({ children, ...props }) => (
			<p className="mb-2 last:mb-0 break-words" {...props}>
				{children}
			</p>
		),
		a: ({ children, ...props }) => (
			<a className={linkClass} {...props}>
				{children}
			</a>
		),
		ul: ({ children, ...props }) => (
			<ul className="my-2 list-disc pl-5 break-words" {...props}>
				{children}
			</ul>
		),
		ol: ({ children, ...props }) => (
			<ol className="my-2 list-decimal pl-5 break-words" {...props}>
				{children}
			</ol>
		),
		li: ({ children, ...props }) => (
			<li className="break-words" {...props}>
				{children}
			</li>
		),
		table: ({ children, ...props }) => (
			<div className="my-2 w-full min-w-0 max-w-full overflow-x-auto">
				<table
					className="w-full min-w-0 max-w-full table-fixed border-collapse text-left text-xs sm:text-sm"
					{...props}
				>
					{children}
				</table>
			</div>
		),
		thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
		tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
		tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
		th: ({ children, ...props }) => (
			<th
				className={`border ${cellBorder} px-1.5 py-1 align-top text-[0.7rem] font-semibold leading-snug break-words sm:px-2 sm:text-xs`}
				{...props}
			>
				{children}
			</th>
		),
		td: ({ children, ...props }) => (
			<td
				className={`border ${cellBorder} px-1.5 py-1 align-top text-[0.7rem] leading-snug break-words sm:px-2 sm:text-sm`}
				{...props}
			>
				{children}
			</td>
		),
		code: ({ className, children, ...props }) => {
			const isBlock = Boolean(className?.includes('language-'))
			if (isBlock) {
				return (
					<code
						className={`my-2 block w-full min-w-0 max-w-full overflow-x-auto rounded-md px-2 py-1.5 text-[0.75rem] sm:text-sm ${
							isInverse ? 'bg-black/20' : 'bg-black/5'
						}`}
						{...props}
					>
						{children}
					</code>
				)
			}
			return (
				<code
					className={`rounded px-0.5 text-[0.85em] ${isInverse ? 'bg-black/25' : 'bg-black/10'}`}
					{...props}
				>
					{children}
				</code>
			)
		},
		pre: ({ children, ...props }) => (
			<pre className="my-2 w-full min-w-0 max-w-full overflow-x-auto rounded-md" {...props}>
				{children}
			</pre>
		),
	}
}

export default function ContentMD({ markdown, tone }: ContentMDProps) {
	const components = buildComponents(tone)
	return (
		<div className="min-w-0 max-w-full">
			<Markdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw]}
				skipHtml={false}
				components={components}
			>
				{markdown}
			</Markdown>
		</div>
	)
}
