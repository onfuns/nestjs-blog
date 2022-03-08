import { Inject, Controller, Post, Get, Body, SetMetadata, Query } from '@nestjs/common'
import { UserService } from './user.service'
import * as md5 from 'md5'
import { User } from './user.entity'
import config from '@/config'
@Controller('/user')
export class UserController {
  constructor(@Inject(UserService) private readonly service: UserService) {}

  @Post('login')
  @SetMetadata('roles', ['all'])
  async login(@Body() body) {
    const { name, password } = body
    const data = await this.service.login(name)
    if (data?.password !== md5(password)) {
      return { success: false, msg: '密码错误' }
    } else {
      const token = this.service.createToken({
        secret: config.jwtToken,
        id: data.id,
        name: data.name,
        role_id: data.role_id,
      })
      return { userName: name, token }
    }
  }

  @Get('list')
  async findAll(@Query('roleId') roleId) {
    return this.service.findAll({ roleId })
  }

  @Post('add')
  async add(@Body() body: User) {
    return this.service.create(body)
  }

  @Post('update')
  async update(@Body() body) {
    return this.service.update(body)
  }

  @Post('delete')
  async delete(@Body() body) {
    return this.service.delete(body)
  }
}
