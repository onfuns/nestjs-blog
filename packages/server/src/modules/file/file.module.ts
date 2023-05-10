import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FileController } from './file.controller'
import { File, FileType } from './file.entity'
import { FileService } from './file.service'

@Module({
  imports: [TypeOrmModule.forFeature([File, FileType])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
