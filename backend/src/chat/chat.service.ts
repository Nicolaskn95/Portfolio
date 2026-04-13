import {
	BadGatewayException,
	Injectable,
	ServiceUnavailableException,
	UnauthorizedException,
} from '@nestjs/common'
import { ProjectPrisma } from '../project/project.prisma'
import { ChatMessagePayload, type ChatUiLocale } from './chat.types'

const MAX_MESSAGES = 24
const MAX_CONTENT_LENGTH = 4000

/** Modelo de exemplo na documentação da API direta: https://docs.ollama.com/cloud */
const OLLAMA_CLOUD_DEFAULT_MODEL = 'gpt-oss:120b'
const OLLAMA_LOCAL_DEFAULT_MODEL = 'llama3.2'

/** Nomes típicos de instalação local que a API direta em ollama.com não trata igual */
const OLLAMA_CLOUD_REPLACE_WITH_DEFAULT = new Set(['llama3.2', 'llama3.2:latest'])

type OllamaChatResponse = {
	message?: { role?: string; content?: string }
	error?: string
}

function formatOllamaFailure(status: number, body: string, model: string): string {
	let ollamaMessage = body
	try {
		const parsed = JSON.parse(body) as { error?: string }
		if (typeof parsed.error === 'string') ollamaMessage = parsed.error
	} catch {
		// body is plain text
	}

	const hintLocal = [
		`Modelo configurado: "${model}".`,
		'No Ollama local, instale com: ollama pull ' + model,
		'Confira o nome exato com: ollama list',
		'e defina OLLAMA_MODEL no .env igual a uma linha dessa lista.',
	].join(' ')

	const hintCloud =
		'Use um modelo da cloud (ex.: gpt-oss:120b). Lista: https://ollama.com/search?c=cloud — defina OLLAMA_MODEL no .env.'

	const lower = ollamaMessage.toLowerCase()
	if (lower.includes('not found')) {
		const hostEnv = (process.env.OLLAMA_HOST ?? '').trim()
		const treatAsCloud = !hostEnv || /\bollama\.com\b/i.test(hostEnv)
		return `${ollamaMessage} ${treatAsCloud ? hintCloud : hintLocal}`
	}

	return ollamaMessage || `Ollama respondeu com status ${status}.`
}

@Injectable()
export class ChatService {
	constructor(private readonly projectPrisma: ProjectPrisma) {}

	/**
	 * Host da API (sem path). Docs: base https://ollama.com + rotas /api/chat, /api/tags, etc.
	 * Aceita OLLAMA_HOST=https://ollama.com ou .../api (remove /api para não duplicar).
	 */
	private ollamaBaseUrl(): string {
		const raw = (process.env.OLLAMA_HOST ?? 'https://ollama.com').trim()
		let base = raw.replace(/\/$/, '')
		if (base.endsWith('/api')) {
			base = base.slice(0, -4)
		}
		return base
	}

	private isCloudHost(): boolean {
		return /\bollama\.com\b/i.test(this.ollamaBaseUrl())
	}

	private model(): string {
		const fromEnv = process.env.OLLAMA_MODEL?.trim()
		if (fromEnv) {
			if (this.isCloudHost() && OLLAMA_CLOUD_REPLACE_WITH_DEFAULT.has(fromEnv)) {
				return OLLAMA_CLOUD_DEFAULT_MODEL
			}
			return fromEnv
		}
		return this.isCloudHost() ? OLLAMA_CLOUD_DEFAULT_MODEL : OLLAMA_LOCAL_DEFAULT_MODEL
	}

	async respond(messages: ChatMessagePayload[], locale: ChatUiLocale = 'pt'): Promise<string> {
		const apiKey = process.env.OLLAMA_API_KEY?.trim()
		if (this.isCloudHost() && !apiKey) {
			throw new ServiceUnavailableException(
				'OLLAMA_API_KEY ausente. Para https://ollama.com/api crie uma chave em https://ollama.com/settings/keys e defina a variável (Authorization: Bearer).',
			)
		}

		const sanitized = this.sanitizeMessages(messages)
		if (sanitized.length === 0) {
			throw new BadGatewayException('Nenhuma mensagem válida.')
		}

		const projects = await this.projectPrisma.getAllWithTechnologies()
		const systemContent = this.buildSystemPrompt(projects, locale)

		const url = `${this.ollamaBaseUrl()}/api/chat`
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
		}
		if (this.isCloudHost()) {
			headers.Authorization = `Bearer ${apiKey!}`
		}

