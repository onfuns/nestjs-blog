import { NoPermission } from '@/decorator/permission.decorator'
import { Body, Controller, Get, Inject, Post } from '@nestjs/common'
import { WebsiteService } from './website.service'

@Controller('/website')
export class WebsiteController {
  constructor(@Inject(WebsiteService) private readonly service: WebsiteService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.service.findAll()
  }

  @Get('info')
  @NoPermission()
  async getClientList(): Promise<any> {
    return this.findAll()
  }

  @Post()
  async update(@Body() body): Promise<any> {
    return this.service.update(body)
  }
}
