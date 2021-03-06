/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';

import { loginout } from '@/redux/user/actions';
import AppAvatar from '@/components/Avatar';
import useBus from '@/hooks/useBus';

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bus = useBus();
  const userInfo = useSelector((state) => state.user);
  const { username, role } = userInfo;

  const MenuOverLay = (
    <Menu>
      {role === 1 && (
        <Menu.Item key='1'>
          <span onClick={() => bus.emit('openUploadModal')}>导入文章</span>
        </Menu.Item>
      )}
      {role === 1 && (
        <Menu.Item key='2'>
          <span onClick={() => navigate('/admin')}>后台管理</span>
        </Menu.Item>
      )}
      <Menu.Item key='3'>
        <span onClick={() => dispatch(loginout())}>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{ float: 'right', padding: '0 40px 0 16px' }}>
      {username ? (
        <Dropdown
          placement='bottom'
          overlay={MenuOverLay}
          trigger={['click', 'hover']}
        >
          <div style={{ height: 55 }}>
            <AppAvatar userInfo={userInfo} popoverVisible={false} />
          </div>
        </Dropdown>
      ) : (
        <>
          <Button
            ghost
            type='primary'
            size='small'
            style={{ marginRight: 20 }}
            onClick={() => bus.emit('openSignModal', 'login')}
          >
            登录
          </Button>
          <Button
            ghost
            type='danger'
            size='small'
            onClick={() => bus.emit('openSignModal', 'register')}
          >
            注册
          </Button>
        </>
      )}
    </div>
  );
};

export default UserInfo;
