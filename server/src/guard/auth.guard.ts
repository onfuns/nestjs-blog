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
import { RoleService } from '@/modules/role/role.service'
import { AuthService } from '@/modules/auth/auth.service'
import Config from '@/config'
@Injectable()
export class UserGuard implements CanActivate {
  private readonly reflector: Reflector = new Reflector()

  constructor(
    @Inject(RoleService)
    private readonly roleService: RoleService,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    return true
    const request = context.switchToHttp().getRequest<Request>()
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    /** token 鉴权 begin */
    //有 all标志的说明接口不做鉴权
    if (roles && roles.includes('all')) return true
    const token = request.headers['x-auth-id-token']
    console.log('guard x-auth-id-token received:', token)
    if (!token) return this.fail()
    const data = await this.userService.verifyToken(token)
    if (!data) this.fail()
    /** token 鉴权 end */
    /** 接口鉴权 begin */
    const roleInfo = await this.roleService.findOne({ id: data.role_id })
    const authinfo = await this.authService.verify('1')
    const url = request.path.replace(Config.base, '')
    if (!authinfo?.some(({ code }) => code === url)) {
      throw new HttpException('AUTH_INVALID', HttpStatus.FORBIDDEN)
    }
    /** 接口鉴权 end */
    return true
  }
  fail() {
    throw new HttpException('TOKEN_INVALID', HttpStatus.FORBIDDEN)
  }
}
