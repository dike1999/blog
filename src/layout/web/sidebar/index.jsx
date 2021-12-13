/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Divider, Tag, Alert } from 'antd';

import { SIDEBAR, ANNOUNCEMENT } from '@/config';
import useFetchList from '@/hooks/useFetchList';
import Href from '@/components/Href';
import './index.less';

const SideBar = () => {
  const tagList = useSelector((state) => state.article.tagList || []);

  const { dataList: articleList } = useFetchList({
    withLoading: false,
    requestUrl: '/article/list',
    queryParams: {
      order: 'viewCount DESC',
      page: 1,
      pageSize: 6,
    },
  });

  return (
    <aside className='app-sidebar'>
      <img src={SIDEBAR.avatar} className='sider-avatar' alt='' />
      <h2 className='title'>{SIDEBAR.title}</h2>
      <h5 className='sub-title'>{SIDEBAR.subTitle}</h5>
      <ul className='home-pages'>
        {Object.entries(SIDEBAR.homepages).map(([linkName, item]) => (
          <li key={linkName}>
            {item.icon}
            <Href href={item.link} extra={<>{linkName}</>} />
          </li>
        ))}
      </ul>

      {ANNOUNCEMENT.enable && (
        <Alert message={ANNOUNCEMENT.content} type='info' />
      )}

      <Divider orientation='left'>热门文章</Divider>
      <ul className='article-list'>
        {articleList.map((d) => (
          <li key={d.id}>
            <Link to={`/article/${d.id}`}>{d.title}</Link>
          </li>
        ))}
      </ul>

      <Divider orientation='left'>标签</Divider>
      <div className='tag-list'>
        {tagList.map((tag, index) => (
          <Tag key={index} color={tag.color}>
            <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
          </Tag>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
