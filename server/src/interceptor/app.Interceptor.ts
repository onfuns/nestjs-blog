import {
  Injectable,
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  HttpStatus,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
@Injectable()
export class AppInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const res = ctx.getResponse()
    const req = ctx.getRequest()
    // 统一调整返回状态码为200
    if (['POST', 'PUT', 'DELETE', 'OPTIONS'].includes(req.method)) {
      res.status(HttpStatus.OK)
    }
    const resMapData = map((data: any) => {
      let result = { success: true, msg: '请求成功', data: null }
      if (data && typeof data === 'object' && 'success' in data) {
        result = { ...result, ...data }
      } else {
        result.data = data
      }
      return result
    })
    return next.handle().pipe(resMapData)
  }
}
