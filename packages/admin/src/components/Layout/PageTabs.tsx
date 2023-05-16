import { useHistory } from '@/hooks'
import { routes } from '@/routes'
import { HeaderStore } from '@/store'
import { Tabs } from 'antd'
import { useEffect } from 'react'
import './style.less'

export default function PageTabs({ store }: { store: HeaderStore }) {
  const history = useHistory()
  const { removeTab, updateTab, setCurrentTabPath, tabs, currentTabPath } = store

  const { pathname, search } = history.location

  useEffect(() => {
    const router = routes?.find((item: any) => item.path === pathname) || {}
    updateTab({ ...router, search })
    setCurrentTabPath(pathname)
  }, [pathname])

  const onTabChange = ({ path }) => {
    const { search } = tabs.find((t) => t.path === path) || {}
    history.push({ pathname: path, search: history.searchToString(search) })
  }

  const onTabClose = (path) => {
    removeTab(path)
    const index = tabs.findIndex((t) => t.path === path)
    //如果关闭的是第一个则定位后一个，否则定位第一个
    const router = index === 0 ? tabs[1] : tabs[0]
    onTabChange(router)
  }

  return (
    <div className="tag-panel-component relative">
      <Tabs
        activeKey={currentTabPath}
        type="editable-card"
        hideAdd
        onChange={(path) => onTabChange({ path })}
        onEdit={onTabClose}
        animated={false}
      >
        {tabs.map((t) => (
          <Tabs.TabPane tab={t.name} closable={tabs.length !== 1} key={t.path} />
        ))}
      </Tabs>
    </div>
  )
}
