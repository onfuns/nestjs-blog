import { Injectable } from '@nestjs/common'
import { ArticleService } from '@/modules/article/article.service'
import { CommentService } from '@/modules/comment/comment.service'
import { UserService } from '@/modules/user/user.service'

@Injectable()
export class CommonService {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
    private readonly userService: UserService,
  ) {}

  async findDashboardData(token: string): Promise<any> {
    const article = await this.articleService.findAll()
    const comment = await this.commentService.findAll()
    const tokenInfo = await this.userService.verifyToken(token)
    let user = {}
    if (tokenInfo) {
      user = await this.userService.findById(tokenInfo.id)
    }
    return {
      article,
      comment,
      user,
    }
  }
}
