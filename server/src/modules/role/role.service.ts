import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Role } from './role.entity'
import { unset } from 'lodash'
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async create(data: Role): Promise<Role> {
    try {
      return await this.repository.save(data)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(query): Promise<Role> {
    try {
      return await this.repository.findOne(query)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(): Promise<Role[]> {
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
