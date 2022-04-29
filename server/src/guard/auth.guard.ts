import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { UserService } from '@/modules/user/user.service'
import { User } from '@/modules/user/user.entity'
import Config from '@/config'
@Injectable()
export class UserGuard implements CanActivate {
  private readonly reflector: Reflector = new Reflector()

  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest<Request>()
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    /** token 鉴权 begin */
    //有 all标志的说明接口不做鉴权
    if (roles && roles.includes('all')) return true
    const token = request.headers['x-auth-id-token']
    console.log('guard x-auth-id-token received:', token)
    if (!token) return this.fail()
    const tokenInfo = await this.userService.verifyToken(token)
    if (!tokenInfo) this.fail()
    /** token 鉴权 end */

    /** 接口鉴权 begin */
    const user: User = await this.userService.findById(tokenInfo.id)
    const auths = []
    for (let i = 0; i < user.roles.length; i++) {
      const role = user.roles[i]
      if (role.enable === 1) auths.push(...(role.auths || []))
    }
    const url = request.path.replace(Config.base, '')
    if (!auths?.some(({ code }) => code.split(',').includes(url))) {
      throw new HttpException('INVALID_AUTH', HttpStatus.FORBIDDEN)
    }
    /** 接口鉴权 end */
    return true
  }
  fail() {
    throw new HttpException('INVALID_TOKEN', HttpStatus.FORBIDDEN)
  }
}
