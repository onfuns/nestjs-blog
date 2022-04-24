import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { pickBy } from 'lodash'
import { Repository, Like, MoreThan } from 'typeorm'
import { Article } from './article.entity'
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {}

  async create(body: Article): Promise<Article> {
    return await this.repository.save(body)
  }

  async findOne(id): Promise<Article> {
    return await this.repository.findOne(id, {
      relations: ['category'],
    })
  }

  async findAll(query: any = {}): Promise<{ data: Article[]; count: number }> {
    const { current = 1, pageSize = 20, sort, title, category_id, pass_flag } = query
    const where: any = pickBy({
      title: title ? Like(`%${title}%`) : undefined,
      sort: sort > 0 ? MoreThan(sort) : undefined,
      category_id,
      pass_flag,
    })
    const [data, count] = await this.repository.findAndCount({
      where,
      skip: pageSize * (current - 1),
      take: pageSize,
      order: {
        created_at: 'DESC',
      },
      relations: ['category'],
    })
    return { data, count }
  }

  async update(body: Article): Promise<any> {
    const { id, ...others } = body
    return await this.repository.update(id, others)
  }

  async delete(id): Promise<any> {
    return await this.repository.delete(id)
  }
}
