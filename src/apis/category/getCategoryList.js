import request from '@/utils/request';

export default (params) => {
  const url = '/category/list';
  return request.get(url, { params });
};
