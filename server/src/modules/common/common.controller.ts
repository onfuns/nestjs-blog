import { Inject, Controller, Get } from '@nestjs/common'
import { CommonService } from './common.service'

@Controller('/common')
export class CommonController {
  constructor(@Inject(CommonService) private readonly service: CommonService) {}

  @Get('dashboard')
  async findDashboardData() {
    return this.service.findDashboardData()
  }
}
