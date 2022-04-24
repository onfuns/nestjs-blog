import { Menu, Dropdown } from 'antd'
import { getLocalUser, removeLocalUser } from '@/actions/user'
import styles from './style.less'
import { LogoutOutlined } from '@ant-design/icons'
import { useHistory } from 'umi'
import AvatarImage from '@/assets/images/avatar.png'

export default () => {
  const history = useHistory()

  const onLogout = () => {
    removeLocalUser()
    history.push('/login')
  }

  const { userName = 'demo' } = getLocalUser()
  return (
    <div className={styles.header}>
      <div className={styles.logoText}>管理后台</div>
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
