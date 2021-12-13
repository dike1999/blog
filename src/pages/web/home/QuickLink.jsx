/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Divider, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

const title = '快速导航';
const List = ({ list, showTitle = true }) => (
  <ul className='preview'>
    {showTitle && <Divider>{title}</Divider>}
    {list.map((item) => (
      <li key={item.id}>
        <Link to={`/article/${item.id}`}>{item.title}</Link>
      </li>
    ))}
  </ul>
);

/**
 * article quick link
 */
const QuickLink = ({ list }) => {
  const isGreaterThan1300 = useMediaQuery({ query: '(min-width: 1300px)' });

  const [drawerVisible, setDrawerVisible] = useState(false);

  return isGreaterThan1300 ? (
    <List list={list} />
  ) : (
    <>
      <div className='drawer-btn' onClick={() => setDrawerVisible(true)}>
        <MenuOutlined className='nav-phone-icon' />
      </div>
      <Drawer
        title={title}
        placement='right'
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        getContainer={() => document.querySelector('.app-home')}
      >
        <List list={list} showTitle={false} />
      </Drawer>
    </>
  );
};

export default QuickLink;
