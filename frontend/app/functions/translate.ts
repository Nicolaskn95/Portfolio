import { httpPost } from './api'

type TranslateResponse = { translatedText: string }

export async function translatePlain(
	text: string,
	source: 'pt' | 'en',
	target: 'pt' | 'en',
): Promise<string | null> {
	const res = await httpPost<TranslateResponse>('translate', { text, source, target })
	if (!res || typeof res.translatedText !== 'string') return null
	return res.translatedText
}
