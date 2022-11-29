import { useEffect } from 'react'
import styles from './style.module.less'
import { getLocalUser, logoutUser } from '@/actions/user'
import { useLocation } from 'react-router-dom'
import { observer } from 'mobx-react'
import { useStore } from '@/hooks'
import { Menu, Dropdown } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import AvatarImage from '@/public/images/avatar.png'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { flatRoutes } from '@/routes'

function PageHeader() {
  const { headerStore } = useStore()
  const { updateTab, setCurrentTabPath, menuCollapsed, setMenuCollaps } = headerStore
  const { userName } = getLocalUser()
  const location = useLocation()

  const { pathname, search } = location
  useEffect(() => {
    const router = flatRoutes?.find((item: any) => item.path === pathname) || {}
    updateTab({ ...router, search })
    setCurrentTabPath(pathname)
  }, [pathname])

  const MenuIcon = menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined

  return (
    <div className={styles.header}>
      <MenuIcon onClick={setMenuCollaps} style={{ fontSize: 17 }} />
      <div className={styles.tools}>
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  key: 'logout',
                  icon: <LogoutOutlined style={{ marginRight: 5 }} />,
                  label: <a onClick={logoutUser}>退出</a>,
                },
              ]}
            ></Menu>
          }
          trigger={['click']}
        >
          <a className={styles.username}>
            <img src={AvatarImage} className={styles.avatar} />
            {userName}
          </a>
        </Dropdown>
      </div>
    </div>
  )
}

export default observer(PageHeader)
