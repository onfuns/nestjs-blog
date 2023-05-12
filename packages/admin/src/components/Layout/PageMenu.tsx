import Logo from '@/public/images/logo.png'
import { baseRoutes } from '@/routes'
import { AppstoreOutlined, HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import classnames from 'classnames'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function LayoutMenu({ menuCollapsed }: { menuCollapsed: boolean }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const getOpenKeys = () => {
    const paths = pathname
      .slice(1)
      .split('/')
      .map((url) => `/${url}`)
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
    const subRoute = children?.map((child) => ({
      label: child.name,
      key: child.path,
    }))
    return { label: name, key: path, children: subRoute, icon: renderIcon(path) }
  })

  return (
    <div
      className={classnames('relative w-200 flex-shrink-0 bg-#fff', {
        'w-auto collapsed-menu': menuCollapsed,
      })}
    >
      <div className="flex text-size-16 py-16 pl-20 color-#001529 border-right-1-solid-#f0f0f0">
        <img src={Logo} className="w-24 h-24" />
        {!menuCollapsed && <h1 className="ml-10 text-size-18 fw-600">管理后台</h1>}
      </div>
      <div className="h-[calc(100vh-80px)] overflow-y-auto">
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={menuCollapsed}
          openKeys={openKeys}
          selectedKeys={[pathname]}
          onOpenChange={(keys) => setOpenKeys([...keys])}
          items={menuItems}
          onClick={(e) => navigate(e.key)}
        />
      </div>
    </div>
  )
}
