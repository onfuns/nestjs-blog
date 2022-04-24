import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from './comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
  ) {}

  async create(data: Comment): Promise<Comment> {
    try {
      return await this.repository.save(data)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(query): Promise<Comment> {
    try {
      return await this.repository.findOne(query)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(query: any = {}): Promise<{ list: Comment[]; count: number }> {
    const { current = 1, pageSize = 20, aid, status, title = '' } = query
    let where: any = {}
    if (aid) {
      where.aid = aid
    }
    if (status !== undefined) {
      where.status = status
    }

    try {
      //https://github.com/typeorm/typeorm/issues/3890
      // typeorm bug findAndCount不能使用这种关联形式 where = { article: { title:Like(`%${title}%`) } }
      const [list = [], count = 0] = await this.repository.findAndCount({
        where: qb => {
          qb.where(where).andWhere('article.title like :title', { title: `%${title}%` })
        },
        join: {
          alias: 'comment',
          leftJoinAndSelect: {
            article: 'comment.article',
          },
        },
        skip: pageSize * (current - 1),
        take: pageSize,
        order: {
          created_at: 'DESC',
        },
      })

      return { list, count }
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(body): Promise<any> {
    const { id, ...others } = body
    try {
      return await this.repository.update(id, others)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(body): Promise<any> {
    const { id } = body
    try {
      return await this.repository.delete(id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
