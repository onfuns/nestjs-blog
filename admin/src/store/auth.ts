import { makeAutoObservable } from 'mobx'
import { getAuthList, addAuth, updateAuth, deleteAuth } from '@/actions/auth'

export class AuthStore {
  result: any[] = []
  detail: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  set(key: string, value: any) {
    this[key] = value
  }

  async get(params = {}) {
    const data = await getAuthList(params)
    if (data.success) {
      this.set('result', data.data)
    }
  }

  async update(params = {}) {
    return await updateAuth(params)
  }

  async add(params = {}) {
    return await addAuth(params)
  }

  async delete(params = {}) {
    return await deleteAuth(params)
  }
}

export default new AuthStore()
