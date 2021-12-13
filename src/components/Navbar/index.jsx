import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  EditOutlined,
  FolderOutlined,
  UserOutlined,
} from '@ant-design/icons';

const navList = [
  {
    icon: HomeOutlined,
    title: '首页',
    link: '/',
  },
  {
    icon: EditOutlined,
    title: '归档',
    link: '/archives',
  },
  {
    icon: FolderOutlined,
    title: '分类',
    link: '/categories',
  },
  {
    icon: UserOutlined,
    title: '关于',
    link: '/about',
  },
];

const NavBar = ({ mode = 'horizontal' }) => {
  const location = useLocation();

  return (
    <Menu mode={mode} selectedKeys={[location.pathname]} className='header-nav'>
      {navList.map((nav) => {
        const MenuIcon = nav.icon;
        return (
          <Menu.Item key={nav.link}>
            <Link to={nav.link}>
              <MenuIcon />
              <span>{nav.title}</span>
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default NavBar;
