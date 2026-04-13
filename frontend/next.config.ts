import path from 'path'

/** Se definido no build (ex.: Vercel), o front pode usar NEXT_PUBLIC_API_URL=/portfolio-api e evitar CORS. */
const backendUrl = process.env.BACKEND_URL?.trim()

const nextConfig = {
	async rewrites() {
		if (!backendUrl) return []
		const dest = backendUrl.replace(/\/$/, '')
		return [
			{
				source: '/portfolio-api/:path*',
				destination: `${dest}/:path*`,
			},
		]
	},
	turbopack: {
		root: path.resolve(__dirname, '..'),
		resolveAlias: {
			'@core': '../core/src',
			'@core/*': '../core/src/*',
		},
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
}

export default nextConfig
