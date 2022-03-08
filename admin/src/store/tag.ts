import { makeAutoObservable } from 'mobx'
import { getTagList, updateTag, addTag, deleteTag } from '@/actions/tag'

export class TagStore {
  result: any[] = []
  detail: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  set(key: string, value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { success, data } = await getTagList(params)
    if (success) {
      this.set('result', data)
    }
  }

  async update(params?: Record<string, any>) {
    return await updateTag(params)
  }

  async add(params?: Record<string, any>) {
    return await addTag(params)
  }

  async delete(params?: Record<string, any>) {
    return await deleteTag(params)
  }
}

export default new TagStore()
