import './env'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ApiInterceptor } from '@/interceptor/api.interceptor'
import { HttpExceptionFilter } from '@/filter/http.filter'
import { ValidationPipe } from '@/pipe/validation.pipe'
import * as cookieParse from 'cookie-parser'
import Config from '@/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { IS_DEV } from '@/util'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    logger: IS_DEV ? ['log', 'debug', 'warn', 'error'] : ['warn', 'error'],
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ApiInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(Config.base)
  app.enableCors()
  app.use(cookieParse())

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)

  const port = process.env.PORT || 4000
  await app.listen(port)
  console.log(`listen on http://localhost:${port}`)
}
bootstrap()
