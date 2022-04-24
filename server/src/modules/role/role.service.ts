import { Injectable } from '@nestjs/common'
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
    const { auths, ...others } = body
    const record = this.repository.create(others)
    record.auths = auths
    return await this.repository.save(record)
  }

  async findOne(query): Promise<Role> {
    return await this.repository.findOne(query)
  }

  async findAll(): Promise<Role[]> {
    return getRepository(Role)
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.auths', 'auth')
      .getMany()
  }

  async update(body: Role): Promise<any> {
    const { id, auths, ...others } = body
    const record = this.repository.create(others)
    record.auths = auths
    record.id = id
    return await this.repository.save(record)
  }

  async delete(id): Promise<any> {
    return await this.repository.delete(id)
  }
}
