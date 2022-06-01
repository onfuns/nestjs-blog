import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
import { LoggerService } from '@/shared/logger/logger.service'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new LoggerService('HttpExceptionFilter')

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const success = status >= 200 && status <= 300
    !success && this.logger.error(exception)
    const errorResponse = {
      success,
      data: null,
      message: exception.message,
    }
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
