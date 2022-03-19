import { Menu, Dropdown } from 'antd'
import { getLocalUser, logoutUser } from '@/actions/user'
import styles from './style.less'

export default () => {
  const { userName } = getLocalUser()

  return (
    <div className={styles.header}>
      <div className={styles.logoText}>管理后台</div>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key={1} className={styles.menuItem}>
              <a onClick={logoutUser}>退出</a>
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
      >
        <a className={styles.dropdownLink}>{userName}</a>
      </Dropdown>
    </div>
  )
}
