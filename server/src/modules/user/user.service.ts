import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getRepository } from 'typeorm'
import { User } from './user.entity'
import * as jwt from 'jsonwebtoken'
import config from '@/config'
import { unset } from 'lodash'

@Injectable()
export class UserService {
  @InjectRepository(User) private readonly repository: Repository<User>
  constructor() {}

  async login(name) {
    try {
      const data = await this.repository.findOne({ name })
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
        return true
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

  async create(data: User): Promise<User> {
    try {
      return await this.repository.save(data)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(query: { roleId: string }): Promise<User[]> {
    const { roleId } = query
    try {
      const data = await await getRepository(User)
        .createQueryBuilder('user')
        .where('find_in_set(:roleId,user.role_id)', { roleId }) //TODO 这里简化，用关联表合理
        .addOrderBy('created_at', 'ASC')
        .getMany()
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

  async delete(body): Promise<any> {
    const { id } = body
    try {
      return await this.repository.delete(id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
