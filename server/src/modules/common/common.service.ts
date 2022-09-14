import { Injectable } from '@nestjs/common'
import { ArticleService } from '@/modules/article/article.service'
import { CommentService } from '@/modules/comment/comment.service'
import { UserService } from '@/modules/user/user.service'
import { join } from 'path'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import * as dayjs from 'dayjs'
import { Upload } from './upload.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CommonService {
  private readonly articleService: ArticleService
  private readonly commentService: CommentService
  private readonly userService: UserService

  @InjectRepository(Upload)
  private readonly uploadRepository: Repository<Upload>

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

  async upload(files: { originalname: string; mimetype: string; buffer: Buffer }[], group = null) {
    const date = dayjs().format('YYYYMMDD')
    const filePath = join('uploads', date)
    const dir = join(__dirname, '../../../', filePath)

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    for (const file of files) {
      const fileType = file.originalname.substring(file.originalname.lastIndexOf('.') + 1)
      const name = `${uuidv4()}.${fileType}`
      const fileUrl = `${dir}/${name}`
      createWriteStream(fileUrl).write(file.buffer)
      this.uploadRepository.save({ group, url: join(filePath, name) })
    }
    return true
  }
}
