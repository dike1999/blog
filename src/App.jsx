/* eslint-disable object-curly-newline */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-param-reassign */
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PublicComponent from '@/components/Public';
import lazy from '@/components/Lazy';
import LayoutWeb from '@/layout/web';
import LayoutAdmin from '@/layout/admin';

const App = () => {
  const role = useSelector((state) => state.user.role);

  // 管理页
  const AdminHome = lazy(() => import('@/pages/admin/home'));
  const Edit = lazy(() => import('@/pages/admin/article/edit'));
  const Manager = lazy(() => import('@/pages/admin/article/manager'));
  const User = lazy(() => import('@/pages/admin/user'));
  // 用户页
  const Home = lazy(() => import('@/pages/web/home'));
  const Article = lazy(() => import('@/pages/web/article'));
  const Archives = lazy(() => import('@/pages/web/archives'));
  const Categories = lazy(() => import('@/pages/web/categories'));
  const Tags = lazy(() => import('@/pages/web/tag'));
  const About = lazy(() => import('@/pages/web/about'));
  // const NotFound = lazy(() => import('@/components/404'));

  const renderAdmin = (props) => {
    if (role !== 1) {
      return <Redirect to='/' />;
    }
    return (
      <LayoutAdmin {...props}>
        <Route path='/admin' key='/admin' exact component={AdminHome} />
        <Route
          path='/admin/article/edit/:id'
          key='/admin/article/edit/:id'
          exact
          component={Edit}
        />
        <Route
          path='/admin/article/add'
          key='/admin/article/add'
          exact
          component={Edit}
        />
        <Route
          path='/admin/article/manager'
          key='/admin/article/manager'
          exact
          component={Manager}
        />
        <Route path='/admin/user' key='/admin/user' exact component={User} />
      </LayoutAdmin>
    );
  };

  const renderHome = (props) => (
    <LayoutWeb {...props}>
      <Route path='/' key='/' exact component={Home} />
      <Route path='/article/:id' key='/article/:id' exact component={Article} />
      <Route path='/archives' key='/archives' exact component={Archives} />
      <Route
        path='/categories'
        key='/categories'
        exact
        component={Categories}
      />
      <Route
        path='/categories/:name'
        key='/categories/:name'
        exact
        component={Tags}
      />
      <Route path='/tags/:name' key='/tags/:name' exact component={Tags} />
      <Route path='/about' key='/about' exact component={About} />
      {/* <Route path='/*' key='/*' exact component={NotFound} /> */}
    </LayoutWeb>
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/admin' key='/admin' render={renderAdmin} />
        <Route path='/' key='/' render={renderHome} />
      </Switch>
      <PublicComponent />
    </BrowserRouter>
  );
};

export default App;
