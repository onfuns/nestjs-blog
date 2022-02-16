import { makeAutoObservable } from 'mobx'
import { getTagList, updateTag, addTag, deleteTag } from '@/actions/tag'

export class TagStore {
  result: any[] = []
  detail: any = {}

  constructor() {
    makeAutoObservable(this)
  }
  async get(params = {}) {
    const data = await getTagList(params)
    if (data.success) {
      this.result = data.data
    }
  }

  async update(params = {}) {
    return await updateTag(params)
  }

  async add(params = {}) {
    return await addTag(params)
  }

  async delete(params = {}) {
    return await deleteTag(params)
  }
}

export default new TagStore()
