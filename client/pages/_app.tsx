import '@fontsource/jetbrains-mono'
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import initializeStore from '@/store'
import { isServer } from '@/utils/util'
import App from 'next/app'
import AOS from 'aos'
import 'aos/dist/aos.css'
import '@/styles/global.css'
import '@/utils/dayjs'

const CustomApp = ({ Component, pageProps = {}, initialMobxState }) => {
  useEffect(() => {
    AOS.init()
  }, [])

  const stores = isServer ? initialMobxState : initializeStore()

  return (
    <Layout store={stores}>
      <Layout.Header />
      <div className="main-page-content">
        <Component {...pageProps} />
      </div>
      <Layout.Footer />
    </Layout>
  )
}

CustomApp.getInitialProps = async function (appContext) {
  const mobxStore = initializeStore()
  appContext.ctx.req.mobxStore = mobxStore
  const appProps = await App.getInitialProps(appContext)
  return {
    ...appProps,
    initialMobxState: mobxStore,
  }
}

export default CustomApp
