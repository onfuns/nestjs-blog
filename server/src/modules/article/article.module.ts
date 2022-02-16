import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { TagModule } from '../tag/tag.module'
import { Article } from './article.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Article]), TagModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
