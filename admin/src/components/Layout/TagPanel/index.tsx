import { useEffect } from 'react'
import styles from './style.module.less'
import { useNavigate, useLocation, createSearchParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import { useStore } from '@/hooks'
import { Tabs } from 'antd'
import { flatRoutes } from '@/routes'

function TagPanel() {
  const { headerStore } = useStore()
  const { removeTab, updateTab, setCurrentTabPath, tabs, currentTabPath } = headerStore
  const navigate = useNavigate()
  const location = useLocation()

  const { pathname, search } = location
  useEffect(() => {
    const router = flatRoutes?.find((item: any) => item.path === pathname) || {}
    updateTab({ ...router, search })
    setCurrentTabPath(pathname)
  }, [pathname])

  const onTabChange = ({ path }) => {
    const { search } = tabs.find(t => t.path === path) || {}
    navigate({ pathname: path, search: createSearchParams(search).toString() })
  }

  const onTabClose = path => {
    removeTab(path)
    const index = tabs.findIndex(t => t.path === path)
    //如果关闭的是第一个则定位后一个，否则定位第一个
    const router = index === 0 ? tabs[1] : tabs[0]
    onTabChange(router)
  }

  return (
    <div className={styles.mutilTab}>
      <Tabs
        activeKey={currentTabPath}
        type="editable-card"
        hideAdd
        onChange={path => onTabChange({ path })}
        onEdit={onTabClose}
        animated={false}
      >
        {tabs.map(t => (
          <Tabs.TabPane tab={t.name} closable={tabs.length !== 1} key={t.path} />
        ))}
      </Tabs>
    </div>
  )
}

export default observer(TagPanel)
