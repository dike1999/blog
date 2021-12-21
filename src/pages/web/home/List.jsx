/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EyeOutlined, CommentOutlined, LikeOutlined } from '@ant-design/icons';

import { calcCommentsCount } from '@/utils';
import ArticleTag from '@/components/ArticleTag';

const ArticleList = ({ list }) => {
  const navigate = useNavigate();

  const jumpTo = (id) => {
    navigate(`/article/${id}`);
  };

  return (
    <ul className='app-home-list'>
      {list.map((item) => (
        <li key={item.id} className='app-home-list-item'>
          <Divider orientation='left'>
            <span className='title' onClick={() => jumpTo(item.id)}>
              {item.title}
            </span>
            <span className='posted-time'>{item.createdAt.slice(0, 10)}</span>
          </Divider>

          <div
            onClick={() => jumpTo(item.id)}
            className='article-detail content'
            dangerouslySetInnerHTML={{ __html: item.content }}
          />

          <div className='list-item-others'>
            <EyeOutlined style={{ marginRight: 4 }} />
            <span style={{ marginRight: 12 }}>{item.viewCount}</span>

            <CommentOutlined style={{ marginRight: 4 }} />
            <span style={{ marginRight: 12 }}>
              {calcCommentsCount(item.comments)}
            </span>

            <LikeOutlined style={{ marginRight: 4 }} />
            <span>{item.like || 0}</span>

            <ArticleTag tagList={item.tags} categoryList={item.categories} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
