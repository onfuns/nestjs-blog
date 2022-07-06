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

  async findById(id: number): Promise<Role> {
    return await this.repository.findOneBy({ id })
  }

  async findAll(): Promise<Role[]> {
    return getRepository(Role)
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.auths', 'auth')
      .getMany()
  }

  async update(id: number, body: Role): Promise<any> {
    const { auths, ...others } = body
    const record = this.repository.create(others)
    record.auths = auths
    return await this.repository.update(id, record)
  }

  async delete(id: number): Promise<any> {
    return await this.repository.delete(id)
  }
}
