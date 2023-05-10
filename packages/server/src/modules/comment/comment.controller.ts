import { NoPermission } from '@/decorator/permission.decorator'
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
  Query,
} from '@nestjs/common'
import { CommentService } from './comment.service'

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
  async add(@Body() body) {
    return this.service.create(body)
  }

  @Post('add')
  @NoPermission()
  async addForClient(@Body() body) {
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
