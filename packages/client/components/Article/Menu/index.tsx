import classnames from 'classnames'
import { useRouter } from 'next/router'
import styles from './style.module.scss'

export interface IIMenuItem {
  name: string
  type: number
  url: string
  ename?: string
  icon?: string
  icon_color?: string
  children?: IIMenuItem[]
}
export interface IMenuProps {
  data: IIMenuItem[]
}

//type 1:列表 2:单页 3:外链
enum ArticleType {
  List = 1,
  SinglePage = 2,
  Url = 3,
}

export default function MenuPanel({ data = [] }: IMenuProps) {
  const router = useRouter()

  const renderIcon = ({ icon, icon_color }) => {
    if (!icon) return null
    if (/^https?/.test(icon)) return <img className="w-16 h16 mr-8" />
    return (
      <i
        className={`iconfont ${icon} inline-block vertical-mid mr-8`}
        style={{ color: icon_color }}
      ></i>
    )
  }

  const renderMenu = (data: IIMenuItem[]) => {
    const renderMenuItem = (item, children = []) => (
      <li
        key={item.name}
        className={classnames(styles.menuItem, 'cursor-pointer relative', {
          active: router.asPath === `/category${item.ename}` || router.asPath === item.url,
        })}
      >
        <a
          href={item.type === ArticleType.Url ? item.url : `/category${item.ename}`}
          className="flex items-center color-#333 p-[10px_0_10px_12px] lh-20"
        >
          {renderIcon(item)}
          {item.name}
        </a>
        {children.length ? (
          <ul className="block min-w-160 bg-#fff rd-4">
            {children.map((child) => renderMenuItem(child, child.children))}
          </ul>
        ) : null}
      </li>
    )
    return data.map((item) => renderMenuItem(item, item.children))
  }

  const defauluMenu: IIMenuItem[] = [
    { name: '首页', type: ArticleType.Url, url: '/', icon: 'icon-shouye1', icon_color: '#F15533' },
  ]
  const otherMenu: IIMenuItem[] = [
    {
      name: '前端导航',
      type: ArticleType.Url,
      url: 'https://hao.onfuns.com',
      icon: 'icon-huaban',
      icon_color: '#12b7f5',
    },
  ]

  return (
    <div className="sticky top-50 w-200 max-h-450 mr-10 flex-shrink-0">
      {[defauluMenu.concat(data), otherMenu].map((group, index) => (
        <ul key={index} className="bg-#fff p-10 mb-10 rd-4 overflow-hidden">
          {renderMenu(group)}
        </ul>
      ))}
    </div>
  )
}
