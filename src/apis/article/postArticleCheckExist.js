import request from '@/utils/request';

export default (params) => {
  const url = '/article/checkExist';
  return request.post(url, params);
};
