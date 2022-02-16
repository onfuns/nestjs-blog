import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status =
      exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    const success = status >= 200 && status <= 300
    !success && console.log(exception)
    const errorResponse = {
      success,
      data: null,
      msg: exception.message,
    }
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
