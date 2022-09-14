import { Module } from '@nestjs/common'
import { CommonController } from './common.controller'
import { CommonService } from './common.service'
import { ArticleModule } from '@/modules/article/article.module'
import { CommentModule } from '@/modules/comment/comment.module'
import { UserModule } from '@/modules/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Upload } from './upload.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Upload]), ArticleModule, CommentModule, UserModule],
  controllers: [CommonController],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
