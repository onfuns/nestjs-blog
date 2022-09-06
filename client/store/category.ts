import { makeAutoObservable } from 'mobx'
import { getCategoryList } from '@/actions/category'

export class CategoryStore {
  result = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<CategoryStore>, value) {
    this[key] = value
  }

  async get() {
    const { data } = await getCategoryList()
    this.set('result', data || [])
  }
}
