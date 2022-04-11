import request from '@/utils/request';

export default (params) => {
  const url = `/article/list/${params}`;
  return request.delete(url);
};
