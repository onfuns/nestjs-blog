import { makeAutoObservable } from 'mobx'
import { getRoleList, addRole, updateRole, deleteRole } from '@/actions/role'

export class RoleStore {
  result: any[] = []
  detail: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  set(key: string, value: any) {
    this[key] = value
  }

  async get(params = {}) {
    const { success, data } = await getRoleList(params)
    if (success) {
      this.result = data
      if (!this.detail.id && data.length) this.setCurrentDetail(data[0])
    }
  }

  setCurrentDetail(record) {
    this.set('detail', record)
  }

  async update(params = {}) {
    return await updateRole(params)
  }

  async add(params = {}) {
    return await addRole(params)
  }

  async delete(params = {}) {
    return await deleteRole(params)
  }
}

export default new RoleStore()
