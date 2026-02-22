import path from 'path'

const nextConfig = {
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
