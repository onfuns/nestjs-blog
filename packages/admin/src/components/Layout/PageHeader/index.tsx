import { getLocalUser, logoutUser } from '@/actions/user'
import { useStore } from '@/hooks'
import AvatarImage from '@/public/images/avatar.png'
import { flatRoutes } from '@/routes'
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Dropdown, Menu } from 'antd'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './style.module.less'

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
