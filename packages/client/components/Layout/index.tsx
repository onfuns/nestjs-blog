import { useStore } from '@/hooks'
import { isServer } from '@/utils'
import '@/utils/dayjs'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { Provider } from 'mobx-react'
import Footer from './Footer'
import Header from './Header'

export default function Layout({ Component, pageProps = {}, initialMobxState }: any) {
  const stores = isServer ? initialMobxState : useStore()

  const antdConfig: React.ComponentProps<typeof ConfigProvider> = {
    theme: {
      token: {
        colorPrimary: '#ff502c',
      },
    },
    locale: zhCN,
  }

  return (
    <Provider {...stores}>
      <ConfigProvider {...antdConfig}>
        <Header />
        <div className="flex flex-1 justify-center bg-#f4f5f5 min-h-[calc(100vh-80px)] pt-20">
          <Component {...pageProps} />
        </div>
        <Footer />
      </ConfigProvider>
    </Provider>
  )
}
