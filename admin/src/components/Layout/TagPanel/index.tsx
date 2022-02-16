import { useEffect } from 'react'
import { Tag } from 'antd'
import { inject, observer } from 'mobx-react'
import styles from './style.module.less'
import { HeaderStore } from '@/store'
import { Link, useLocation } from 'umi'

interface IProps {
  headerStore?: HeaderStore
  [key: string]: any
}

const TagPanel = (props: IProps) => {
  const { headerStore, history, route } = props
  const { pathname } = useLocation()

  useEffect(() => {
    const pathInfo = route?.routes?.find((item: any) => item.path === pathname) || {}
    headerStore.updateTagsPanel({ ...pathInfo })
  }, [pathname])

  const onClose = (item: any) => {
    headerStore.updateTagsPanel(item, 'remove')
    const { tagsPanel = [] } = headerStore
    //关闭当前标签，回退上一个
    if (item.path === pathname) {
      const { path = '/dashboard' } = tagsPanel[tagsPanel.length - 1] || {}
      history.push(path)
    }
  }
  const { tagsPanel = [] } = headerStore
  return (
    <div className={styles.tagsPanel}>
      {tagsPanel.slice().map((item, index) => (
        <Tag
          className={item.path === pathname ? styles.active : ''}
          key={index}
          closable
          onClose={() => onClose(item)}
        >
          <Link to={`${item.path}`}>{item.name}</Link>
        </Tag>
      ))}
    </div>
  )
}

export default inject('headerStore')(observer(TagPanel))
