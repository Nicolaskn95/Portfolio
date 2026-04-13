import { NestFactory } from '@nestjs/core'
import { json, urlencoded } from 'express'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { bodyParser: false })
	app.use(json({ limit: '5mb' }))
	app.use(urlencoded({ extended: true, limit: '5mb' }))
	app.enableCors()
	const port = process.env.PORT ?? 4000
	await app.listen(port)
	console.log(`🚀 Backend rodando na porta ${port}`)
}
bootstrap()
