import { makeAutoObservable } from 'mobx'
import { getAuthList, addAuth, updateAuth, deleteAuth } from '@/actions/auth'

export class AuthStore {
  result: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'result', value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { data } = await getAuthList(params)
    if (data) {
      this.set('result', data)
    }
  }

  async update(params?: Record<string, any>) {
    return await updateAuth(params)
  }

  async add(params?: Record<string, any>) {
    return await addAuth(params)
  }

  async delete(params?: Record<string, any>) {
    return await deleteAuth(params)
  }
}

export default new AuthStore()
