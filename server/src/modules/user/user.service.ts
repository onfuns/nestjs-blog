import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository, DataSource } from 'typeorm'
import { User } from './user.entity'
import * as jwt from 'jsonwebtoken'
import config from '@/config'

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly repository: Repository<User>
  constructor() {}

  async login(body: { name: string; password: string }) {
    return await this.repository.findOne({
      where: body,
    })
  }

  createToken(data) {
    const token = jwt.sign(data, config.jwtToken, {
      expiresIn: '24h',
    })
    return token
  }

  verifyToken(token) {
    const { jwtToken } = config
    try {
      const decoded = jwt.verify(token, jwtToken)
      if (decoded && decoded.secret === jwtToken) {
        return decoded
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }

  async create(body: User): Promise<any> {
    const { roles, ...others } = body
    const record = this.repository.create(others)
    record.roles = roles
    await this.repository.save(record)
  }

  async findAll(): Promise<User[]> {
    return await getRepository(User)
      .createQueryBuilder('user')
      .select(['user', 'role.id', 'role.name'])
      .leftJoin('user.roles', 'role')
      .getMany()
  }

  async findById(id): Promise<any> {
    return this.repository.findOneBy({ id })
  }

  async update(id: number, body: User): Promise<any> {
    const { roles, ...others } = body
    const record = this.repository.create(others)
    record.roles = roles
    record.id = id
    await this.repository.save(record)
  }

  async updateLoginInfo(id: number, body): Promise<any> {
    await this.repository.update(id, body)
  }

  async delete(id: number): Promise<any> {
    return await this.repository.delete(id)
  }
}
