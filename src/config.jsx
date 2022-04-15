import React from 'react';
import { GithubFilled, WechatFilled, QqCircleFilled } from '@/utils/icons';
import MyInfo from '@/components/MyInfo';
import avatarImg from '@/assets/images/avatar.png';
import WeChatImg from '@/assets/images/WeChat.png';
import QQImg from '@/assets/images/QQ.png';

// API_BASE_URL
export const API_BASE_URL = 'https://coderdi.top:6060';

// 博客上线时间
export const ONLINE_TIME = '2021-04-30';

// project config
export const HEADER_BLOG_NAME = 'CoderDi'; // header title 显示的名字
export const HEADER_TITLE = 'CoderDi的博客'; // title
// === sidebar
export const SIDEBAR = {
  avatar: avatarImg, // 侧边栏头像
  title: 'CoderDi', // 标题
  subTitle: '小狄狄怂成了一团', // 子标题
  // 个人主页
  homepages: {
    QQ: {
      link: QQImg,
      isImg: true,
      icon: <QqCircleFilled className='homepage-icon' />,
    },
    github: {
      link: 'https://github.com/dike1999',
      icon: <GithubFilled className='homepage-icon' />,
    },
    微信: {
      link: WeChatImg,
      isImg: true,
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

// pageSize
export const ARCHIVES_PAGESIZE = 15; // archives pageSize
export const TAG_PAGESIZE = 15; // tag / category pageSize
export const HOME_PAGESIZE = 10; // home pageSize
