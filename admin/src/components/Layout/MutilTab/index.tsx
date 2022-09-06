import { useEffect } from 'react'
import { Tabs } from 'antd'
import { observer } from 'mobx-react'
import { history } from 'umi'
import { toJS } from 'mobx'
import styles from './style.module.less'
import { useStore } from '@/hooks'

export default observer((props: { routes: any[] }) => {
  const { headerStore } = useStore()
  const { pathname, state, search } = history.location

  const onTabChange = ({ path }) => {
    const { state, search } = headerStore?.tab.find(t => t.path === path) || {}
    history.push({ pathname: path, state: state ? toJS(state) : undefined, search })
  }

  useEffect(() => {
    onChangeRouter(pathname, { state, search })
  }, [pathname])

  //params 为 state,search 集合，每次更新路由都更新到最新的数组里缓存
  const onChangeRouter = (path, { state, search = '' }) => {
    const router = props.routes?.find((item: any) => item.path === path) || {}
    headerStore?.updateTab({ ...router, state, search })
    headerStore?.setCurrentTabPath(path)
  }

  const onClose = path => {
    headerStore.removeTab(path)
    const index = tab.findIndex(t => t.path === path)
    //如果关闭的是第一个则定位后一个，否则定位第一个
    const router = index === 0 ? tab[1] : tab[0]
    onTabChange(router)
  }

  const { tab = [], currentTabPath } = headerStore
  return tab.length ? (
    <div className={styles.mutilTab}>
      <Tabs
        style={{ background: '#fff' }}
        activeKey={currentTabPath}
        type="editable-card"
        hideAdd
        onChange={path => onTabChange({ path })}
        onEdit={onClose}
        animated={false}
      >
        {tab.map(t => (
          <Tabs.TabPane tab={t.name} closable={tab.length !== 1} key={t.path} />
        ))}
      </Tabs>
    </div>
  ) : null
})
