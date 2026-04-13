import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { TranslateService } from './translate.service'

type LangCode = 'pt' | 'en'

type TranslateBody = {
	text: string
	source?: LangCode
	target?: LangCode
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
		const source: LangCode = body.source === 'en' ? 'en' : 'pt'
		const target: LangCode = body.target === 'pt' ? 'pt' : 'en'
		if (source === target) {
			return { translatedText: text }
		}

		const translatedText = await this.translateService.translatePlain(text, source, target)
		return { translatedText }
	}
}
