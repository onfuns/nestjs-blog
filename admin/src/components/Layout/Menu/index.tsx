import React, { useState } from 'react'
import { Link, useLocation } from 'umi'
import { Menu } from 'antd'
import styles from './style.module.less'
import { adminRoutes } from '@/routes'
import { inject, observer } from 'mobx-react'
import { HeaderStore } from '@/store'
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'

const SubMenu = Menu.SubMenu
const MenuComp = ({ headerStore }: { headerStore?: HeaderStore }) => {
  const { pathname } = useLocation()
  const pathArr = pathname
    .slice(1)
    .split('/')
    .map(url => `/${url}`)
  const [openKeys, setOpenKeys] = useState([pathArr?.[0]])
  //TODO临时写法只支持3级菜单
  const len = pathArr.length
  const selectedKeys = pathArr.slice(0, len > 2 ? len - 1 : len).join('')

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

  return (
    <div className={headerStore.menuCollapsed ? styles.collapsedMenu : styles.menu}>
      <div className={styles.logoText}>NestBlog</div>
      <Menu
        style={{ flex: 1 }}
        mode="inline"
        theme="light"
        inlineCollapsed={headerStore.menuCollapsed}
        openKeys={openKeys}
        selectedKeys={[selectedKeys]}
        onOpenChange={onOpenChange}
      >
        {renderMenu(adminRoutes)}
      </Menu>
    </div>
  )
}
export default inject('headerStore')(observer(MenuComp))
