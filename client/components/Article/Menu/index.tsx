import styles from './style.module.less'
import classnames from 'classnames'
import { useRouter } from 'next/router'

const MenuPanel = ({ data = [] }: { data: any[] }) => {
  const router = useRouter()
  const url = router.asPath
  const isActive = item => url.replace('/category', '') === item.ename || url === item.url
  const renderMenu = data => {
    const renderMenuItem = (item, children = []) => (
      <li
        key={item.name}
        className={classnames({
          [styles.menuItem]: true,
          [styles.active]: isActive(item),
        })}
      >
        {/**
         * type 1:列表 2:单页 3:外链
         */}
        <a href={item.type === 3 ? item.url : `/category${item.ename}`}>
          {item.icon ? (
            /^https?/.test(item.icon) ? (
              <img className={styles.imgIcon} />
            ) : (
              <i
                className={classnames(styles.fontIcon, 'iconfont', item.icon)}
                style={{ color: item.icon_color }}
              ></i>
            )
          ) : null}
          {item.name}
        </a>
        {children.length ? (
          <ul className={styles.menuChildren}>
            {children.map(child => renderMenuItem(child, child.children))}
          </ul>
        ) : null}
      </li>
    )
    return data.map(item => renderMenuItem(item, item.children))
  }

  const defauluMenu = [
    { name: '首页', type: 3, url: '/', icon: 'icon-shouye1', icon_color: '#F15533' },
  ]

  const otherMenu = [
    {
      name: '前端导航',
      type: 3,
      url: 'https://hao.onfuns.com',
      icon: 'icon-huaban',
      icon_color: '#12b7f5',
    },
    {
      name: '前端手册',
      type: 3,
      url: 'https://book.onfuns.com',
      icon: 'icon-gongzuoshouce',
      icon_color: '#FF7878',
    },
  ]

  return (
    <div className={styles.menu}>
      <ul className={styles.menuList}>{renderMenu(defauluMenu.concat(data))}</ul>
      <ul className={styles.menuList}>{renderMenu(otherMenu)}</ul>
    </div>
  )
}

export default MenuPanel
