import styles from './style.module.less'
import classnames from 'classnames'
import dayjs from 'dayjs'

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={classnames('page-container', styles.footerContent)}>
        <a href="https://github.com/onfuns">©2018-{dayjs().year()} by onfuns</a>
        <a href="https://beian.miit.gov.cn/" target="_blank">
          浙ICP备15032255号-1
        </a>
      </div>
    </div>
  )
}
