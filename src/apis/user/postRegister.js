import request from '@/utils/request';

export default (params) => {
  const url = '/register';
  return request.post(url, params);
};
