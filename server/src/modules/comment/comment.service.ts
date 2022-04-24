import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { pickBy } from 'lodash'
import { Like, Repository } from 'typeorm'
import { Comment } from './comment.entity'

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly repository: Repository<Comment>,
  ) {}

  async create(data: Comment): Promise<Comment> {
    return await this.repository.save(data)
  }

  async findOne(query): Promise<Comment> {
    return await this.repository.findOne(query)
  }

  async findAll(query: any = {}): Promise<{ data: Comment[]; count: number }> {
    const { current = 1, pageSize = 20, aid, status, title = '' } = query
    const where = pickBy({ aid, status })
    const [data = [], count = 0] = await this.repository.findAndCount({
      where: {
        ...where,
        article: {
          title: Like(`%${title}%`),
        },
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

    return { data, count }
  }

  async update(body): Promise<any> {
    const { id, ...others } = body
    return await this.repository.update(id, others)
  }

  async delete(id): Promise<any> {
    return await this.repository.delete(id)
  }
}
