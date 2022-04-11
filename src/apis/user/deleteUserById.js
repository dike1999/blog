import request from '@/utils/request';

export default (id) => {
  const url = `/user/${id}`;
  return request.get(url);
};
