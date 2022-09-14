import {
  Inject,
  Controller,
  Get,
  Post,
  Req,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common'
import { CommonService } from './common.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { FileType } from './interface'

@Controller('/common')
export class CommonController {
  constructor(@Inject(CommonService) private readonly service: CommonService) {}

  @Get('dashboard')
  async findDashboardData(@Req() req) {
    const token = req.headers['X-AUTH-ID-TOKEN'.toLowerCase()]
    return this.service.findDashboardData(token)
  }

  @Post('upload/multiple')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiple(@UploadedFiles() files: FileType[], @Body('group') group) {
    if (files.length > 5) {
      return { success: false, message: '一次最多上传5张图片' }
    }
    if (files.some(file => !file.mimetype?.includes('image/'))) {
      return { success: false, message: '只能上传图片' }
    }

    return this.service.upload(files, group)
  }
}
