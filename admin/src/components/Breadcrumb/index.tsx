import { Link, useLocation } from 'umi'
import { Breadcrumb } from 'antd'
import styles from './style.module.less'
import { treeFindParent } from '@/utils/util'
import { adminRoutes } from '@/routes'
interface IData {
  path?: string
  name: string
}

export default () => {
  const { pathname } = useLocation()
  const data = treeFindParent(adminRoutes, ({ path }) => path === pathname) || []
  return (
    <div className={styles.content}>
      <Breadcrumb>
        {data.slice(1).map(({ path = '', name = '' }: IData, index: number) => (
          <Breadcrumb.Item key={index}>
            {path ? <Link to={{ pathname: path }}>{name}</Link> : name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  )
}
