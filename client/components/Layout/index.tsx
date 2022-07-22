import HtmlHead from '@/components/Layout/HtmlHead'
import { ConfigProvider } from 'antd'
import antd_zh_CN from 'antd/lib/locale/zh_CN'
import { Provider } from 'mobx-react'
import Header from './Header'
import Footer from './Footer'
export default function Layout({ store, children }) {
  return (
    <Provider {...store}>
      <ConfigProvider locale={antd_zh_CN}>
        <HtmlHead />
        {children}
      </ConfigProvider>
    </Provider>
  )
}

Layout.Header = Header
Layout.Footer = Footer
