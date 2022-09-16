import { Tabs } from 'antd'
import { history } from 'umi'
import { toJS } from 'mobx'
import styles from './style.module.less'
import { useStore } from '@/hooks'
import { observer } from 'mobx-react'

export default observer(() => {
  const { headerStore } = useStore()

  const onTabChange = ({ path }) => {
    const { state, search } = headerStore?.tab.find(t => t.path === path) || {}
    history.push({ pathname: path, state: state ? toJS(state) : undefined, search })
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
