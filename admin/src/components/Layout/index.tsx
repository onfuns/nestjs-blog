import { Provider } from 'mobx-react'
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import * as store from '@/store'
import '@/styles/global.less'
import { AliveScope } from 'react-activation'

message.config({ maxCount: 1 })

const Layout = props => {
  return (
    <Provider {...store}>
      <AliveScope>
        <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>
      </AliveScope>
    </Provider>
  )
}

export default Layout
