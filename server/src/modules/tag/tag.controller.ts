import { Inject, Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common'
import { TagService } from './tag.service'
import { Tag } from './tag.entity'

@Controller('/Tag')
export class TagController {
  constructor(@Inject(TagService) private readonly service: TagService) {}

  @Get()
  async findAll() {
    return this.service.findAll()
  }

  @Post()
  async add(@Body() body: Tag) {
    return this.service.create(body)
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id)
  }
}
