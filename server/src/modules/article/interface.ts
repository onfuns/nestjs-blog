import { ApiProperty } from '@nestjs/swagger'
import { Article } from './article.entity'

export class IArticleVO {
  @ApiProperty({ type: Article, isArray: true })
  data: Article[]

  @ApiProperty()
  count: number
}
