import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagModule } from '../tag/tag.module'
import { ArticleController } from './article.controller'
import { Article } from './article.entity'
import { ArticleService } from './article.service'
@Module({
  imports: [TypeOrmModule.forFeature([Article]), TagModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
