import { makeAutoObservable } from 'mobx'
import { getCategoryList, updateCategory, addCategory, deleteCategory } from '@/actions/category'

export class CategoryStore {
  result: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'result', value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { success, data } = await getCategoryList(params)
    if (success) {
      this.set('result', data)
    }
  }

  async update(params?: Record<string, any>) {
    return await updateCategory(params)
  }

  async add(params?: Record<string, any>) {
    return await addCategory(params)
  }

  async delete(params?: Record<string, any>) {
    return await deleteCategory(params)
  }
}

export default new CategoryStore()
