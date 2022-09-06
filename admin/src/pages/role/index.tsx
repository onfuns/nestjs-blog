import RoleList from './components/RoleList'
import AuthList from './components/AuthList'
import styles from './style.module.less'

export default () => (
  <div className={styles.page}>
    <RoleList />
    <AuthList />
  </div>
)
