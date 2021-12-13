import React from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  Layout, Row, Col, BackTop, Alert
} from 'antd';

import { ANNOUNCEMENT } from '@/config';
import Header from './header';
import SideBar from './sidebar';
import './index.less';

// 响应式
const siderLayout = {
  xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0
};
const contentLayout = {
  xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24
};

const WebLayout = ({ children }) => {
  const iphoneScreen = useMediaQuery({
    query: '(max-width: 576px)',
  });

  const ipadScreen = useMediaQuery({
    query: '(min-width: 576px) and (max-width: 992px)',
  });

  return (
    <Layout className='app-container'>
      <Header />
      <Row className='app-wrapper'>
        <Col {...siderLayout}>
          <SideBar />
        </Col>
        <Col {...contentLayout}>
          <div className='app-main'>
            {(ipadScreen || iphoneScreen) && ANNOUNCEMENT.enable && (
              <Alert
                message={ANNOUNCEMENT.content}
                type='info'
                style={{
                  marginTop: iphoneScreen ? 20 : 0,
                  marginBottom: ipadScreen ? 20 : 0,
                }}
              />
            )}
            {children}
          </div>
        </Col>
      </Row>
      <BackTop target={() => document.querySelector('.app-main')} />
    </Layout>
  );
};

export default WebLayout;
