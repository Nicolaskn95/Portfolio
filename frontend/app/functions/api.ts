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

export async function httpPost<T>(url: string, body: unknown): Promise<T | null> {
	try {
		const response = await fetch(normalizeUrl(`${baseURL}/${url}`), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		})
		if (!response.ok) {
			if (process.env.NODE_ENV !== 'production') {
				console.error('httpPost failed:', response.status, await response.text())
			}
			return null
		}
		return (await response.json()) as T
	} catch (error) {
		if (process.env.NODE_ENV !== 'production') {
			console.error('Error in httpPost:', error)
		}
		return null
	}
}

function normalizeUrl(url: string) {
	const protocol = url.split('://')[0]
	const path = url.split('://')[1]
	return `${protocol}://${path.replaceAll(/\/{2,}/g, '/')}`
}
