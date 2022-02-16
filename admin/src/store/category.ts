import { makeAutoObservable } from 'mobx'
import { getCategoryList, updateCategory, addCategory, deleteCategory } from '@/actions/category'

export class CategoryStore {
  result: any[] = []
  detail: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  async get(params = {}) {
    const data = await getCategoryList(params)
    if (data.success) {
      this.result = data.data
    }
  }

  async update(params = {}) {
    return await updateCategory(params)
  }

  async add(params = {}) {
    return await addCategory(params)
  }

  async delete(params = {}) {
    return await deleteCategory(params)
  }
}

export default new CategoryStore()
