import { ConfigProvider, message } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import React from 'react'
message.config({ maxCount: 1 })

export default function AntdProvider(props: React.PropsWithChildren) {
  const antdConfig = {
    theme: {
      token: {
        colorPrimary: '#00b96b',
      },
    },
    locale: zhCN,
  }

  return <ConfigProvider {...antdConfig}>{props.children}</ConfigProvider>
}
