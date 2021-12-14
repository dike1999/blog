import LayoutWeb from '@/layout/web';
import LayoutAdmin from '@/layout/admin';
import lazy from '@/components/Lazy';

const routes = [
  {
    path: '/admin',
    name: 'home',
    component: LayoutAdmin,
    childRoutes: [
      { path: '', component: lazy(() => import('@/pages/admin/home')) },
      {
        path: 'article/edit/:id',
        component: lazy(() => import('@/pages/admin/article/edit')),
      },
      {
        path: 'article/add',
        component: lazy(() => import('@/pages/admin/article/edit')),
      },
      {
        path: 'article/manager',
        component: lazy(() => import('@/pages/admin/article/manager')),
      },
      { path: 'user', component: lazy(() => import('@/pages/admin/user')) },
    ],
  },

  {
    path: '/',
    name: 'home',
    component: LayoutWeb,
    childRoutes: [
      { path: '', component: lazy(() => import('@/pages/web/home')) },
      {
        path: 'article/:id',
        component: lazy(() => import('@/pages/web/article')),
      },
      {
        path: 'archives',
        component: lazy(() => import('@/pages/web/archives')),
      },
      {
        path: 'categories',
        component: lazy(() => import('@/pages/web/categories')),
      },
      {
        path: 'categories/:name',
        component: lazy(() => import('@/pages/web/tag')),
      },
      { path: 'tags/:name', component: lazy(() => import('@/pages/web/tag')) },
      { path: '/about', component: lazy(() => import('@/pages/web/about')) },
      { path: '*', component: lazy(() => import('@/components/404')) },
    ],
  },
];

export default routes;
