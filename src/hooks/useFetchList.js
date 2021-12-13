import { useEffect, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import axios from '@/utils/axios';
import { decodeQuery } from '@/utils';
import useMount from './useMount';

/**
 * fetchList
 * requestUrl 请求地址
 * queryParams 请求参数
 * withLoading 是否携带 loading
 * fetchDependence 依赖 => 可以根据地址栏解析拉取列表
 */
const useFetchList = ({
  requestUrl = '',
  queryParams = null,
  withLoading = true,
  fetchDependence = [],
}) => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const location = useLocation();
  const history = useHistory();

  function fetchDataList(params) {
    const requestParams = {
      page: pagination.current,
      pageSize: pagination.pageSize,
      ...queryParams,
      ...params,
    };

    requestParams.page = parseInt(requestParams.page, 10);
    requestParams.pageSize = parseInt(requestParams.pageSize, 10);
    axios
      .get(requestUrl, { params: requestParams })
      .then((response) => {
        pagination.total = response.count;
        pagination.current = parseInt(requestParams.page, 10);
        pagination.pageSize = parseInt(requestParams.pageSize, 10);
        setPagination({ ...pagination });
        setDataList(response.rows);
        // console.log('%c useFetchList: ', 'background: yellow', requestParams, response)
        if (withLoading) {
          setLoading(false);
        }
      })
      .catch(() => withLoading && setLoading(false));
  }

  function fetchWithLoading(params) {
    if (withLoading) {
      setLoading(true);
    }
    fetchDataList(params);
  }

  useMount(() => {
    if (fetchDependence.length === 0) {
      fetchWithLoading();
    }
  });

  useEffect(() => {
    if (fetchDependence.length > 0) {
      const params = decodeQuery(location.search);
      fetchWithLoading(params);
    }
  }, fetchDependence);

  const onFetch = useCallback(
    (params) => {
      if (withLoading) {
        setLoading(true);
      }
      fetchDataList(params);
    },
    [queryParams]
  );

  const handlePageChange = useCallback(
    (page) => {
      // return
      const search = location.search.includes('page=')
        ? location.search.replace(/(page=)(\d+)/, `$1${page}`)
        : `?page=${page}`;
      const jumpUrl = location.pathname + search;

      history.push(jumpUrl);
    },
    [queryParams, location.pathname]
  );

  return {
    dataList,
    loading,
    pagination: {
      ...pagination,
      onChange: handlePageChange,
    },
    onFetch,
  };
};

export default useFetchList;
