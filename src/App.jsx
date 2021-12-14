/* eslint-disable object-curly-newline */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-param-reassign */
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
  const NotFound = lazy(() => import('@/components/404'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' key='/' element={<LayoutWeb />}>
          <Route index exact element={<Home />} />
          <Route
            path='/article/:id'
            key='/article/:id'
            exact
            element={<Article />}
          />
          <Route
            path='/archives'
            key='/archives'
            exact
            element={<Archives />}
          />
          <Route
            path='/categories'
            key='/categories'
            exact
            element={<Categories />}
          />
          <Route
            path='/categories/:name'
            key='/categories/:name'
            exact
            element={<Tags />}
          />
          <Route
            path='/tags/:name'
            key='/tags/:name'
            exact
            element={<Tags />}
          />
          <Route path='/about' key='/about' exact element={<About />} />
          <Route path='/*' key='/*' exact element={<NotFound />} />
        </Route>

        <Route path='/admin' key='/admin' element={<LayoutAdmin />}>
          {role !== 1 ? (
            <Route path='/admin/*' index element={<Navigate to='/' />} />
          ) : (
            <>
              <Route index exact element={<AdminHome />} />
              <Route
                path='/admin/article/manager'
                key='/admin/article/manager'
                exact
                element={<Manager />}
              />
              <Route
                path='/admin/article/edit/:id'
                key='/admin/article/edit/:id'
                exact
                element={<Edit />}
              />
              <Route
                path='/admin/article/add'
                key='/admin/article/add'
                exact
                element={<Edit />}
              />
              <Route
                path='/admin/user'
                key='/admin/user'
                exact
                element={<User />}
              />
            </>
          )}
        </Route>
      </Routes>
      <PublicComponent />
    </BrowserRouter>
  );
};

export default App;
