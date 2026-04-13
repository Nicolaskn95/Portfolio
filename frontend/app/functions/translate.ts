import { httpPost } from './api'

type TranslateResponse = { translatedText: string }

export type TranslateSource = 'pt' | 'en' | 'auto'
export type TranslateTarget = 'pt' | 'en'

export async function translatePlain(
	text: string,
	source: TranslateSource,
	target: TranslateTarget,
): Promise<string | null> {
	const res = await httpPost<TranslateResponse>('translate', { text, source, target })
	if (!res || typeof res.translatedText !== 'string') return null
	return res.translatedText
}
