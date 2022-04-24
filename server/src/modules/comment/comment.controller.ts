import { Inject, Controller, Post, Get, Body, SetMetadata, Query } from '@nestjs/common'
import { CommentService } from './comment.service'
@Controller('/comment')
export class CommentController {
  constructor(@Inject(CommentService) private readonly service: CommentService) {}

  @Get('list')
  async findAll(@Query() query) {
    return this.service.findAll(query)
  }

  @Get('client/list')
  @SetMetadata('roles', ['all'])
  async getClientList(@Query('aid') aid) {
    return this.findAll({ aid, status: 1, pageSize: 100 })
  }

  @Post('add')
  @SetMetadata('roles', ['all'])
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
