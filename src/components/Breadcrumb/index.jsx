/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { useListener } from '@/hooks/useBus';

/**
 * 面包屑
 */
const PvBreadcrumb = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const breadcrumbList = list.length > 0 ? [{ link: '/admin', name: '首页' }].concat(list) : [];

  useListener('breadcrumbList', (lists) => setList(lists));

  const handleClick = (e, goBack = false) => {
    if (goBack) {
      e.preventDefault();
      navigate(-1);
    }
  };

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {breadcrumbList.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {typeof item === 'string' ? (
            item
          ) : (
            <Link
              to={item.link || '/'}
              onClick={(e) => handleClick(e, item.goBack)}
            >
              {item.name}
            </Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default PvBreadcrumb;
