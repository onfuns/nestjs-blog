import { lazy } from 'react'

export type IRouter = {
  name?: string
  path: string
  redirect?: string
  layout?: boolean
  component?: any
  children?: IRouter[]
}

export const baseRoutes: IRouter[] = [
  {
    name: '工作台',
    path: '/dashboard',
    component: lazy(() => import('@/pages/dashboard')),
  },
  {
    name: '内容管理',
    path: '/portal',
    children: [
      {
        name: '栏目管理',
        path: '/portal/category',
        component: lazy(() => import('@/pages/category')),
      },
      {
        name: '文章管理',
        path: '/portal/article',
        component: lazy(() => import('@/pages/article')),
      },
      {
        name: '标签管理',
        path: '/portal/tag',
        component: lazy(() => import('@/pages/tag')),
      },
      {
        name: '评论管理',
        path: '/portal/comment',
        component: lazy(() => import('@/pages/comment')),
      },
      {
        name: '附件管理',
        path: '/portal/file',
        component: lazy(() => import('@/pages/file')),
      },
    ],
  },
  {
    name: '用户管理',
    path: '/user',
    children: [
      {
        name: '用户管理',
        path: '/user/manage',
        component: lazy(() => import('@/pages/user')),
      },
      {
        name: '角色管理',
        path: '/user/role',
        component: lazy(() => import('@/pages/role')),
      },
      {
        name: '权限管理',
        path: '/user/auth',
        component: lazy(() => import('@/pages/auth')),
      },
    ],
  },
  {
    name: '系统管理',
    path: '/setting',
    children: [
      {
        name: '站点设置',
        path: '/setting/website',
        component: lazy(() => import('@/pages/website')),
      },
    ],
  },
]

const getFlatRoutes = (data: IRouter[], flatRoutes = []): IRouter[] => {
  data.map(({ name, path, component, children, ...other }) => {
    component &&
      flatRoutes.push({
        name,
        path,
        component,
        ...other,
      })
    if (children) getFlatRoutes(children, flatRoutes)
  })
  return flatRoutes
}

export const flatRoutes = getFlatRoutes(baseRoutes)

export const routes: IRouter[] = [
  {
    path: '/login',
    layout: false,
    component: lazy(() => import('@/pages/login')),
  },
  ...flatRoutes,
  {
    path: '*',
    component: lazy(() => import('@/pages/404')),
  },
]
