import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { agentDebugLog, describeDbUrl } from './debug/agent-debug-log'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors()
	const port = process.env.PORT ?? 4000
	const dbInfo = describeDbUrl(process.env.DATABASE_URL)
	// #region agent log
	agentDebugLog({
		runId: 'initial',
		hypothesisId: 'H1',
		location: 'backend/src/main.ts:10',
		message: 'Backend bootstrap env fingerprint',
		data: {
			port,
			pid: process.pid,
			cwd: process.cwd(),
			nodeEnv: process.env.NODE_ENV ?? null,
			dbInfo,
			hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
			hasDirectUrl: Boolean(process.env.DIRECT_URL),
		},
	})
	// #endregion
	await app.listen(port)
	console.log(`🚀 Backend rodando na porta ${port}`)
}
bootstrap()
