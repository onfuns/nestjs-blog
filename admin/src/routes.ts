export const baseRoutes = [
  {
    name: '工作台',
    path: '/dashboard',
    component: '@/pages/dashboard',
  },
  {
    name: '内容管理',
    path: '/portal',
    children: [
      {
        name: '栏目管理',
        path: '/portal/category',
        component: '@/pages/category',
      },
      {
        name: '文章管理',
        path: '/portal/article',
        component: '@/pages/article',
      },
      {
        name: '标签管理',
        path: '/portal/tag',
        component: '@/pages/tag',
      },
      {
        name: '评论管理',
        path: '/portal/comment',
        component: '@/pages/comment',
      },
      {
        name: '附件管理',
        path: '/portal/file',
        component: '@/pages/file',
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
        component: '@/pages/user',
      },
      {
        name: '角色管理',
        path: '/user/role',
        component: '@/pages/role',
      },
      {
        name: '权限管理',
        path: '/user/auth',
        component: '@/pages/auth',
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
        component: '@/pages/website',
      },
    ],
  },
]

const getRoutes = (data, flatRoutes = []) => {
  data.map(({ name, path, component, children, ...other }) => {
    component &&
      flatRoutes.push({
        name,
        path,
        component,
        wrappers: ['@/components/KeepAlive'],
        ...other,
      })
    if (children) getRoutes(children, flatRoutes)
  })
  return flatRoutes
}

export const routes = [
  {
    path: '/login',
    component: '@/pages/login',
  },
  {
    component: '@/components/Layout/Container',
    routes: [
      {
        path: '/',
        redirect: '/dashboard',
      },
      ...getRoutes(baseRoutes),
      {
        path: '*',
        component: '@/pages/404',
      },
    ],
  },
]
