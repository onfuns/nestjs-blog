import { Module } from '@nestjs/common'
import { CommonController } from './common.controller'
import { CommonService } from './common.service'
import { ArticleModule } from '@/modules/article/article.module'
import { CommentModule } from '@/modules/comment/comment.module'

@Module({
  imports: [ArticleModule, CommentModule],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
