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
  tab: ITabProps[] = []
  menuCollapsed = false
  currentTabPath = ''

  constructor() {
    makeAutoObservable(this)
  }

  updateTab(router: any = {}) {
    if (router.tag === false) return
    //如果有则更新，否则新增
    const index = this.tab.findIndex(t => t.path === router.path)
    if (index > -1) {
      this.tab[index] = { ...this.tab[index], ...router }
    } else {
      this.tab.push(router)
    }
  }

  removeTab(path) {
    const list = this.tab.filter(item => item.path !== path)
    this.tab = [...list]
  }

  setCurrentTabPath(path) {
    this.currentTabPath = path
  }

  setMenuCollaps() {
    this.menuCollapsed = !this.menuCollapsed
  }
}
