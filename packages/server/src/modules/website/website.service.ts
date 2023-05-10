import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Website } from './website.entity'

@Injectable()
export class WebsiteService {
  @InjectRepository(Website)
  private readonly repository: Repository<Website>

  async findAll() {
    return this.repository.find()
  }

  async update(data) {
    return this.repository.save(data)
  }
}
