import { makeAutoObservable } from 'mobx'
import { getTagList, updateTag, addTag, deleteTag } from '@/actions/tag'

export class TagStore {
  result: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<TagStore>, value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { data } = await getTagList(params)
    if (data) {
      this.set('result', data)
    }
  }

  async update(id: number, params?: Record<string, any>) {
    return await updateTag(id, params)
  }

  async add(params?: Record<string, any>) {
    return await addTag(params)
  }

  async delete(id: number) {
    return await deleteTag(id)
  }
}

export default new TagStore()
