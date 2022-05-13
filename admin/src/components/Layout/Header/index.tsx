import { Menu, Dropdown } from 'antd'
import { getLocalUser, removeLocalUser } from '@/actions/user'
import styles from './style.less'
import { LogoutOutlined } from '@ant-design/icons'
import { history } from 'umi'
import AvatarImage from '@/assets/images/avatar.png'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { inject, observer } from 'mobx-react'

const Header = ({ headerStore }) => {
  const onLogout = () => {
    removeLocalUser()
    history.push('/login')
  }

  const { userName = 'demo' } = getLocalUser()
  const MenuIcon = headerStore.menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined
  return (
    <div className={styles.header}>
      <div>
        <MenuIcon onClick={() => headerStore.setMenuCollaps()} style={{ fontSize: 17 }} />
      </div>
      <div className={styles.tools}>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={1} className={styles.menuItem}>
                <a onClick={onLogout}>
                  <LogoutOutlined style={{ marginRight: 5 }} />
                  退出
                </a>
              </Menu.Item>
            </Menu>
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
  )
}

export default inject('headerStore')(observer(Header))
