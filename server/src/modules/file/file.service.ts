import { Injectable } from '@nestjs/common'
import { File, FileType } from './file.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import { join } from 'path'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { v4 as uuidv4 } from 'uuid'
import * as dayjs from 'dayjs'
import { IFile } from './interface'
import { pickBy } from 'lodash'

@Injectable()
export class FileService {
  @InjectRepository(File)
  private readonly fileRepository: Repository<File>
  @InjectRepository(FileType)
  private readonly fileTypeRepository: Repository<FileType>

  async findAll(query): Promise<any> {
    const { current = 1, pageSize = 20, fileTypeId, originalname } = query ?? {}

    const where: Partial<File> = pickBy({
      originalname: originalname ? Like(`%${originalname}%`) : undefined,
      file_type_id: fileTypeId ?? undefined,
    })

    const [data, count] = await this.fileRepository.findAndCount({
      where: where,
      skip: pageSize * (current - 1),
      take: pageSize,
      order: {
        created_at: 'DESC',
      },
      relations: ['filetype'],
    })
    return { data, count }
  }

  async delete(id: number): Promise<any> {
    return await this.fileRepository.delete(id)
  }

  async findFileType(): Promise<any> {
    return this.fileTypeRepository.find()
  }

  async addFileType(name): Promise<any> {
    return this.fileTypeRepository.save({ name })
  }

  async upload(files: IFile[], fileTypeId = null) {
    const date = dayjs().format('YYYYMMDD')
    const filePath = join('uploads', date)
    const dir = join(__dirname, '../../../', filePath)

    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    for (const file of files) {
      const fileExt = file.originalname.substring(file.originalname.lastIndexOf('.') + 1)
      const name = `${uuidv4()}.${fileExt}`
      const fileUrl = `${dir}/${name}`
      createWriteStream(fileUrl).write(file.buffer)
      this.fileRepository.save({
        ext: fileExt,
        file_type_id: fileTypeId,
        url: join(filePath, name),
        size: file.size,
        originalname: file.originalname,
      })
    }
    return true
  }
}
