import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './tag.entity'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly repository: Repository<Tag>,
  ) {}

  async create(data: Tag): Promise<Tag> {
    return await this.repository.save(data)
  }

  async findAll(): Promise<Tag[]> {
    return await this.repository.find({
      order: {
        created_at: 'DESC',
      },
    })
  }

  async update(id: number, body): Promise<any> {
    return await this.repository.update(id, body)
  }

  async delete(id: number): Promise<any> {
    return await this.repository.delete(id)
  }
}
