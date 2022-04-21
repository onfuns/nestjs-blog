import { makeAutoObservable } from 'mobx'
import { getCategoryList } from '@/actions/category'

export class CategoryStore {
  list = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'list', value) {
    this[key] = value
  }

  async get() {
    const { data } = await getCategoryList()
    this.set('list', data || [])
  }
}

export default new CategoryStore()
