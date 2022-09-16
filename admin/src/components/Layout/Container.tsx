import { ReactChildren } from 'react'
import styles from './style.module.less'
import Header from './Header'
import Menu from './Menu'
import MutilTab from './MutilTab'
import { useEffect, useState } from 'react'
import { getLocalUser, logoutUser } from '@/actions/user'
import { history } from 'umi'
import { observer } from 'mobx-react'
import { useStore } from '@/hooks'

export default observer((props: { children: ReactChildren; route: { routes: any[] } }) => {
  const [login, setLogin] = useState(false)
  const { headerStore } = useStore()

  useEffect(() => {
    const load = async () => {
      const { token } = await getLocalUser()
      if (!token) logoutUser()
      setLogin(true)
    }
    load()
  }, [])

  const { pathname, state, search } = history.location
  useEffect(() => {
    const router = props.route.routes?.find((item: any) => item.path === pathname) || {}
    headerStore?.updateTab({ ...router, state, search })
    headerStore?.setCurrentTabPath(pathname)
  }, [pathname])

  return login ? (
    <div className={styles.container}>
      <Menu />
      <div className={styles.pageContent}>
        <Header />
        <MutilTab />
        <div className={styles.contentBody}>
          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </div>
  ) : null
})
