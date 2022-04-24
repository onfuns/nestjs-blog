import { Inject, Controller, Post, Get, Body, SetMetadata, Query } from '@nestjs/common'
import { UserService } from './user.service'
import * as md5 from 'md5'
import { User } from './user.entity'
import config from '@/config'
import { IpAddress } from '@/decorator/IpAddress'

@Controller('/user')
export class UserController {
  constructor(@Inject(UserService) private readonly service: UserService) {}

  @Post('login')
  @SetMetadata('roles', ['all'])
  async login(@Body() body: User, @IpAddress() cleintIp: string) {
    const { name, password } = body
    const data: User = await this.service.login({ name, password: md5(password) })
    if (!data) return { success: false, msg: '用户名或密码错误' }
    const token = this.service.createToken({
      secret: config.jwtToken,
      id: data.id,
      name: data.name,
    })
    await this.service.update({
      id: data.id,
      last_login_at: new Date().toString(),
      last_login_ip: cleintIp,
    })
    return { userName: name, token }
  }

  @Get('list')
  async findAll(@Query() query) {
    return this.service.findAll(query)
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
