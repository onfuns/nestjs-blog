import './env'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AppInterceptor } from '@/interceptor/app.Interceptor'
import { HttpExceptionFilter } from '@/filter/http.filter'
import { UserGuard } from '@/guard/auth.guard'
import { ValidationPipe } from '@/pipe/validation.pipe'
import * as cookieParse from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    logger: true,
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new AppInterceptor())
  app.useGlobalGuards(new UserGuard())
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api')
  app.enableCors()
  app.use(cookieParse())
  const port = process.env.PORT || 4000
  await app.listen(port)
  console.log(`listen on http://localhost:${port}`)
}
bootstrap()
