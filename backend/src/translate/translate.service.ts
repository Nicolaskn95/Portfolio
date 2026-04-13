import { Injectable, Logger } from '@nestjs/common'

const CHUNK_SIZE = 420
const CHUNK_DELAY_MS = 120

type LangCode = 'pt' | 'en'

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

	async translatePlain(text: string, source: LangCode, target: LangCode): Promise<string> {
		const trimmed = text.trim()
		if (!trimmed) return text
		if (source === target) return text

		const langpair = `${source}|${target}`
		const parts = chunkText(text, CHUNK_SIZE)
		const out: string[] = []

		for (let i = 0; i < parts.length; i++) {
			const piece = parts[i]
			try {
				const translated = await this.fetchMyMemory(piece, langpair)
				out.push(translated)
			} catch (e) {
				const msg = e instanceof Error ? e.message : String(e)
				this.logger.warn(`Tradução falhou no bloco ${i + 1}/${parts.length}: ${msg}`)
				out.push(piece)
			}
			if (i < parts.length - 1) await sleep(CHUNK_DELAY_MS)
		}

		return out.join('')
	}

	private async fetchMyMemory(q: string, langpair: string): Promise<string> {
		const url = new URL('https://api.mymemory.translated.net/get')
		url.searchParams.set('q', q)
		url.searchParams.set('langpair', langpair)

		const res = await fetch(url.toString(), { method: 'GET' })
		if (!res.ok) {
			throw new Error(`HTTP ${res.status}`)
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
			throw new Error('Resposta inválida da API de tradução')
		}

		return translated
	}
}
