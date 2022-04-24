import { Inject, Controller, Post, Get, Body } from '@nestjs/common'
import { TagService } from './tag.service'
import { Tag } from './tag.entity'

@Controller('/Tag')
export class TagController {
  constructor(@Inject(TagService) private readonly service: TagService) {}

  @Get('list')
  async findAll() {
    return this.service.findAll()
  }

  @Post('add')
  async add(@Body() body: Tag) {
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
