import { Inject, Controller, Post, Get, Body, Query, SetMetadata } from '@nestjs/common'
import { ArticleService } from './article.service'
import { Article } from './article.entity'
import { QueryDto, CreateDto, ActionDto } from './article.dto'
import { IArticleVO } from './interface'

@Controller('/article')
export class ArticleController {
  constructor(@Inject(ArticleService) private readonly service: ArticleService) {}

  @Get('list')
  async findAll(@Query() query: QueryDto): Promise<IArticleVO> {
    return this.service.findAll(query)
  }

  @Get('client/list')
  @SetMetadata('roles', ['all'])
  async getClientList(@Query() query: QueryDto): Promise<IArticleVO> {
    return this.findAll({ ...query, pass_flag: 1 })
  }

  @Post('create')
  async add(@Body() body: CreateDto) {
    return this.service.create(body as Article)
  }

  @Post('update')
  async update(@Body() body: ActionDto) {
    return this.service.update(body as Article)
  }

  @Post('delete')
  async delete(@Body() body: ActionDto) {
    const { id } = body
    return this.service.delete(id)
  }

  @Get('info')
  @SetMetadata('roles', ['all'])
  async info(@Query('id') id: string) {
    return this.service.findById(id)
  }
}
