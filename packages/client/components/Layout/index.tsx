import { useStore } from '@/hooks'
import { isServer } from '@/utils'
import '@/utils/dayjs'
import { ConfigProvider } from 'antd'
import antd_zh_CN from 'antd/lib/locale/zh_CN'
import { Provider } from 'mobx-react'
import PageFooter from './PageFooter'
import PageHeader from './PageHeader'

export default function Layout({ Component, pageProps = {}, initialMobxState }: any) {
  const stores = isServer ? initialMobxState : useStore()

  return (
    <Provider {...stores}>
      <ConfigProvider locale={antd_zh_CN}>
        <PageHeader />
        <div className="flex flex-1 justify-center bg-#f4f5f5 min-h-[calc(100vh-40px)] pt-60 pb-30">
          <Component {...pageProps} />
        </div>
        <PageFooter />
      </ConfigProvider>
    </Provider>
  )
}
