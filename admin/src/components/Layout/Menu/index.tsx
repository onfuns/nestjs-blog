import React, { useState } from 'react'
import { useLocation, history } from 'umi'
import { Menu } from 'antd'
import styles from './style.module.less'
import { baseRoutes } from '@/routes'
import { observer } from 'mobx-react'
import { HomeOutlined, AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import classnames from 'classnames'
import Logo from '@/public/images/logo.png'

function LayoutMenu({ store }) {
  const { pathname } = useLocation()
  const getOpenKeys = () => {
    const paths = pathname
      .slice(1)
      .split('/')
      .map(url => `/${url}`)
    return paths?.[0]
  }
  const [openKeys, setOpenKeys] = useState([getOpenKeys()])

  const renderIcon = (icon: string) => {
    const icons = {
      '/dashboard': HomeOutlined,
      '/portal': AppstoreOutlined,
      '/user': UserOutlined,
      '/setting': SettingOutlined,
    }
    return icon ? React.createElement(icons[icon]) : null
  }

  const menuItems = baseRoutes.map(({ name, path, children }) => {
    const subRoute = children?.map(child => ({
      label: child.name,
      key: child.path,
    }))
    return { label: name, key: path, children: subRoute, icon: renderIcon(path) }
  })

  const { menuCollapsed } = store

  return (
    <div
      className={classnames(styles.menu, {
        [styles.collapsedMenu]: menuCollapsed,
      })}
    >
      <div className={styles.logoText}>
        <img src={Logo} />
        {!menuCollapsed && <h1>管理后台</h1>}
      </div>
      <div className={styles.menuTree}>
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={menuCollapsed}
          openKeys={openKeys}
          selectedKeys={[pathname]}
          onOpenChange={keys => setOpenKeys([...keys])}
          items={menuItems}
          onClick={e => history.push(e.key)}
        />
      </div>
    </div>
  )
}

export default observer(LayoutMenu)
