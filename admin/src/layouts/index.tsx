import { ReactChildren } from 'react'
import { Provider } from 'mobx-react'
import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import '@/styles/global.less'
message.config({ maxCount: 1 })

export default function Layout(props: { children: ReactChildren }) {
  return (
    <Provider>
      <ConfigProvider locale={zhCN}>{props.children}</ConfigProvider>
    </Provider>
  )
}
