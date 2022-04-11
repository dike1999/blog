import request from '@/utils/request';

export default ({ articleId, type }) => {
  let url = `/article/${articleId}`;
  if (type) {
    url += `?type=${type}`;
  }
  return request.get(url);
};
