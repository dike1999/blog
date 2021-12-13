import React from 'react';

import Search from '@/components/Search';
import Navbar from '@/components/Navbar';
import UserInfo from '@/components/UserInfo';
import './index.less';

const HeaderRight = () => (
  <div className='header-right'>
    <Search />
    <UserInfo />
    <Navbar />
  </div>
);

export default HeaderRight;
