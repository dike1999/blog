import request from '@/utils/request';

export default (params) => {
  const url = '/article/upload/confirm';
  return request.post(url, params);
};
