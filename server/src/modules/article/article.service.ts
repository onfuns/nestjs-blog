import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { pickBy } from 'lodash'
import { Repository, Like, MoreThan, Equal } from 'typeorm'
import { Article } from './article.entity'
import { LoggerService } from '@/shared/logger/logger.service'
import { IArticleVO } from './interface'
import { QueryDto } from './article.dto'
@Injectable()
export class ArticleService {
  private readonly logger = new LoggerService(ArticleService.name)
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {}

  async create(body: Article): Promise<Article> {
    return await this.repository.save(body)
  }

  async findById(id: string): Promise<Article> {
    return await this.repository.findOne({
      where: { id },
      relations: {
        category: true,
        tags: true,
      },
    })
  }

  async findAll(query?: QueryDto): Promise<IArticleVO> {
    const { current = 1, pageSize = 20, sort, title, cid: category_id, pass_flag } = query ?? {}
    const where: any = pickBy({
      title: title ? Like(`%${title}%`) : undefined,
      sort: sort > 0 ? MoreThan(sort) : sort === 0 ? Equal(0) : undefined,
      category_id,
      pass_flag,
    })
    this.logger.info('findAll where: ', where)
    const [data, count] = await this.repository.findAndCount({
      where,
      skip: pageSize * (current - 1),
      take: pageSize,
      order: {
        created_at: 'DESC',
      },
      relations: ['category', 'tags'],
    })
    return { data, count }
  }

  async update(id: string, body: Article): Promise<Article> {
    const { tags, ...others } = body
    const record = this.repository.create(others)
    record.tags = tags
    record.id = id
    return await this.repository.save(record)
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id)
  }
}
