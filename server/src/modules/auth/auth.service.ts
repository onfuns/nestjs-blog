import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
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
    try {
      return await this.repository.save(data)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<Auth[]> {
    try {
      const data = await this.repository.find({
        order: {
          created_at: 'ASC',
        },
      })
      return data
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

  async verify(body: string) {
    const ids = body?.split(',')
    return (await this.findAll()).filter(d => ids.includes(d.id.toString()))
  }
}
