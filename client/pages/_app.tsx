import { Provider } from 'mobx-react'
import { ConfigProvider } from 'antd'
import antd_zh_CN from 'antd/lib/locale/zh_CN'
import '@fontsource/jetbrains-mono'
import { useStore } from '@/hooks'
import { isServer } from '@/utils/util'
import App from 'next/app'
import { RootStore } from '@/store'
import PageHeader from '@/components/Layout/Header'
import PageFooter from '@/components/Layout/Footer'
import '@/styles/global.css'
import '@/utils/dayjs'

export default function CustomApp({ Component, pageProps = {}, initialMobxState }) {
  const stores = isServer ? initialMobxState : useStore()

  return (
    <Provider {...stores}>
      <ConfigProvider locale={antd_zh_CN}>
        <PageHeader />
        <div className="main-container">
          <Component {...pageProps} />
        </div>
        <PageFooter />
      </ConfigProvider>
    </Provider>
  )
}

CustomApp.getInitialProps = async function (appContext) {
  const mobxStore = RootStore
  appContext.ctx.req.mobxStore = RootStore
  const appProps = await App.getInitialProps(appContext)
  return {
    ...appProps,
    initialMobxState: mobxStore,
  }
}
