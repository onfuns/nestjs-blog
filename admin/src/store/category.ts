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
    const { data } = await getCategoryList(params)
    if (data) {
      this.set('result', data)
    }
  }

  async update(id: number, params?: Record<string, any>) {
    return await updateCategory(id, params)
  }

  async add(params?: Record<string, any>) {
    return await addCategory(params)
  }

  async delete(id: number) {
    return await deleteCategory(id)
  }
}

export default new CategoryStore()
