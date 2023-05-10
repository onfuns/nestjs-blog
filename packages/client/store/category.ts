import { getCategoryList } from '@/actions/category'
import { makeAutoObservable } from 'mobx'

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
