import {
  Inject,
  Controller,
  Post,
  Get,
  Body,
  SetMetadata,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
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
    try {
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
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @Get('list')
  async findAll(@Query() query) {
    return this.service.findAll(query)
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
