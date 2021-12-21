import React, { useState } from 'react';
import { Dropdown, Menu, Input } from 'antd';
import {
  HomeOutlined,
  EditOutlined,
  FolderOutlined,
  UserOutlined,
  SearchOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import { HEADER_BLOG_NAME } from '@/config';
import './index.less';

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

const HeaderLeft = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };

  const onPressEnter = (e) => {
    e.target.blur();
  };

  const onSubmit = () => {
    navigate(`/?page=1&keyword=${keyword}`);
    setKeyword('');
  };

  const clickSearch = (e) => {
    e.stopPropagation();
  };

  const menu = (
    <Menu className='header-nav'>
      {navList.map((nav) => {
        const MenuIcon = nav.icon;
        return (
          <Menu.Item key={nav.link}>
            <Link to={nav.link}>
              <MenuIcon style={{ marginRight: 15 }} />
              <span>{nav.title}</span>
            </Link>
          </Menu.Item>
        );
      })}
      <Menu.Item key='search'>
        <SearchOutlined />
        <Input
          className='search-input'
          onClick={clickSearch}
          value={keyword}
          onChange={handleChange}
          onPressEnter={onPressEnter}
          onBlur={onSubmit}
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <div className='header-left'>
      <span className='blog-name'>{HEADER_BLOG_NAME}</span>
      <Dropdown
        overlayClassName='header-dropdown'
        trigger={['click']}
        overlay={menu}
        getPopupContainer={() => document.querySelector('.header-left')}
      >
        <MenuOutlined className='header-dropdown-icon' />
      </Dropdown>
    </div>
  );
};

export default HeaderLeft;
