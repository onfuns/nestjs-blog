import '@fontsource/jetbrains-mono'
import Layout from '@/components/Layout'
import initializeStore from '@/store'
import { isServer } from '@/utils/util'
import App from 'next/app'
import '@/styles/global.css'
import '@/utils/dayjs'

const CustomApp = ({ Component, pageProps = {}, initialMobxState }) => {
  const stores = isServer ? initialMobxState : initializeStore()

  return (
    <Layout store={stores}>
      <Layout.Header />
      <div className="main-container">
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
