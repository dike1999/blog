import request from '@/utils/request';

export default (id, params) => {
  const url = `/article/${id}`;
  return request.put(url, params);
};
