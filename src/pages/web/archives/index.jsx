/* eslint-disable react/no-array-index-key */
import React, { Fragment } from 'react';
import { Timeline, Spin } from 'antd';
import { Link, useLocation } from 'react-router-dom';

import { ClockCircleOutlined } from '@/utils/icons';
import { ARCHIVES_PAGESIZE } from '@/config';
import { groupBy } from '@/utils';
import Pagination from '@/components/Pagination';
import Head from '@/components/Head';
import useFetchList from '@/hooks/useFetchList';
import styles from './index.module.less';

const Archives = () => {
  const { pathname, search } = useLocation();
  const { dataList, loading, pagination } = useFetchList({
    requestUrl: '/article/list',
    queryParams: {
      pageSize: ARCHIVES_PAGESIZE,
    },
    fetchDependence: [pathname, search],
  });

  const list = groupBy(dataList, (item) => item.createdAt.slice(0, 7)); // 按年份排序
  return (
    <div className='app-archives' style={{ padding: '40px 20px' }}>
      <Spin tip='Loading...' spinning={loading} delay={500}>
        <Head title='归档' />
        <Timeline>
          {list.map((d, i) => (
            <Fragment key={i}>
              {i === 0 && (
                <Timeline.Item>
                  <span
                    className={styles.desc}
                  >
                    {`Nice! ${pagination.total} posts in total. Keep on posting.`}
                  </span>
                </Timeline.Item>
              )}

              <Timeline.Item
                style={{ height: '36px', marginTop: '16px' }}
                dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
                color='red'
              >
                <div className={styles.month}>{d[0].createdAt.slice(0, 7)}</div>
                <br />
              </Timeline.Item>

              {d.map((item) => (
                <Timeline.Item key={item.id}>
                  <span style={{ fontSize: '13px', marginRight: '16px' }}>
                    {item.createdAt.slice(5, 10)}
                  </span>
                  <Link to={`/article/${item.id}`}>{item.title}</Link>
                </Timeline.Item>
              ))}
            </Fragment>
          ))}
        </Timeline>

        <Pagination
          {...pagination}
          style={{ float: 'initial', marginTop: 10 }}
        />
      </Spin>
    </div>
  );
};

export default Archives;
