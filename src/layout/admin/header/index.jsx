/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { loginout } from '@/redux/user/actions';
import './index.less';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userInfo = useSelector((state) => state.user);

  const menu = (
    <Menu>
      <Menu.Item>
        <span onClick={() => history.push('/')}>返回主页</span>
      </Menu.Item>
      <Menu.Item>
        <span
          onClick={() => {
            dispatch(loginout());
            history.push('/');
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
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default AdminHeader;
