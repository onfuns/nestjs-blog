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

  async update(id: number, body: Auth): Promise<any> {
    return await this.repository.update(id, body)
  }

  async delete(id: number): Promise<any> {
    return await this.repository.delete(id)
  }

  async verify(ids: string) {
    const idArr = ids?.split(',')
    const data = await this.findAll()
    return data.filter(d => idArr.includes(d.id.toString()))
  }
}
