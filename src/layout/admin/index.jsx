import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import Head from '@/components/Head';
import Breadcrumb from '@/components/Breadcrumb';
import AdminSideBar from './sidebar';
import AdminHeader from './header';
import styles from './index.module.less';

const { Sider, Header, Content } = Layout;

const AdminLayout = () => {
  const location = useLocation();

  return (
    <Layout className={styles.adminContainer}>
      <Header
        className={styles.header}
        style={{ height: '48px', lineHeight: '48px' }}
      >
        <AdminHeader />
      </Header>

      <Layout>
        <Sider width={200} className={styles.sider}>
          <AdminSideBar selectedKeys={[location.pathname]} />
        </Sider>
        <Layout className={styles.contentWrap}>
          <Breadcrumb />
          <Content className={styles.content}>
            <Head title='CoderDi-博客后台管理系统' usePrefix={false} />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
