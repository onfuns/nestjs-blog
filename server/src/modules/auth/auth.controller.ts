import { Inject, Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly service: AuthService) {}

  @Get()
  async findAll() {
    return this.service.findAll()
  }

  @Post()
  async add(@Body() body) {
    return this.service.create(body)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  async delete(@Body('id') id: string) {
    return this.service.delete(id)
  }
}
