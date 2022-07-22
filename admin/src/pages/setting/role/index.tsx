import RoleList from '@/components/Setting/Role/RoleList'
import AuthList from '@/components/Setting/Role/AuthList'
import styles from './style.less'

export default () => {
  return (
    <div className={styles.page}>
      <RoleList />
      <AuthList />
    </div>
  )
}
