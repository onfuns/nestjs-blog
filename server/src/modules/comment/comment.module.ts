import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { Comment } from './comment.entity'
@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
