import React, { useState } from 'react';
import { Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import useMount from '@/hooks/useMount';
import { SearchOutlined } from '@/utils/icons';
import { decodeQuery } from '@/utils';
import styles from './index.module.less';

const SearchButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [keyword, setKeyword] = useState('');

  useMount(() => {
    const { keyword: key } = decodeQuery(location.search);
    if (key) {
      setKeyword(key);
    }
  });

  const handleSubmit = () => {
    if (keyword) navigate(`/?page=1&keyword=${keyword}`);
  };

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handlePressEnter = (e) => {
    e.target.blur();
  };

  return (
    <div className={styles.searchBox}>
      <SearchOutlined className={styles.searchIcon} />
      <Input
        type='text'
        value={keyword}
        onChange={handleChange}
        onBlur={handleSubmit}
        onPressEnter={handlePressEnter}
        className={styles.searchInput}
        placeholder='搜索文章'
        style={{ width: 200 }}
      />
    </div>
  );
};

export default SearchButton;
