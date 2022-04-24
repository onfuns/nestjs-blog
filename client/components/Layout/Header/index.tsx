import { useEffect, useRef } from 'react'
import styles from './style.module.less'
import classnames from 'classnames'

export default function Header() {
  const ref = useRef()

  useEffect(() => {
    let top = window.scrollY
    const onScroll = () => {
      const classList = (ref.current as HTMLElement).classList
      if (window.scrollY > top) {
        classList.add(styles.up)
        classList.remove(styles.down)
      } else {
        classList.add(styles.down)
        classList.remove(styles.up)
      }
      top = window.scrollY
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={styles.header} ref={ref}>
      <div className={classnames('container', styles.headerContent)}>
        <a href="/" className={styles.logo}>
          Nest-Blog
        </a>
        <div className={styles.headerLink}>
          <a href="/">首页</a>
          <a href="https://hao.onfuns.com" target="_blank">
            前端导航
          </a>
          <a href="https://book.onfuns.com" target="_blank">
            前端小册
          </a>
        </div>
      </div>
    </div>
  )
}
