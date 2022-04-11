import request from '@/utils/request';

export default (params) => {
  const url = '/article';
  return request.post(url, params);
};
