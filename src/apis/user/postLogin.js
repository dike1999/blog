import request from '@/utils/request';

export default (params) => {
  const url = '/login';
  return request.post(url, params);
};
