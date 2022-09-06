import { useEffect, useRef } from 'react'
import styles from './style.module.less'
import classnames from 'classnames'
import Head from 'next/head'

export default function Header() {
  const headerRef = useRef()

  useEffect(() => {
    let top = window.scrollY
    const onScroll = () => {
      const classList = (headerRef.current as HTMLElement).classList
      if (window.scrollY > top) {
        classList.add(styles.slideUp)
        classList.remove(styles.slideDown)
      } else {
        classList.add(styles.slideDown)
        classList.remove(styles.slideUp)
      }
      top = window.scrollY
    }
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={styles.header} ref={headerRef}>
      <Head>
        <meta content="text/html; charset=utf-8" httpEquiv="Content-Type" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="description" content="node博客系统" />
        <meta name="keywords" content="node博客,nodejs博客,博客搭建" />
        <link rel="shortcut icon" href="/image/logo.png" />
        <script src="/plugin/analysis.js" defer></script>
        <title>Nest-Blog演示系统</title>
      </Head>
      <div className={classnames('page-container', styles.headerContent)}>
        <a href="/" className={styles.logo}>
          Nest-Blog
        </a>
        <div className={styles.headerLink}>
          <a href="/">首页</a>
          <a href="https://hao.onfuns.com" target="_blank" rel="noreferrer">
            前端导航
          </a>
          <a href="https://book.onfuns.com" target="_blank" rel="noreferrer">
            前端小册
          </a>
        </div>
      </div>
    </div>
  )
}
