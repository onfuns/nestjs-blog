import { makeAutoObservable } from 'mobx'

export class HeaderStore {
  tagsPanel: any[] = []
  menuCollapsed: boolean = false

  constructor() {
    makeAutoObservable(this)
  }

  updateTagsPanel = (route: any = {}, type?: string) => {
    if (type === 'remove') {
      const list = this.tagsPanel.filter((item: any) => item.path !== route.path)
      this.tagsPanel = [...list]
    } else if (type === 'removeAll') {
      this.tagsPanel = []
    } else {
      if (this.tagsPanel.some(item => item.path === route.path) || route.tag === false) return
      this.tagsPanel = [...this.tagsPanel, route]
    }
  }

  setMenuCollaps() {
    this.menuCollapsed = !this.menuCollapsed
  }
}

export default new HeaderStore()
