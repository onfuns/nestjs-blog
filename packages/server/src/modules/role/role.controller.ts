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
import { Role } from './role.entity'
import { RoleService } from './role.service'

@Controller('/role')
export class RoleController {
  constructor(@Inject(RoleService) private readonly service: RoleService) {}

  @Get()
  async findAll() {
    return this.service.findAll()
  }

  @Post()
  async add(@Body() body: Role) {
    return this.service.create(body)
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id, @Body() body) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.service.delete(id)
  }
}
