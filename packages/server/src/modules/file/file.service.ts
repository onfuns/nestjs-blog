import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as dayjs from 'dayjs'
import { createWriteStream, existsSync, mkdirSync } from 'fs'
import { pickBy } from 'lodash'
import { join } from 'path'
import { Like, Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { File, FileType } from './file.entity'
import { IFile } from './interface'

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
      await this.fileRepository.save({
        ext: fileExt,
        file_type_id: fileTypeId || undefined,
        url: join(filePath, name),
        size: file.size,
        originalname: file.originalname,
      })
    }
    return true
  }
}
