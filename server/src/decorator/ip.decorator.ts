import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import * as requestIp from 'request-ip'

export const IP = createParamDecorator((_: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()
  if (req.clientIp) return req.clientIp
  return requestIp.getClientIp(req)
})
