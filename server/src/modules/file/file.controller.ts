import {
  Inject,
  Controller,
  Get,
  Post,
  Delete,
  Body,
  UseInterceptors,
  UploadedFiles,
  Query,
  Param,
} from '@nestjs/common'
import { FileService } from './file.service'
import { FilesInterceptor } from '@nestjs/platform-express'
import { IFile } from './interface'

@Controller('/file')
export class FileController {
  constructor(@Inject(FileService) private readonly service: FileService) {}

  @Get()
  async findAll(@Query() query): Promise<any> {
    return this.service.findAll(query)
  }

  @Get('type')
  async findFileType(): Promise<any> {
    return this.service.findFileType()
  }

  @Post('type')
  async addFileType(@Body('name') name: string): Promise<any> {
    return this.service.addFileType(name)
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.service.delete(id)
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadMultiple(@UploadedFiles() files: IFile[], @Body('fileTypeId') fileTypeId: null | number) {
    if (files.length > 5) {
      return { success: false, message: '一次最多上传5张图片' }
    }
    if (files.some(file => !file.mimetype?.includes('image/'))) {
      return { success: false, message: '只能上传图片' }
    }
    return this.service.upload(files, fileTypeId)
  }
}
