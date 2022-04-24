import { makeAutoObservable } from 'mobx'
import { getCategoryList } from '@/actions/category'

export class CategoryStore {
  data = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'data', value) {
    this[key] = value
  }

  async get() {
    const { data } = await getCategoryList()
    this.set('data', data || [])
  }
}

export default new CategoryStore()
