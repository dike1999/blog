import request from '@/utils/request';

export default (params) => {
  const url = '/tag/list';
  return request.get(url, { params });
};
