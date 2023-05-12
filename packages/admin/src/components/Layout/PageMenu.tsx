import { useHistory } from '@/hooks'
import LogoImage from '@/public/images/logo.png'
import { baseRoutes } from '@/routes'
import { AppstoreOutlined, HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import classnames from 'classnames'
import { createElement, useState } from 'react'

export default function LayoutMenu({ menuCollapsed }: { menuCollapsed: boolean }) {
  const history = useHistory()

  const [currentRoot] = history.location.pathname.slice(1).split('/')
  const [openKeys, setOpenKeys] = useState([`/${currentRoot}`])

  const renderIcon = (icon: string) => {
    const icons = {
      '/dashboard': HomeOutlined,
      '/portal': AppstoreOutlined,
      '/user': UserOutlined,
      '/setting': SettingOutlined,
    }
    return icon ? createElement(icons[icon]) : null
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
        <img src={LogoImage} className="w-24 h-24" />
        {!menuCollapsed && <h1 className="ml-10 text-size-18 fw-600">管理后台</h1>}
      </div>
      <div className="h-[calc(100vh-80px)] overflow-y-auto">
        <Menu
          mode="inline"
          theme="light"
          inlineCollapsed={menuCollapsed}
          openKeys={openKeys}
          selectedKeys={[history.location.pathname]}
          onOpenChange={(keys) => setOpenKeys([...keys])}
          items={menuItems}
          onClick={(e) => history.push(e.key)}
        />
      </div>
    </div>
  )
}
