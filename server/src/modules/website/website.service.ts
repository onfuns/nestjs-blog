import { Injectable } from '@nestjs/common'
import { Website } from './website.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class WebsiteService {
  @InjectRepository(Website)
  private readonly repository: Repository<Website>

  async findAll() {
    return this.repository.find()
  }
}
