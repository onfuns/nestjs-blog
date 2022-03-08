import { Inject, Controller, Post, Get, Body } from '@nestjs/common'
import { CategoryService } from './category.service'
import { Category } from './category.entity'
import { toTree } from '@/util'
@Controller('/category')
export class CategoryController {
  constructor(@Inject(CategoryService) private readonly service: CategoryService) {}

  @Get('list')
  async findAll() {
    const data = await this.service.findAll()
    return toTree(data)
  }

  @Post('add')
  async add(@Body() body: Category) {
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
