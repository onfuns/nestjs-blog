import config from '@/config'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as jwt from 'jsonwebtoken'
import { getRepository, Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly repository: Repository<User>
  constructor() {}

  async login({ name, password }) {
    return await this.repository.findOne({
      where: { name, password },
    })
  }

  createToken(data) {
    const token = jwt.sign(data, config.jwtToken, {
      expiresIn: '24h',
    })
    return token
  }

  verifyToken(token) {
    if (!token) return false
    const { jwtToken } = config
    try {
      const decoded = jwt.verify(token, jwtToken)
      if (decoded?.secret === jwtToken) {
        return decoded
      }
    } catch (err) {
      console.log('verifyToken error ', err)
    }
    return false
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

  async findById(id: number): Promise<any> {
    return this.repository.findOne({ where: { id }, relations: ['roles', 'roles.auths'] })
  }

  async update(id: number, body: User): Promise<any> {
    const record = this.repository.create(body)
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
