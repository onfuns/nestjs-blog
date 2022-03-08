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
        path: '/portal/article/list',
        component: '@/pages/portal/article',
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
        path: '/portal/category/list',
        component: '@/pages/portal/category',
      },
      {
        name: '标签管理',
        path: '/portal/tag/list',
        component: '@/pages/portal/tag',
      },
      {
        name: '评论管理',
        path: '/portal/comment/list',
        component: '@/pages/portal/comment',
      },
    ],
  },
  {
    name: '系统管理',
    path: '/setting',
    icon: 'setting',
    children: [
      {
        name: '用户管理',
        path: '/setting/user/list',
        component: '@/pages/setting/user',
      },
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
        path: '/',
        redirect: '/portal/article/list',
      },
      {
        path: '/login',
        component: '@/pages/login',
        layout: false,
      },
      ...getRoutes(adminRoutes),
      {
        path: '*',
        component: '@/pages/error/404',
      },
    ],
  },
]
