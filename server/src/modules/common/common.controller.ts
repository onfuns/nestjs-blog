import { Inject, Controller, Get, Req } from '@nestjs/common'
import { CommonService } from './common.service'

@Controller('/common')
export class CommonController {
  constructor(@Inject(CommonService) private readonly service: CommonService) {}

  @Get('dashboard')
  async findDashboardData(@Req() req) {
    return this.service.findDashboardData(req.headers['x-auth-id-token'])
  }
}
