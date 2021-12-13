import Layout from '@/layout/admin';
import lazy from '@/components/Lazy';

export default {
  path: '/admin',
  name: 'home',
  component: Layout,
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
};
