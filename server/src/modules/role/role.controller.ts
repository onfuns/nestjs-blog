import { Inject, Controller, Post, Get, Body, SetMetadata, Req } from '@nestjs/common'
import { RoleService } from './role.service'
import { Role } from './role.entity'
@Controller('/role')
export class RoleController {
  constructor(@Inject(RoleService) private readonly service: RoleService) {}

  @Get('list')
  @SetMetadata('roles', ['all'])
  async findAll() {
    return this.service.findAll()
  }

  @Get('info')
  async detail(@Req() req) {
    const { id } = req.query
    return this.service.findOne(id)
  }

  @Post('add')
  async add(@Body() body: Role) {
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
