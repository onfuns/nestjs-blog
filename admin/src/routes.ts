export const adminRoutes = [
  {
    name: '工作台',
    path: '/dashboard',
    icon: 'home',
    component: '@/pages/dashboard',
  },
  {
    name: '门户管理',
    path: '/portal',
    icon: 'portal',
    children: [
      {
        name: '栏目管理',
        path: '/portal/category',
        component: '@/pages/portal/category',
      },
      {
        name: '文章管理',
        path: '/portal/article',
        component: '@/pages/portal/article',
      },
      {
        name: '标签管理',
        path: '/portal/tag',
        component: '@/pages/portal/tag',
      },
      {
        name: '评论管理',
        path: '/portal/comment',
        component: '@/pages/portal/comment',
      },
    ],
  },
  {
    name: '系统设置',
    path: '/setting',
    icon: 'setting',
    children: [
      {
        name: '用户管理',
        path: '/setting/user',
        component: '@/pages/setting/user',
      },
      {
        name: '角色管理',
        path: '/setting/role',
        component: '@/pages/setting/role',
      },
      // {
      //   name: '网站设置',
      //   path: '/setting/website',
      //   component: '@/pages/setting/website',
      // },
    ],
  },
]

const getRoutes = (data, flatRoutes = []) => {
  data.map(({ name, path, component, children, ...other }) => {
    component && flatRoutes.push({ name, path, component, ...other })
    if (children) getRoutes(children, flatRoutes)
  })
  return flatRoutes
}

export const routes = [
  {
    component: '@/components/Layout/Container',
    routes: [
      {
        path: '/login',
        component: '@/pages/login',
      },
      {
        path: '/',
        redirect: '/dashboard',
      },
      ...getRoutes(adminRoutes),
      {
        path: '*',
        component: '@/pages/404',
      },
    ],
  },
]
