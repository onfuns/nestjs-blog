import { Inject, Controller, Post, Get, Body, Query } from '@nestjs/common'
import { UserService } from './user.service'
import * as md5 from 'md5'
import { User } from './user.entity'
import config from '@/config'
import { IP } from '@/decorator/ip.decorator'
import { NoPermission } from '@/decorator/permission.decorator'

@Controller('/user')
export class UserController {
  constructor(@Inject(UserService) private readonly service: UserService) {}

  @Post('login')
  @NoPermission()
  async login(@Body() body: User, @IP() cleintIp: string) {
    const { name, password } = body
    const data: User = await this.service.login({ name, password: md5(password) })
    if (!data) return { success: false, message: '用户名或密码错误' }
    const token = this.service.createToken({
      secret: config.jwtToken,
      id: data.id,
      name: data.name,
    })
    await this.service.updateLoginInfo({
      id: data.id,
      last_login_at: new Date(),
      last_login_ip: cleintIp,
    })
    return { userName: name, token }
  }

  @Get('list')
  async findAll(@Query() query) {
    return this.service.findAll()
  }

  @Post('add')
  async add(@Body() body) {
    return this.service.create(body)
  }

  @Post('update')
  async update(@Body() body) {
    return this.service.update(body)
  }

  @Post('delete')
  async delete(@Body('id') id) {
    return this.service.delete(id)
  }
}
