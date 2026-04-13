/** Base da API Nest. Em produção use a URL pública (https://...) ou `/portfolio-api` com BACKEND_URL no next.config. */
function resolveApiBase(): string {
	const raw = (process.env.NEXT_PUBLIC_API_URL ?? '').trim()
	if (!raw) return 'http://localhost:4000'
	return raw.replace(/\/$/, '')
}

const baseURL = resolveApiBase()

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
			const errBody = await response.text().catch(() => '')
			console.warn(
				`[api] POST ${url} failed:`,
				response.status,
				errBody.slice(0, 200),
			)
			return null
		}
		return (await response.json()) as T
	} catch (error) {
		console.warn('[api] POST error:', url, error)
		return null
	}
}

function normalizeUrl(url: string): string {
	if (url.startsWith('/')) {
		return url.replaceAll(/\/{2,}/g, '/')
	}
	const parts = url.split('://')
	if (parts.length < 2) return url.replaceAll(/\/{2,}/g, '/')
	const protocol = parts[0]
	const rest = parts.slice(1).join('://')
	return `${protocol}://${rest.replaceAll(/\/{2,}/g, '/')}`
}
