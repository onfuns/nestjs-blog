import { makeAutoObservable } from 'mobx'
import { getDashboardData } from '@/actions/common'

type IDashboardInfoProps = {
  article?: { count: number }
  comment?: { count: number; data: any[] }
  user?: Record<any, string>
}

export class CommonStore {
  dashboardInfo: IDashboardInfoProps = {}

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<CommonStore>, value: any) {
    this[key] = value
  }

  async getDashboardData(params?: Record<string, any>) {
    const { data } = await getDashboardData(params)
    if (data) {
      this.set('dashboardInfo', data)
    }
  }
}
