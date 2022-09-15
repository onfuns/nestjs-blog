import { ReactChildren } from 'react'
import styles from './style.module.less'
import Header from './Header'
import Menu from './Menu'
import MutilTab from './MutilTab'
import { useEffect, useState } from 'react'
import { getLocalUser, logoutUser } from '@/actions/user'

const Container = (props: { children: ReactChildren; route: { routes: any[] } }) => {
  const [login, setLogin] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { token } = await getLocalUser()
      if (!token) {
        logoutUser()
      } else {
        setLogin(true)
      }
    })()
  }, [])

  return login ? (
    <div className={styles.container}>
      <Menu />
      <div className={styles.pageContent}>
        <Header />
        <MutilTab routes={props.route?.routes} />
        <div className={styles.contentBody}>
          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </div>
  ) : null
}

export default Container
