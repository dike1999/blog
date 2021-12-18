import React from 'react';
import { GithubFilled, WechatFilled, QqCircleFilled } from '@ant-design/icons';
import MyInfo from '@/components/MyInfo';
import avatarImg from '@/assets/images/avatar.png';

// API_BASE_URL
export const API_BASE_URL = 'http://127.0.0.1:6060';
// project config
export const HEADER_BLOG_NAME = 'CoderDi'; // header title 显示的名字
// === sidebar
export const SIDEBAR = {
  avatar: avatarImg, // 侧边栏头像
  title: 'CoderDi', // 标题
  subTitle: '小狄狄怂成了一团', // 子标题
  // 个人主页
  homepages: {
    QQ: {
      link: '',
      icon: <QqCircleFilled className='homepage-icon' />,
    },
    github: {
      link: 'https://github.com/dike1999',
      icon: <GithubFilled className='homepage-icon' />,
    },
    微信: {
      link: '',
      icon: <WechatFilled type='iconjuejin' className='homepage-icon' />,
    },
  },
};
// === discuss avatar
export const DISCUSS_AVATAR = SIDEBAR.avatar; // 头像

export const ABOUT = {
  avatar: SIDEBAR.avatar,
  describe: SIDEBAR.subTitle,
  discuss: true, // 关于页面是否开启讨论
  renderMyInfo: <MyInfo />, // 我的介绍 自定义组件 => @/components/MyInfo
};

// 公告 announcement
export const ANNOUNCEMENT = {
  enable: false, // 是否开启
  content: <>个人博客</>,
};
