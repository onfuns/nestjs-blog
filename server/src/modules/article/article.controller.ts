import { Inject, Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common'
import { ArticleService } from './article.service'
import { Article } from './article.entity'
import { QueryDto, CreateDto } from './article.dto'
import { IArticleVO } from './interface'
import { NoPermission } from '@/decorator/permission.decorator'

@Controller('/article')
export class ArticleController {
  constructor(@Inject(ArticleService) private readonly service: ArticleService) {}

  @Get()
  async findAll(@Query() query: QueryDto): Promise<IArticleVO> {
    return this.service.findAll(query)
  }

  @Get('list')
  @NoPermission()
  async getClientList(@Query() query: QueryDto): Promise<IArticleVO> {
    return this.findAll({ ...query, pass_flag: 1 })
  }

  @Post()
  async add(@Body() body: CreateDto) {
    return this.service.create(body as Article)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body) {
    return this.service.update(id, body)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id)
  }

  @Get(':id')
  @NoPermission()
  async info(@Param('id') id: string) {
    return this.service.findById(id)
  }
}
