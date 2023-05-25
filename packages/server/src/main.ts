/** 注意：环境变量设置放在入口顶部 */
import * as dotenv from 'dotenv'
import { join } from 'path'
dotenv.config({ path: join(__dirname, `../.env.${process.env.NODE_ENV}`) })
/** ------------------ */
import config from '@/config'
import { HttpExceptionFilter } from '@/filter/http.filter'
import { HttpInterceptor } from '@/interceptor/http.interceptor'
import { ValidationPipe } from '@/pipe/validation.pipe'
import { IS_DEV } from '@/util'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParse from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    logger: IS_DEV ? ['log', 'debug', 'warn', 'error'] : ['warn', 'error'],
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new HttpInterceptor())
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(config.base)
  app.enableCors()
  app.use(cookieParse())
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  })

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API description')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
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
