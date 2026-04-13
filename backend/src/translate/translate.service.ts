import { Injectable, Logger } from '@nestjs/common'

/** Caminho da API Lingva: texto no segmento final (encodeURIComponent). Chunks pequenos evitam 414 em proxies. */
const CHUNK_SIZE = 180
const CHUNK_DELAY_MS = 100
const LINGVA_FETCH_TIMEOUT_MS = 25_000
const LINGVA_RETRIES_PER_HOST = 2
const LINGVA_RETRY_DELAY_MS = 400

export type SourceLang = 'pt' | 'en' | 'auto'
export type TargetLang = 'pt' | 'en'

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function chunkText(text: string, size: number): string[] {
	if (!text) return []
	const chunks: string[] = []
	for (let i = 0; i < text.length; i += size) {
		chunks.push(text.slice(i, i + size))
	}
	return chunks
}

function lingvaBaseUrls(): string[] {
	const fromEnv = process.env.LINGVA_BASE_URLS?.split(/[,;\s]+/)
		.map((s) => s.trim().replace(/\/$/, ''))
		.filter((s) => s.length > 0)
	if (fromEnv?.length) return fromEnv
	const single = process.env.LINGVA_BASE_URL?.trim().replace(/\/$/, '')
	if (single) return [single]
	/** Público; em produção defina LINGVA_BASE_URLS com mirrors adicionais se este bloquear o IP do host. */
	return ['https://lingva.ml']
}

async function fetchWithTimeout(
	url: string,
	init: RequestInit & { timeoutMs?: number } = {},
): Promise<Response> {
	const { timeoutMs = LINGVA_FETCH_TIMEOUT_MS, ...rest } = init
	const controller = new AbortController()
	const t = setTimeout(() => controller.abort(), timeoutMs)
	try {
		return await fetch(url, {
			...rest,
			signal: controller.signal,
			headers: {
				Accept: 'application/json',
				'User-Agent': 'PortfolioTranslate/1.0 (+https://github.com/)',
				...rest.headers,
			},
		})
	} finally {
		clearTimeout(t)
	}
}

@Injectable()
export class TranslateService {
	private readonly logger = new Logger(TranslateService.name)

	async translatePlain(text: string, source: SourceLang, target: TargetLang): Promise<string> {
		const trimmed = text.trim()
		if (!trimmed) return text
		if (source !== 'auto' && source === target) return text

		const parts = chunkText(text, CHUNK_SIZE)
		const out: string[] = []

		for (let i = 0; i < parts.length; i++) {
			const piece = parts[i]
			let translated: string | null = null
			try {
				translated = await this.fetchLingvaWithMirrors(piece, source, target)
			} catch (e) {
				const msg = e instanceof Error ? e.message : String(e)
				this.logger.warn(`Lingva (todos os hosts) falhou no bloco ${i + 1}/${parts.length}: ${msg}`)
			}
			if (translated === null) {
				try {
					out.push(await this.fetchMyMemoryFallback(piece, source, target))
				} catch (e2) {
					const msg2 = e2 instanceof Error ? e2.message : String(e2)
					this.logger.warn(`MyMemory fallback falhou: ${msg2}`)
					out.push(piece)
				}
			} else {
				out.push(translated)
			}
			if (i < parts.length - 1) await sleep(CHUNK_DELAY_MS)
		}

		return out.join('')
	}

	private lingvaSourceCode(source: SourceLang): string {
		return source === 'auto' ? 'auto' : source
	}

	private async fetchLingvaWithMirrors(
		q: string,
		source: SourceLang,
		target: TargetLang,
	): Promise<string | null> {
		const src = this.lingvaSourceCode(source)
		const encoded = encodeURIComponent(q)
		const bases = lingvaBaseUrls()

		for (const base of bases) {
			const url = `${base}/api/v1/${src}/${target}/${encoded}`
			for (let attempt = 1; attempt <= LINGVA_RETRIES_PER_HOST; attempt++) {
				try {
					const res = await fetchWithTimeout(url, { method: 'GET' })
					if (!res.ok) {
						throw new Error(`HTTP ${res.status}`)
					}
					const data = (await res.json()) as { translation?: string }
					if (typeof data.translation !== 'string') {
						throw new Error('Resposta Lingva inválida')
					}
					return data.translation
				} catch (e) {
					const msg = e instanceof Error ? e.message : String(e)
					this.logger.debug(
						`Lingva ${base} tentativa ${attempt}/${LINGVA_RETRIES_PER_HOST}: ${msg}`,
					)
					if (attempt < LINGVA_RETRIES_PER_HOST) await sleep(LINGVA_RETRY_DELAY_MS)
				}
			}
		}

		return null
	}

	/** MyMemory não suporta origem "aut"; quando source é auto, assume pt↔en conforme o alvo. */
	private async fetchMyMemoryFallback(
		q: string,
		source: SourceLang,
		target: TargetLang,
	): Promise<string> {
		let langpair: string
		if (source === 'auto') {
			langpair = target === 'en' ? 'pt|en' : 'en|pt'
		} else {
			langpair = `${source}|${target}`
		}

		const url = new URL('https://api.mymemory.translated.net/get')
		url.searchParams.set('q', q)
		url.searchParams.set('langpair', langpair)

		const res = await fetchWithTimeout(url.toString(), {
			method: 'GET',
			timeoutMs: 20_000,
		})
		if (!res.ok) {
			throw new Error(`MyMemory HTTP ${res.status}`)
		}

		const data = (await res.json()) as {
			responseStatus?: number
			responseData?: { translatedText?: string }
		}

		const status = data.responseStatus
		if (typeof status === 'number' && status !== 200) {
			throw new Error(`MyMemory status ${status}`)
		}

		const translated = data.responseData?.translatedText
		if (typeof translated !== 'string') {
			throw new Error('MyMemory: texto ausente')
		}

		return translated
	}
}
