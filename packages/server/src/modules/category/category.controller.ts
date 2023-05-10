import { NoPermission } from '@/decorator/permission.decorator'
import { toTree } from '@/util'
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
import { Category } from './category.entity'
import { CategoryService } from './category.service'

@Controller('/category')
export class CategoryController {
  constructor(@Inject(CategoryService) private readonly service: CategoryService) {}

  @Get()
  async findAll() {
    const data = await this.service.findAll()
    return toTree(data)
  }

  @Get('list')
  @NoPermission()
  async listForClient() {
    return await this.findAll()
  }

  @Post()
  async add(@Body() body: Category) {
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
