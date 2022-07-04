import { makeAutoObservable } from 'mobx'
import { getRoleList, addRole, updateRole, deleteRole } from '@/actions/role'

export class RoleStore {
  result: any[] = []
  detail: any = {}

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'result' | 'detail', value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { data } = await getRoleList(params)
    if (data) {
      this.set('result', data)
      if (!this.detail.id) this.set('detail', data?.[0] || {})
    }
  }

  async update(id: number, params?: Record<string, any>) {
    return await updateRole(id, params)
  }

  async add(params?: Record<string, any>) {
    return await addRole(params)
  }

  async delete(id: number) {
    return await deleteRole(id)
  }
}

export default new RoleStore()
