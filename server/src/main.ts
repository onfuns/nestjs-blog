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
import { join } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    logger: IS_DEV ? ['log', 'debug', 'warn', 'error'] : ['warn', 'error'],
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new ApiInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(Config.base)
  app.enableCors()
  app.use(cookieParse())
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  })

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  IS_DEV &&
    SwaggerModule.setup('swagger', app, document, {
      swaggerOptions: {
        explorer: true,
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
      },
    })

  const port = process.env.PORT || 4000
  await app.listen(port)
  console.log(`listen on http://localhost:${port}`)
}
bootstrap()
