import { makeAutoObservable } from 'mobx'
import {
  getFileList,
  updateFile,
  addFile,
  deleteFile,
  getFileTypeList,
  addFileType,
} from '@/actions/file'

export class FileStore {
  result: { data?: any[]; count?: number } | null = {}
  filetypes: { id: number; name: string }[]

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<FileStore>, value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { data } = await getFileList(params)
    if (data) {
      this.set('result', data)
    }
    return this.result
  }

  async update(id: number, params?: Record<string, any>) {
    return await updateFile(id, params)
  }

  async add(params?: Record<string, any>) {
    return await addFile(params)
  }

  async delete(id: number) {
    return await deleteFile(id)
  }

  async getFileType() {
    const { data } = await getFileTypeList()
    if (data) {
      this.set('filetypes', data)
    }
    return this.filetypes
  }

  async addFileType(params?: Record<string, any>) {
    return await addFileType(params)
  }
}
