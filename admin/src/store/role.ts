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

  async get(params?: Record<string, any>) {
    const { success, data } = await getRoleList(params)
    if (success) {
      this.set('result', data)
      if (!this.detail.id) this.set('detail', data?.[0] || {})
    }
  }

  async update(params?: Record<string, any>) {
    return await updateRole(params)
  }

  async add(params?: Record<string, any>) {
    return await addRole(params)
  }

  async delete(params?: Record<string, any>) {
    return await deleteRole(params)
  }
}

export default new RoleStore()
