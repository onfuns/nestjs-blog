import Header from '@/components/Layout/Header'
import Menu from '@/components/Layout/Menu'
import { Provider } from 'mobx-react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import store from '@/store'
import styles from './style.module.less'
import 'reset-css/reset.css'

const Container = props => {
  return (
    <div className={styles.main}>
      <Menu />
      <div className={styles.mainContent}>
        <Header {...props} />
        <div className={styles.contentBody}>
          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </div>
  )
}

const Layout = props => {
  const { route, location } = props
  const current = route.routes.find(r => r.path === location.pathname)
  return (
    <Provider {...store}>
      <ConfigProvider locale={zhCN}>
        {current?.layout === false ? props.children : <Container {...props} />}
      </ConfigProvider>
    </Provider>
  )
}

export default Layout
