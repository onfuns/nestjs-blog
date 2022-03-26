import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository } from 'typeorm'
import { User } from './user.entity'
import * as jwt from 'jsonwebtoken'
import config from '@/config'

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly repository: Repository<User>
  constructor() {}

  async login(body: { name: string; password: string }) {
    try {
      const data = await this.repository.findOne(body)
      return data
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
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

  createToken(data) {
    const token = jwt.sign(data, config.jwtToken, {
      expiresIn: '24h',
    })
    return token
  }

  async create(body: User): Promise<any> {
    const { roles, ...others } = body
    try {
      const record = this.repository.create(others)
      record.roles = roles
      await this.repository.save(record)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(query: Partial<User>): Promise<User[]> {
    try {
      const data = await getRepository(User)
        .createQueryBuilder('user')
        .select(['user', 'role.id', 'role.name'])
        .leftJoin('user.roles', 'role')
        .getMany()
      return data
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(body: Partial<User>): Promise<any> {
    const { id, roles, ...others } = body
    try {
      const record = this.repository.create(others)
      record.roles = roles
      record.id = id
      await this.repository.save(record)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async delete(body: Partial<User>): Promise<any> {
    const { id } = body
    try {
      return await this.repository.delete(id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
