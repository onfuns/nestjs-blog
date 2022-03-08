import React, { useState } from 'react'
import { Link, useLocation } from 'umi'
import { Menu } from 'antd'
import styles from './style.less'
import { adminRoutes } from '@/routes'
import { inject, observer } from 'mobx-react'
import { HeaderStore } from '@/store'
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
import classnames from 'classnames'

const SubMenu = Menu.SubMenu
const MenuComp = ({ headerStore }: { headerStore?: HeaderStore }) => {
  const { pathname } = useLocation()
  const pathArr = pathname
    .slice(1)
    .split('/')
    .map(url => `/${url}`)
  const [openKeys, setOpenKeys] = useState([pathArr?.[0]])

  const onOpenChange = openKeys => {
    setOpenKeys([...openKeys])
  }

  const renderIcon = (icon: string) => {
    const icons = {
      home: HomeOutlined,
      post: AppstoreOutlined,
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
      <div className={styles.logoText}>Nest-Blog</div>
      <Menu
        style={{ flex: 1 }}
        mode="inline"
        theme="light"
        inlineCollapsed={menuCollapsed}
        openKeys={openKeys}
        selectedKeys={[pathname]}
        onOpenChange={onOpenChange}
      >
        {renderMenu(adminRoutes)}
      </Menu>
    </div>
  )
}
export default inject('headerStore')(observer(MenuComp))
