import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { TranslateService, type SourceLang, type TargetLang } from './translate.service'

type TranslateBody = {
	text: string
	source?: SourceLang
	target?: TargetLang
}

function parseSource(body: TranslateBody): SourceLang {
	const s = body.source
	if (s === 'en' || s === 'auto') return s
	return 'pt'
}

function parseTarget(body: TranslateBody): TargetLang {
	return body.target === 'pt' ? 'pt' : 'en'
}

@Controller('translate')
export class TranslateController {
	constructor(private readonly translateService: TranslateService) {}

	@Post()
	async translate(@Body() body: TranslateBody): Promise<{ translatedText: string }> {
		const text = body?.text
		if (typeof text !== 'string') {
			throw new BadRequestException('Campo "text" é obrigatório e deve ser string.')
		}

		const source = parseSource(body)
		const target = parseTarget(body)

		if (source !== 'auto' && source === target) {
			return { translatedText: text }
		}

		const translatedText = await this.translateService.translatePlain(text, source, target)
		return { translatedText }
	}
}
