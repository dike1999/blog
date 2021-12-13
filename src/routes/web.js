import Layout from '@/layout/web';
import lazy from '@/components/Lazy';

export default {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '', component: lazy(() => import('@/pages/web/home')) },
    {
      path: 'article/:id',
      component: lazy(() => import('@/pages/web/article')),
    },
    { path: 'archives', component: lazy(() => import('@/pages/web/archives')) },
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
};
