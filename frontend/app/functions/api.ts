const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

export async function httpGet<T>(url: string): Promise<T | null> {
	try {
		const response = await fetch(normalizeUrl(`${baseURL}/${url}`))
		return response.json()
	} catch (error) {
		if (process.env.NODE_ENV !== 'production') {
			console.error('Error in httpGet:', error)
		}
		return null
	}
}

function normalizeUrl(url: string) {
	const protocol = url.split('://')[0]
	const path = url.split('://')[1]
	return `${protocol}://${path.replaceAll(/\/{2,}/g, '/')}`
}
