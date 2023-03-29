import request from '@/utils/request';

const getCategoryList = (params) => {
  const url = '/category/list';
  return request.get(url, { params });
};

export default { getCategoryList };
