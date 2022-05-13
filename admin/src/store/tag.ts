import { makeAutoObservable } from 'mobx'
import { getTagList, updateTag, addTag, deleteTag } from '@/actions/tag'

export class TagStore {
  result: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'result', value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { data } = await getTagList(params)
    if (data) {
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
