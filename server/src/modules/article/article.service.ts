import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like, MoreThan } from 'typeorm'
import { Article } from './article.entity'
@Injectable()
export class ArticleService {
  private logger = new Logger(ArticleService.name)
  constructor(
    @InjectRepository(Article)
    private readonly repository: Repository<Article>,
  ) {}

  async create(body: Article): Promise<Article> {
    try {
      return await this.repository.save(body)
    } catch (err) {
      this.logger.error('create body:', body as any)
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id): Promise<Article> {
    try {
      return await this.repository.findOne(id, {
        relations: ['category'],
      })
    } catch (err) {
      this.logger.error('findOne id:', id)
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(query): Promise<{ list: any; count: number }> {
    const { current = 1, pageSize = 20, title = '', pass_flag, sort, cid: category_id = '' } = query
    let where: any = {}
    try {
      if (category_id) {
        where.category_id = category_id
      }
      if (title) {
        where.title = Like(`%${title}%`)
      }
      if (pass_flag !== undefined) {
        where.pass_flag = pass_flag
      }
      if (sort !== undefined) {
        where.sort = sort > 0 ? MoreThan(sort) : sort
      }
      const [list = [], count = 0] = await this.repository.findAndCount({
        where,
        skip: pageSize * (current - 1),
        take: pageSize,
        order: {
          created_at: 'DESC',
        },
        relations: ['category'],
      })
      return { list, count }
    } catch (err) {
      this.logger.error('find query:', query as any)
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(body: Article): Promise<any> {
    const { id, ...others } = body
    try {
      return await this.repository.update(id, others)
    } catch (err) {
      this.logger.error('update body:', body as any)
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(id): Promise<any> {
    try {
      return await this.repository.delete(id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
