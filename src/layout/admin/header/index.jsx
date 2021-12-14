/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { loginout } from '@/redux/user/actions';
import './index.less';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user);

  const menu = (
    <Menu>
      <Menu.Item key='1'>
        <span onClick={() => navigate('/')}>返回主页</span>
      </Menu.Item>
      <Menu.Item key='2'>
        <span
          onClick={() => {
            dispatch(loginout());
            navigate('/');
          }}
        >
          退出登录
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <span className='header-title'>博客后台管理系统</span>
      <Dropdown overlay={menu} className='header-dropdown'>
        <a className='ant-dropdown-link'>
          {userInfo.username}
          &nbsp;
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default AdminHeader;