		const body = {
			model: this.model(),
			stream: false,
			messages: [
				{ role: 'system' as const, content: systemContent },
				...sanitized.map((m) => ({
					role: m.role,
					content: m.content,
				})),
			],
		}

		let response: Response
		try {
			response = await fetch(url, {
				method: 'POST',
				headers,
				body: JSON.stringify(body),
			})
		} catch {
			throw new BadGatewayException(
				'Não foi possível contactar o serviço de IA. Verifique OLLAMA_HOST e a rede.',
			)
		}

		const rawBody = await response.text().catch(() => '')

		if (!response.ok) {
			if (response.status === 401 && this.isCloudHost()) {
				throw new UnauthorizedException(
					'Ollama Cloud recusou a API key (401). Verifique OLLAMA_API_KEY em https://ollama.com/settings/keys',
				)
			}
			throw new BadGatewayException(
				formatOllamaFailure(response.status, rawBody, this.model()),
			)
		}

		let data: OllamaChatResponse
		try {
			data = rawBody ? (JSON.parse(rawBody) as OllamaChatResponse) : {}
		} catch {
			throw new BadGatewayException('Resposta inválida do Ollama.')
		}
		if (data.error) {
			throw new BadGatewayException(
				formatOllamaFailure(response.status, JSON.stringify(data), this.model()),
			)
		}

		const text = data.message?.content?.trim()
		if (!text) {
			throw new BadGatewayException('Resposta vazia do modelo.')
		}
		return text
	}

	private sanitizeMessages(messages: ChatMessagePayload[]): ChatMessagePayload[] {
		const trimmed = messages
			.filter((m) => m.role === 'user' || m.role === 'assistant')
			.map((m) => ({
				role: m.role,
				content: m.content.slice(0, MAX_CONTENT_LENGTH).trim(),
			}))
			.filter((m) => m.content.length > 0)
		return trimmed.slice(-MAX_MESSAGES)
	}

	private buildSystemPrompt(
		projects: Awaited<ReturnType<ProjectPrisma['getAllWithTechnologies']>>,
		locale: ChatUiLocale,
	): string {
		const payload = projects.map((p) => ({
			id: p.id,
			name: p.name,
			description: p.description,
			type: p.type,
			level: p.level,
			highlight: p.highlight,
			repository: p.repository,
			technologies: p.technologies.map((t) => ({
				name: t.name,
				description: t.description,
			})),
		}))

		const jsonBlock = JSON.stringify(payload)

		if (locale === 'en') {
			return [
				"You are the virtual assistant for software developer Nicolas Nagano's portfolio.",
				'The visitor is using the site in English: always reply in clear, professional English.',
				'Only state facts about projects using the JSON data below. If you do not know, say that this information is not available in the portfolio.',
				'You may summarize, compare by type or technology, and suggest visiting the repository when appropriate. Do not format the answer as a data table for the UI.',
				'Contact: LinkedIn https://www.linkedin.com/in/nicolas-katsuji-nagano-90ba48223/ — GitHub https://github.com/Nicolaskn95',
				'Project data (JSON):',
				jsonBlock,
			].join('\n\n')
		}

		return [
			'Você é o assistente virtual do portfólio deste programador Nicolas Nagano.',
			'O visitante está com o site em português: responda sempre em português (Brasil), de forma clara e profissional.',
			'Só afirme fatos sobre projetos com base nos dados JSON abaixo. Se não souber, diga que não tem essa informação no portfólio.',
			'Pode resumir, comparar por tipo ou tecnologia, e sugerir visitar o repositório quando fizer sentido; não retorne os dados em formato de tabela para o front.',
			'Contato do programador — LinkedIn: https://www.linkedin.com/in/nicolas-katsuji-nagano-90ba48223/ — GitHub: https://github.com/Nicolaskn95',
			'Dados dos projetos (JSON):',
			jsonBlock,
		].join('\n\n')
	}
}
