import { Injectable, Logger } from '@nestjs/common'

/** Caminho da API Lingva: texto no segmento final (encodeURIComponent). Chunks pequenos evitam 414 em proxies. */
const CHUNK_SIZE = 180
const CHUNK_DELAY_MS = 100

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
			try {
				const translated = await this.fetchLingva(piece, source, target)
				out.push(translated)
			} catch (e) {
				const msg = e instanceof Error ? e.message : String(e)
				this.logger.warn(`Lingva falhou no bloco ${i + 1}/${parts.length}: ${msg}`)
				try {
					out.push(await this.fetchMyMemoryFallback(piece, source, target))
				} catch (e2) {
					const msg2 = e2 instanceof Error ? e2.message : String(e2)
					this.logger.warn(`MyMemory fallback falhou: ${msg2}`)
					out.push(piece)
				}
			}
			if (i < parts.length - 1) await sleep(CHUNK_DELAY_MS)
		}

		return out.join('')
	}

	private lingvaSourceCode(source: SourceLang): string {
		return source === 'auto' ? 'auto' : source
	}

	private async fetchLingva(q: string, source: SourceLang, target: TargetLang): Promise<string> {
		const src = this.lingvaSourceCode(source)
		const encoded = encodeURIComponent(q)
		const url = `https://lingva.ml/api/v1/${src}/${target}/${encoded}`
		const res = await fetch(url, { method: 'GET' })
		if (!res.ok) {
			throw new Error(`Lingva HTTP ${res.status}`)
		}
		const data = (await res.json()) as { translation?: string }
		if (typeof data.translation !== 'string') {
			throw new Error('Resposta Lingva inválida')
		}
		return data.translation
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

		const res = await fetch(url.toString(), { method: 'GET' })
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
