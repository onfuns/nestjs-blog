import { useLocation } from 'umi'
import { getLocalUserMenu } from '@/actions/user'
import { Space } from 'antd'

interface ITypeProps {
  type?: 'list' | 'edit'
  children?: any
  empty?: boolean
}

const checkAuth = type => {
  const { pathname } = useLocation()
  const { operation } = getLocalUserMenu()
  if (operation?.some(o => o.code === `${pathname}/${type}`)) {
    return true
  }
  return false
}

export default ({ children, type = 'edit', empty }: ITypeProps) => {
  if (!children?.length) {
    children = [children]
  }
  const render = children => {
    if (!children) return null
    const hasAuth = checkAuth(type)
    if (hasAuth) return children
    if (empty) return null
    return {
      ...children,
      props: { ...(children?.props || {}), disabled: !hasAuth, onClick: () => null },
    }
  }

  return <Space>{children.map(render)}</Space>
}
