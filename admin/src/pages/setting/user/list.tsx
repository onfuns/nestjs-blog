import { Tabs } from 'antd'
import { UserList, RoleList, AuthList } from '@/components/Setting/User'
import styles from './style.module.less'
const { TabPane } = Tabs

const User = () => {
  return (
    <div className={styles.page}>
      <RoleList />
      <Tabs defaultActiveKey="1" className={styles.content}>
        <TabPane tab="用户列表" key="1">
          <UserList />
        </TabPane>
        <TabPane tab="权限配置" key="2">
          <AuthList />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default User
