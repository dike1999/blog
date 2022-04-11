import request from '@/utils/request';

export default (id) => {
  const url = `/article/${id}`;
  return request.get(url);
};
