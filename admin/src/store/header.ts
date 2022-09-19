import { makeAutoObservable } from 'mobx'
import React from 'react'

export type ITabProps = {
  compoent: React.Component
  exact: boolean
  name: string
  path: string
  state: Record<string, any> | undefined
  search: string
  tag?: boolean
}

export class HeaderStore {
  tabs: ITabProps[] = []
  menuCollapsed = false
  currentTabPath = ''

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  updateTab(router: any = {}) {
    if (router.tag === false) return
    //如果有则更新，否则新增
    const index = this.tabs.findIndex(t => t.path === router.path)
    if (index > -1) {
      this.tabs[index] = { ...this.tabs[index], ...router }
    } else {
      this.tabs.push(router)
    }
  }

  removeTab(path) {
    this.tabs = [...this.tabs.filter(item => item.path !== path)]
  }

  setCurrentTabPath(path) {
    this.currentTabPath = path
  }

  setMenuCollaps() {
    this.menuCollapsed = !this.menuCollapsed
  }
}
