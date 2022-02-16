import { Menu, Dropdown } from 'antd'
import { LOCAL_USER_TOKEN_KEY, LOCAL_USER_NAME_KEY } from '@/constants'
import Cache from '@/utils/cache'
import { inject, observer } from 'mobx-react'
import styles from './style.module.less'
import { HeaderStore } from '@/store'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import TagPanel from '@/components/Layout/TagPanel'

interface IProps {
  headerStore?: HeaderStore
  route?: any
}

const Header = (props: IProps) => {
  const { headerStore, route } = props

  const loginOutFn = () => {
    Cache.remove(LOCAL_USER_TOKEN_KEY)
    Cache.remove(LOCAL_USER_NAME_KEY)
    window.location.href = '/login'
  }

  const username = Cache.get(LOCAL_USER_NAME_KEY)

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <a onClick={() => headerStore.setMenuCollaps()}>
          {headerStore.menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </a>
        <div className={styles.title}>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={1} className={styles.menuItem}>
                  <a onClick={loginOutFn}>退出</a>
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <a className={styles.dropdownLink}>{username}</a>
          </Dropdown>
        </div>
      </div>
      <TagPanel route={route} />
    </div>
  )
}

export default inject('headerStore')(observer(Header))
