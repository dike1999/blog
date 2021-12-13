import React, { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';

import useMount from '@/hooks/useMount';
import { decodeQuery } from '@/utils';
import './index.less';

const SearchButton = () => {
  const history = useHistory();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');

  useMount(() => {
    const { keyword: key } = decodeQuery(location.search);
    if (key) {
      setKeyword(key);
    }
  });

  const handleSubmit = () => {
    if (keyword) history.push(`/?page=1&keyword=${keyword}`);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handlePressEnter = (e) => {
    e.target.blur();
  };

  return (
    <div id='search-box'>
      <SearchOutlined className='search-icon' />
      <Input
        type='text'
        value={keyword}
        onChange={handleChange}
        onBlur={handleSubmit}
        onPressEnter={handlePressEnter}
        className='search-input'
        placeholder='搜索文章'
        style={{ width: 200 }}
      />
    </div>
  );
};

export default SearchButton;
