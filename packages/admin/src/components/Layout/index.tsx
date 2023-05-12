import { useStore } from '@/hooks'
import { routes } from '@/routes'
import '@/styles/global.less'
import { Spin } from 'antd'
import { observer, Provider } from 'mobx-react'
import { PropsWithChildren, Suspense, useEffect } from 'react'
import { AliveScope } from 'react-activation'
import { useLocation, useNavigate } from 'react-router-dom'
import 'uno.css'
import AntdProvider from './AntdProvider'
import PageHeader from './PageHeader'
import PageMenu from './PageMenu'
import TagPanel from './TagPanel'
import ValidateLogin from './ValidateLogin'

const Container = observer((props: PropsWithChildren) => {
  const { headerStore: store } = useStore()
  const { pathname, search } = useLocation()

  useEffect(() => {
    const router = routes?.find((item) => item.path === pathname)
    store.updateTab({ ...router, search })
    store.setCurrentTabPath(pathname)
  }, [pathname])

  return (
    <ValidateLogin>
      <div className="flex overflow-hidden h-100vh">
        <PageMenu menuCollapsed={store.menuCollapsed} />
        <div className="w-100%">
          <PageHeader store={store} />
          <TagPanel store={store} />

          <div className="flex-1">
            <div className="overflow-auto h-[calc(100vh-90px)] border-10 border-solid border-#f0f2f5">
              <AliveScope>{props.children}</AliveScope>
            </div>
          </div>
        </div>
      </div>
    </ValidateLogin>
  )
})

export default function Layout(props: PropsWithChildren) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const current = routes.find((router) => router.path === pathname)
  if (current?.redirect) {
    navigate({ pathname: current?.redirect })
    return null
  }

  return (
    <Provider>
      <AntdProvider>
        <Suspense
          fallback={
            <div className="h-100vh flex-center">
              <Spin spinning={true} />
            </div>
          }
        >
          {current?.layout === false ? props.children : <Container {...props} />}
        </Suspense>
      </AntdProvider>
    </Provider>
  )
}
