import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Head from '@/components/Head';
import Breadcrumb from '@/components/Breadcrumb';
import AdminSideBar from './sidebar';
import AdminHeader from './header';
import './index.less';

const { Sider, Header, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();

  return (
    <Layout className='admin-container'>
      <Header
        className='admin-header'
        style={{ height: '48px', lineHeight: '48px' }}
      >
        <AdminHeader />
      </Header>

      <Layout>
        <Sider width={200} className='admin-sider'>
          <AdminSideBar selectedKeys={[location.pathname]} />
        </Sider>
        <Layout className='admin-content-wrap'>
          <Breadcrumb />
          <Content className='admin-content'>
            <Head title='CoderDi-博客后台管理系统' usePrefix={false} />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
