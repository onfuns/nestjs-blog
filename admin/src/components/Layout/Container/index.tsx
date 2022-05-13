import styles from './style.less'
import Header from '../Header'
import Menu from '../Menu'
import MutilTab from '../MutilTab'

const Container = props => {
  return (
    <div className={styles.container}>
      <Menu />
      <div className={styles.pageContent}>
        <Header {...props} />
        <MutilTab {...props} />
        <div className={styles.contentBody}>
          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </div>
  )
}

export default Container
