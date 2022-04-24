import { Provider } from 'mobx-react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import * as store from '@/store'
import '@/styles/global.less'
import styles from './style.less'
import { Header, Menu, TagPanel } from '..'

const Container = props => {
  return (
    <div className={styles.container}>
      <Header {...props} />
      <div className={styles.pageContent}>
        <Menu />
        <div className={styles.contentBody}>
          <TagPanel {...props} />
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
