import { makeAutoObservable } from 'mobx'
import { getUserList, deleteUser, updateUser, addUser, loginUser } from '@/actions/user'

export class UserStore {
  result: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'result', value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { data } = await getUserList(params)
    if (data) {
      this.set('result', data)
    }
  }

  async update(id: number, params?: Record<string, any>) {
    return await updateUser(id, params)
  }

  async add(params?: Record<string, any>) {
    return await addUser(params)
  }

  async delete(id: number) {
    return await deleteUser(id)
  }

  async login(params?: Record<string, any>) {
    return await loginUser(params)
  }
}

export default new UserStore()
