import { makeAutoObservable } from 'mobx'
import { getAuthList, addAuth, updateAuth, deleteAuth } from '@/actions/auth'

export class AuthStore {
  result: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<AuthStore>, value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { data } = await getAuthList(params)
    if (data) {
      this.set('result', data)
    }
  }

  async update(id: number, params?: Record<string, any>) {
    return await updateAuth(id, params)
  }

  async add(params?: Record<string, any>) {
    return await addAuth(params)
  }

  async delete(id: number) {
    return await deleteAuth(id)
  }
}

export default new AuthStore()
