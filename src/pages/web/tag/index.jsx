import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Timeline, Spin } from 'antd';

import { TAG_PAGESIZE } from '@/utils/config';
import Pagination from '@/components/Pagination';
import useFetchList from '@/hooks/useFetchList';
import './index.less';

const TimeLineList = ({ list, name, type }) => (
  <div className='timeline'>
    <Timeline>
      <Timeline.Item>
        <h1 className='list-title'>
          {name}
          <small className='type-name'>{type}</small>
        </h1>
        <br />
      </Timeline.Item>
      {list.map((item) => (
        <Timeline.Item key={item.id}>
          <span style={{ fontSize: '13px', marginRight: '16px' }}>
            {item.createdAt.slice(5, 10)}
          </span>
          <Link to={`/article/${item.id}`}>{item.title}</Link>
        </Timeline.Item>
      ))}
    </Timeline>
  </div>
);

// 根据 tag / category 获取文章列表
const List = () => {
  const location = useLocation();
  const { name } = useParams();
  const type = location.pathname.includes('categories') ? 'category' : 'tag';

  const { loading, pagination, dataList } = useFetchList({
    requestUrl: '/article/list',
    queryParams: { [type]: name, pageSize: TAG_PAGESIZE },
    fetchDependence: [location.search, location.pathname],
  });

  return (
    <Spin tip='Loading...' spinning={loading} delay={500}>
      <div className='app-tags' style={{ paddingTop: '16px' }}>
        <TimeLineList list={dataList} name={name} type={type} />
        <Pagination
          {...pagination}
          style={{ float: 'initial', marginTop: 10 }}
        />
      </div>
    </Spin>
  );
};

export default List;
