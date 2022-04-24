import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ArticleService } from '@/modules/article/article.service'
import { CommentService } from '@/modules/comment/comment.service'

@Injectable()
export class CommonService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
  ) {}

  async findDashboardData(): Promise<any> {
    try {
      const article = await this.articleService.findAll()
      const comment = await this.commentService.findAll()
      return {
        article,
        comment,
      }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
