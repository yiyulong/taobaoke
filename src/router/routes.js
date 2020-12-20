const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        alias: 'introduce',
        component: () => import('pages/Index.vue'),
        props: (route) => {
          const layoutKey = route.path.search(/introduce/) < 0 ? 'INDEX' : 'COMPANY_INTRODUCE'
          return { layoutKey }
        }
      },
      { path: 'news', meta: { title: '新闻中心' }, component: () => import('pages/News.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
