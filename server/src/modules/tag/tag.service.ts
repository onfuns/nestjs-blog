import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Tag } from './tag.entity'
import { unset } from 'lodash'
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly repository: Repository<Tag>,
  ) {}

  async create(data: Tag): Promise<Tag> {
    try {
      return await this.repository.save(data)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<Tag[]> {
    try {
      const data = await this.repository.find({
        order: {
          created_at: 'DESC',
        },
      })
      return data
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(body): Promise<any> {
    const { id } = body
    unset(body, 'id')
    try {
      return await this.repository.update(id, body)
    } catch (err) {
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
