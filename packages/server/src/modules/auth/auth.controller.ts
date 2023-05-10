import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
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
  async update(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  async delete(@Body('id', ParseIntPipe) id: number) {
    return this.service.delete(id)
  }
}
