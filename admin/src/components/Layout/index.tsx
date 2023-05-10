import { Suspense, useEffect } from 'react'

import '@/styles/global.less'
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'uno.css'
import styles from './style.module.less'

import { useStore } from '@/hooks'
import { observer, Provider } from 'mobx-react'
import { AliveScope } from 'react-activation'
import { useLocation, useNavigate } from 'react-router-dom'

import { flatRoutes } from '@/routes'
import PageHeader from './PageHeader'
import PageMenu from './PageMenu'
import TagPanel from './TagPanel'
import ValidateLogin from './ValidateLogin'

message.config({ maxCount: 1 })

function Container(props) {
  const { headerStore } = useStore()
  const location = useLocation()
  const { pathname, search } = location

  useEffect(() => {
    const router = flatRoutes?.find((item) => item.path === pathname)
    headerStore.updateTab({ ...router, search })
    headerStore.setCurrentTabPath(pathname)
  }, [pathname])

  return (
    <ValidateLogin>
      <div className="flex">
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
    </ValidateLogin>
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

  return (
    <Provider>
      <ConfigProvider locale={zhCN}>
        <Suspense fallback={<div>loading..</div>}>
          {current?.layout === false ? props.children : <Container {...props} />}
        </Suspense>
      </ConfigProvider>
    </Provider>
  )
}

export default observer(Layout)
