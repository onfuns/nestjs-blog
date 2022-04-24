import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './category.entity'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  async create(data: Category): Promise<Category> {
    return await this.repository.save(data)
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.find({
      order: {
        sort: 'DESC',
      },
    })
  }

  async update(body): Promise<any> {
    const { id, ...others } = body
    return await this.repository.update(id, others)
  }

  async delete(id): Promise<any> {
    try {
      return await this.repository.delete(id)
    } catch (err) {
      const message = err.message.includes('a foreign key constraint fails')
        ? '有文章引用分类，无法删除'
        : err.message
      return { success: false, msg: message }
    }
  }
}
