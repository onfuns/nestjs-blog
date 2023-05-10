import { PropsWithChildren, Suspense, useEffect } from 'react'

import '@/styles/global.less'
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'uno.css'

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

const Container = observer((props: PropsWithChildren) => {
  const { headerStore } = useStore()
  const { pathname, search } = useLocation()

  useEffect(() => {
    const router = flatRoutes?.find((item) => item.path === pathname)
    headerStore.updateTab({ ...router, search })
    headerStore.setCurrentTabPath(pathname)
  }, [pathname])

  return (
    <ValidateLogin>
      <div className="flex overflow-hidden h-100vh">
        <PageMenu store={headerStore} />
        <div className="w-100%">
          <PageHeader />
          <TagPanel />

          <div className="flex-1">
            <div className="overflow-auto h-[calc(100vh-90px)] border-10 border-solid border-#f0f2f5;">
              <AliveScope>{props.children}</AliveScope>
            </div>
          </div>
        </div>
      </div>
    </ValidateLogin>
  )
})

const Loading = () => <div>loading...</div>

function Layout(props: PropsWithChildren) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const current = flatRoutes.find((router) => router.path === pathname)
  if (current?.redirect) {
    navigate({ pathname: current?.redirect })
    return null
  }

  return (
    <Provider>
      <ConfigProvider locale={zhCN}>
        <Suspense fallback={<Loading />}>
          {current?.layout === false ? props.children : <Container {...props} />}
        </Suspense>
      </ConfigProvider>
    </Provider>
  )
}

export default Layout
