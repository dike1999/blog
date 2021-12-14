/* eslint-disable no-param-reassign */
import React, { useEffect, useMemo, useState } from 'react';
import { Empty, Spin } from 'antd';
import { useLocation } from 'react-router-dom';

import { decodeQuery, translateMarkdown } from '@/utils';
import { HOME_PAGESIZE } from '@/utils/config';
import Pagination from '@/components/Pagination';
import useFetchList from '@/hooks/useFetchList';
import QuickLink from './QuickLink';
import ArticleList from './List';
import './index.less';

const Home = () => {
  const location = useLocation();
  const { loading, pagination, dataList } = useFetchList({
    requestUrl: '/article/list',
    queryParams: { pageSize: HOME_PAGESIZE },
    fetchDependence: [location.search],
  });

  const list = useMemo(
    () => [...dataList].map((item) => {
      const index = item.content.indexOf('<!--more-->');
      item.content = translateMarkdown(item.content.slice(0, index));
      return item;
    }),
    [dataList]
  );

  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    const { keyword: word } = decodeQuery(location.search);
    setKeyword(word);
  }, []);

  return (
    <Spin tip='Loading...' spinning={loading}>
      <div className='app-home'>
        {/* list  */}
        <ArticleList list={list} />

        {/* quick link */}
        <QuickLink list={list} />

        {/* serach empty result */}
        {list.length === 0 && keyword && (
          <div className='no-data'>
            <Empty
              description={(
                <span>
                  不存在标题/内容中含有
                  <span className='keyword'>{keyword}</span>
                  的文章！
                </span>
              )}
            />
          </div>
        )}

        <Pagination
          {...pagination}
          onChange={(page) => {
            document.querySelector('.app-main').scrollTop = 0; // turn to the top
            pagination.onChange(page);
          }}
        />
      </div>
    </Spin>
  );
};

export default Home;
