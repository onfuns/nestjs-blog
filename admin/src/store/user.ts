import { makeAutoObservable } from 'mobx'
import { getUserList, deleteUser, updateUser, addUser, loginUser } from '@/actions/user'

export class UserStore {
  result: any[] = []
  detail: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  async get(params = {}) {
    const data = await getUserList(params)
    if (data.success) {
      this.result = data.data
    }
  }

  async update(params = {}) {
    return await updateUser(params)
  }

  async add(params = {}) {
    return await addUser(params)
  }

  async delete(params = {}) {
    return await deleteUser(params)
  }

  async login(params = {}) {
    return await loginUser(params)
  }
}

export default new UserStore()
