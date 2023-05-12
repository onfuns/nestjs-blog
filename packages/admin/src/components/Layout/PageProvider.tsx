import { ConfigProvider, message, Spin } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { Provider } from 'mobx-react'
import React, { Suspense } from 'react'
message.config({ maxCount: 1 })

export default function LayoutProvider(props: React.PropsWithChildren) {
  const antdConfig: React.ComponentProps<typeof ConfigProvider> = {
    theme: {
      token: {
        colorPrimary: '#52c41a',
      },
    },
    locale: zhCN,
  }

  return (
    <Provider>
      <ConfigProvider {...antdConfig}>
        <Suspense
          fallback={
            <div className="h-100vh flex-center">
              <Spin spinning={true} />
            </div>
          }
        >
          {props.children}
        </Suspense>
      </ConfigProvider>
    </Provider>
  )
}
