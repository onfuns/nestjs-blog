import { Inject, Controller, Get, Post, Query, Body } from '@nestjs/common'
import { WebsiteService } from './website.service'
import { NoPermission } from '@/decorator/permission.decorator'

@Controller('/website')
export class WebsiteController {
  constructor(@Inject(WebsiteService) private readonly service: WebsiteService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.service.findAll()
  }

  @Get('list')
  @NoPermission()
  async getClientList(): Promise<any> {
    return this.findAll()
  }
}
