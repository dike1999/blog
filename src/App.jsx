/* eslint-disable object-curly-newline */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-param-reassign */
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import { Spin } from 'antd';
import { LoadingOutlined } from '@/utils/icons';

import PublicComponent from '@/components/Public';

// lazy load component
const dynamic = (impoter) => {
  const antdIcon = (
    <LoadingOutlined type='loading' style={{ fontSize: 48 }} spin />
  );
  return loadable(() => impoter, {
    fallback: (
      <Spin
        indicator={antdIcon}
        style={{ float: 'right', marginTop: '20px', marginRight: '20px' }}
      />
    ),
  });
};

// 必须要在此处先定义页面组件，然后再Router组件中引入，避免页面被重复渲染两次
const LayoutWeb = dynamic(import('@/layout/web'));
const LayoutAdmin = dynamic(import('@/layout/admin'));
const AdminHome = dynamic(import('@/pages/admin/home'));
const Edit = dynamic(import('@/pages/admin/article/edit'));
const Manager = dynamic(import('@/pages/admin/article/manager'));
const User = dynamic(import('@/pages/admin/user'));
const Home = dynamic(import('@/pages/web/home'));
const Article = dynamic(import('@/pages/web/article'));
const Archives = dynamic(import('@/pages/web/archives'));
const Categories = dynamic(import('@/pages/web/categories'));
const Tags = dynamic(import('@/pages/web/tag'));
const About = dynamic(import('@/pages/web/about'));
const NotFound = dynamic(import('@/components/404/PageNotFound'));

const App = () => {
  const role = useSelector((state) => state.user.role);

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
