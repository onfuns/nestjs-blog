import React, { useState } from 'react'
import { Link, useLocation } from 'umi'
import { Menu } from 'antd'
import styles from './style.less'
import { baseRoutes } from '@/routes'
import { inject, observer } from 'mobx-react'
import { HeaderStore } from '@/store'
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import classnames from 'classnames'

const SubMenu = Menu.SubMenu
const MenuComp = ({ headerStore }: { headerStore?: HeaderStore }) => {
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
      home: HomeOutlined,
      portal: AppstoreOutlined,
      setting: SettingOutlined,
    }
    return icon ? React.createElement(icons[icon]) : null
  }

  const renderMenu = (list: any[]) => {
    const renderMenuItem = item => (
      <Menu.Item key={item.path} icon={renderIcon(item.icon)}>
        <Link to={item.path}>{item.name}</Link>
      </Menu.Item>
    )

    return list.map(item => {
      if (item?.children?.length) {
        return (
          <SubMenu key={item.path} title={item.name} icon={renderIcon(item.icon)}>
            {item.children.map(renderMenuItem)}
          </SubMenu>
        )
      }
      return renderMenuItem(item)
    })
  }

  const { menuCollapsed } = headerStore

  return (
    <div
      className={classnames(styles.menu, {
        [styles.collapsedMenu]: menuCollapsed,
      })}
    >
      <div className={styles.logoText}>
        <img src="http://preview.ballcat.cn/assets/logo.f9330552.svg" />
        {!menuCollapsed && <h1>后台</h1>}
      </div>
      <div className={styles.menuTree}>
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={menuCollapsed}
          openKeys={openKeys}
          selectedKeys={[pathname]}
          onOpenChange={keys => setOpenKeys([...keys])}
        >
          {renderMenu(baseRoutes)}
        </Menu>
      </div>
    </div>
  )
}
export default inject('headerStore')(observer(MenuComp))
