import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getRepository, Repository } from 'typeorm'
import { Role } from './role.entity'
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  async create(body: Role): Promise<Role> {
    try {
      const { auths, ...others } = body
      const record = this.repository.create(others)
      record.auths = auths
      return await this.repository.save(record)
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
      return getRepository(Role)
        .createQueryBuilder('role')
        .leftJoinAndSelect('role.auths', 'auth')
        .getMany()
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(body: Role): Promise<any> {
    try {
      const { id, auths, ...others } = body
      const record = this.repository.create(others)
      record.auths = auths
      record.id = id
      return await this.repository.save(record)
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
