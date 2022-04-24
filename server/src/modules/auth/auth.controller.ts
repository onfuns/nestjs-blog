import { Inject, Controller, Post, Get, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly service: AuthService) {}

  @Get('list')
  async findAll() {
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
