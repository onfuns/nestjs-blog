import { makeAutoObservable } from 'mobx'
import { getDashboardInfo } from '@/actions/common'

type IDashboardInfoProps = {
  article?: { count: number }
  comment?: { count: number; list: any[] }
}

export class CommonStore {
  dashboardInfo: IDashboardInfoProps = {}

  constructor() {
    makeAutoObservable(this)
  }

  set(key: 'dashboardInfo', value: any) {
    this[key] = value
  }

  async getDashboardInfo(params?: Record<string, any>) {
    const { success, data } = await getDashboardInfo(params)
    if (success) {
      this.set('dashboardInfo', data)
    }
  }
}

export default new CommonStore()
