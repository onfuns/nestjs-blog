import { Inject, Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common'
import { CommentService } from './comment.service'
import { NoPermission } from '@/decorator/permission.decorator'

@Controller('/comment')
export class CommentController {
  constructor(@Inject(CommentService) private readonly service: CommentService) {}

  @Get()
  async findAll(@Query() query) {
    return this.service.findAll(query)
  }

  @Get('list')
  @NoPermission()
  async getClientList(@Query('aid') aid) {
    return this.findAll({ aid, status: 1, pageSize: 100 })
  }

  @Post()
  @NoPermission()
  async add(@Body() body) {
    return this.service.create(body)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id)
  }
}
