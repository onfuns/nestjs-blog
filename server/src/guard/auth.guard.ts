import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { UserService } from '@/modules/user/user.service'
@Injectable()
export class UserGuard implements CanActivate {
  private readonly reflector: Reflector = new Reflector()
  private readonly userService = new UserService()

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest<Request>()
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    //有 all标志的说明接口不做鉴权
    if (roles && roles.includes('all')) return true
    const token = request.headers['x-auth-id-token']
    console.log('guard x-auth-id-token received:', token)
    if (!token) return this.fail()
    const data = await this.userService.verifyToken(token)
    if (data === false) this.fail()
    return !!data
  }
  fail() {
    throw new HttpException('TOKEN_INVALID', HttpStatus.FORBIDDEN)
  }
}
