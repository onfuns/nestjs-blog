export const adminRoutes = [
  {
    name: '首页',
    path: '/dashboard',
    icon: 'home',
    component: '@/pages/dashboard',
  },
  {
    name: '文档管理',
    path: '/portal',
    icon: 'post',
    children: [
      {
        name: '文章管理',
        path: '/portal/article',
        component: '@/pages/portal/article/list',
        children: [
          {
            name: '文章信息',
            path: '/portal/article/add',
            component: '@/pages/portal/article/add',
          },
        ],
      },
      {
        name: '分类管理',
        path: '/portal/category',
        component: '@/pages/portal/category/list',
      },
      { name: '标签管理', path: '/portal/tag', component: '@/pages/portal/tag/list' },
      {
        name: '评论管理',
        path: '/portal/comment',
        component: '@/pages/portal/comment/list',
      },
    ],
  },
  {
    name: '系统管理',
    path: '/setting',
    icon: 'setting',
    children: [{ name: '用户管理', path: '/setting/user', component: '@/pages/setting/user/list' }],
  },
]

const getRoutes = (data, flatRoutes = []) => {
  data.map(({ name, path, component, children }) => {
    component && flatRoutes.push({ name, path, component })
    if (children) getRoutes(children, flatRoutes)
  })
  return flatRoutes
}

export const routes = [
  {
    path: '/',
    component: '@/components/Layout/Container',
    routes: [
      {
        path: '/',
        redirect: '/portal/article/list',
      },
      {
        path: '/login',
        component: '@/pages/login',
        layout: false,
      },
      ...getRoutes(adminRoutes),
    ],
  },
]
