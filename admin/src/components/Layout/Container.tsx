import { useEffect, useState, ReactChildren } from 'react'
import styles from './style.module.less'
import LayoutMenu from './Menu'
import { getLocalUser, logoutUser } from '@/actions/user'
import { history } from 'umi'
import { observer } from 'mobx-react'
import { useStore } from '@/hooks'
import { Tabs, Menu, Dropdown } from 'antd'
import { toJS } from 'mobx'
import { LogoutOutlined } from '@ant-design/icons'
import AvatarImage from '@/assets/images/avatar.png'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'

export default observer((props: { children: ReactChildren; route: { routes: any[] } }) => {
  const [login, setLogin] = useState(false)
  const { headerStore } = useStore()
  const {
    removeTab,
    updateTab,
    setCurrentTabPath,
    tabs,
    currentTabPath,
    menuCollapsed,
    setMenuCollaps,
  } = headerStore
  const { userName, token } = getLocalUser()

  useEffect(() => {
    if (token) {
      setLogin(true)
    } else {
      logoutUser()
    }
  }, [])

  const { pathname, state, search } = history.location
  useEffect(() => {
    const router = props.route.routes?.find((item: any) => item.path === pathname) || {}
    updateTab({ ...router, state, search })
    setCurrentTabPath(pathname)
  }, [pathname])

  const onTabChange = ({ path }) => {
    const { state, search } = tabs.find(t => t.path === path) || {}
    history.push({ pathname: path, state: state ? toJS(state) : undefined, search })
  }

  const onTabClose = path => {
    removeTab(path)
    const index = tabs.findIndex(t => t.path === path)
    //如果关闭的是第一个则定位后一个，否则定位第一个
    const router = index === 0 ? tabs[1] : tabs[0]
    onTabChange(router)
  }

  const MenuIcon = menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined

  return login ? (
    <div className={styles.container}>
      <LayoutMenu store={headerStore} />
      <div className={styles.pageContent}>
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
              <div className={styles.username}>
                <img src={AvatarImage} className={styles.avatar} />
                {userName}
              </div>
            </Dropdown>
          </div>
        </div>

        <div className={styles.mutilTab}>
          <Tabs
            activeKey={currentTabPath}
            type="editable-card"
            hideAdd
            onChange={path => onTabChange({ path })}
            onEdit={onTabClose}
            animated={false}
          >
            {tabs.map(t => (
              <Tabs.TabPane tab={t.name} closable={tabs.length !== 1} key={t.path} />
            ))}
          </Tabs>
        </div>

        <div className={styles.contentBody}>
          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </div>
  ) : null
})
