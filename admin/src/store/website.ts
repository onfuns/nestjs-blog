import { makeAutoObservable } from 'mobx'
import { getWebsiteConfig, updateWebsiteConfig } from '@/actions/website'

export class WebsiteStore {
  result: any[] = []

  constructor() {
    makeAutoObservable(this)
  }

  set(key: keyof NonFunctionProperties<WebsiteStore>, value: any) {
    this[key] = value
  }

  async get(params?: Record<string, any>) {
    const { data } = await getWebsiteConfig(params)
    if (data) {
      this.set('result', data)
    }
  }

  async update(params?: Record<string, any>) {
    return await updateWebsiteConfig(params)
  }
}
