import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  HttpStatus,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { LoggerService } from '@/shared/logger/logger.service'
@Injectable()
export class ApiInterceptor implements NestInterceptor {
  private logger = new LoggerService('ApiInterceptor')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    // 统一调整返回状态码为200
    response.status(HttpStatus.OK)
    const resMapData = map((data: any) => {
      let result = { success: true, message: '请求成功', data: null }
      if (data && typeof data === 'object' && 'success' in data) {
        result = { ...result, ...data }
      } else {
        result.data = data
      }
      return result
    })
    return next.handle().pipe(
      tap(() => {
        this.logger.info(`${context.getClass().name}:${request.method} ${request.url}`)
      }),
      resMapData,
    )
  }
}
