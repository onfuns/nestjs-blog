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
    name: '系统管理',
    path: '/setting',
    children: [
      {
        name: '用户管理',
        path: '/setting/user',
        component: '@/pages/user',
      },
      {
        name: '角色管理',
        path: '/setting/role',
        component: '@/pages/role',
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
    component: '@/components/Layout',
    routes: [
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
    ],
  },
]
