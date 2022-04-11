import request from '@/utils/request';

export default (id, params) => {
  const url = `/user/${id}`;
  return request.put(url, params);
};
