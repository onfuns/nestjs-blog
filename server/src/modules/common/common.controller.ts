import { Inject, Controller, Get, Req } from '@nestjs/common'
import { CommonService } from './common.service'

@Controller('/common')
export class CommonController {
  constructor(@Inject(CommonService) private readonly service: CommonService) {}

  @Get('dashboard')
  async findDashboardData(@Req() req) {
    const token = req.headers['X-AUTH-ID-TOKEN'.toLowerCase()]
    return this.service.findDashboardData(token)
  }
}
