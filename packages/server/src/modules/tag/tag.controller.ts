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
import { Tag } from './tag.entity'
import { TagService } from './tag.service'

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
  async update(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id)
  }
}
