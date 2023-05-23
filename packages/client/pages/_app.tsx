import Layout from '@/components/Layout'
import { RootStore } from '@/store'
import '@/styles/global.css'
import '@fontsource/jetbrains-mono'
import App from 'next/app'
import 'uno.css'

export default function CustomApp(props) {
  return <Layout {...props} />
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
