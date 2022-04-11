import request from '@/utils/request';

export default (params) => {
  const url = '/discuss';
  return request.post(url, params);
};
