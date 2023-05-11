import { PropsWithChildren, Suspense } from 'react'

import '@/styles/global.less'
import 'uno.css'

import { useStore } from '@/hooks'
import { observer, Provider } from 'mobx-react'
import { AliveScope } from 'react-activation'
import { useLocation, useNavigate } from 'react-router-dom'

import { routes } from '@/routes'
import { Spin } from 'antd'
import AntdProvider from './AntdProvider'
import PageHeader from './PageHeader'
import PageMenu from './PageMenu'
import TagPanel from './TagPanel'
import ValidateLogin from './ValidateLogin'

const Container = observer((props: PropsWithChildren) => {
  const { headerStore } = useStore()
  const { pathname, search } = useLocation()

  // useEffect(() => {
  //   const router = routes?.find((item) => item.path === pathname)
  //   headerStore.updateTab({ ...router, search })
  //   headerStore.setCurrentTabPath(pathname)
  // }, [pathname])

  return (
    <ValidateLogin>
      <div className="flex overflow-hidden h-100vh">
        <PageMenu store={headerStore} />
        <div className="w-100%">
          <PageHeader />
          <TagPanel />

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

const Loading = () => (
  <div className="h-100vh flex-center">
    <Spin spinning={true} />
  </div>
)

function Layout(props: PropsWithChildren) {
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
        <Suspense fallback={<Loading />}>
          {current?.layout === false ? props.children : <Container {...props} />}
        </Suspense>
      </AntdProvider>
    </Provider>
  )
}

export default Layout
