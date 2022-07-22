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
import { pathToRegexp, match } from 'path-to-regexp'

@Injectable()
export class UserGuard implements CanActivate {
  private readonly reflector: Reflector = new Reflector()

  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest<Request>()
    const NO_PERMISSION = this.reflector.get<string[]>('NO_PERMISSION', context.getHandler())
    if (NO_PERMISSION) return true
    /** token 鉴权 begin */
    const token = request.headers['X-AUTH-ID-TOKEN'.toLowerCase()] as string
    console.log('X-AUTH-ID-TOKEN received:', token)
    if (!token) return this.fail()
    const tokenInfo = await this.userService.verifyToken(token)
    if (!tokenInfo) this.fail()
    /** token 鉴权 end */

    /** 接口鉴权 begin */
    const user: User = await this.userService.findById(tokenInfo.id)
    const auths = []
    for (let i = 0; i < user?.roles?.length; i++) {
      const role = user.roles[i]
      if (role.enable === 1) auths.push(...(role.auths || []))
    }
    const url = request.path.replace(Config.base, '')
    //code 格式  /role/:id::POST::PUT::DELETE
    if (
      !auths?.some(({ code }: { code: string }) => {
        const methodsIndex = code.indexOf('::')
        const codeKey = methodsIndex > -1 ? code.substring(0, methodsIndex) : code
        return (
          !!pathToRegexp(codeKey).exec(url) && code.includes(`::${request.method.toUpperCase()}`)
        )
      })
    ) {
      throw new HttpException('INVALID_AUTH', HttpStatus.FORBIDDEN)
    }
    /** 接口鉴权 end */
    return true
  }
  fail() {
    throw new HttpException('INVALID_TOKEN', HttpStatus.FORBIDDEN)
  }
}
