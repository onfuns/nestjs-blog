import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Auth } from './auth.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly repository: Repository<Auth>,
  ) {}

  async create(data: Auth): Promise<Auth> {
    return await this.repository.save(data)
  }

  async findAll(): Promise<Auth[]> {
    return await this.repository.find({
      order: {
        created_at: 'ASC',
      },
    })
  }

  async update(body): Promise<any> {
    const { id, ...others } = body
    return await this.repository.update(id, others)
  }

  async delete(id): Promise<any> {
    return await this.repository.delete(id)
  }

  async verify(body: string) {
    const ids = body?.split(',')
    const data = await this.findAll()
    return data.filter(d => ids.includes(d.id.toString()))
  }
}
