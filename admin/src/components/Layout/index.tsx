import { useEffect } from 'react'

import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import '@/styles/global.less'
import 'uno.css'
import styles from './style.module.less'

import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import { useStore } from '@/hooks'
import { AliveScope } from 'react-activation'

import Auth from './Auth'
import PageMenu from './PageMenu'
import PageHeader from './PageHeader'
import TagPanel from './TagPanel'
import { flatRoutes } from '@/routes'

message.config({ maxCount: 1 })

function Container(props) {
  const { headerStore } = useStore()
  const { updateTab, setCurrentTabPath } = headerStore
  const location = useLocation()
  const { pathname, search } = location

  useEffect(() => {
    const router = flatRoutes?.find((item: any) => item.path === pathname) || {}
    updateTab({ ...router, search })
    setCurrentTabPath(pathname)
  }, [pathname])
  return (
    <Auth>
      <div className={styles.container}>
        <PageMenu store={headerStore} />
        <div className={styles.pageContent}>
          <PageHeader />
          <TagPanel />

          <div className={styles.contentBody}>
            <div className={styles.content}>
              <AliveScope>{props.children}</AliveScope>
            </div>
          </div>
        </div>
      </div>
    </Auth>
  )
}

function Layout(props) {
  const location = useLocation()
  const navigate = useNavigate()
  const current = flatRoutes.find((r: { path: any }) => r.path === location.pathname)
  if (current?.redirect) {
    navigate({ pathname: current?.redirect })
    return null
  }

  console.log(props)

  return (
    <Provider>
      <ConfigProvider locale={zhCN}>
        {current?.layout === false ? props.children : <Container {...props} />}
      </ConfigProvider>
    </Provider>
  )
}

export default observer(Layout)
