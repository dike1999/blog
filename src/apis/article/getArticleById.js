import request from '@/utils/request';

export default (id, type) => {
  let url = `/article/${id}`;
  if (type) {
    url += `?type=${type}`;
  }
  return request.get(url);
};
