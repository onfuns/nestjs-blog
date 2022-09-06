import { ReactChildren } from 'react'
import { Provider } from 'mobx-react'
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'

import '@/styles/global.less'
import { AliveScope } from 'react-activation'

message.config({ maxCount: 1 })

const Layout = (props: { children: ReactChildren }) => {
  return (
    <Provider>
      <AliveScope>
        <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>
      </AliveScope>
    </Provider>
  )
}

export default Layout
