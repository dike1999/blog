import request from '@/utils/request';

export const deleteDiscuss = (url) => request.delete(url);

export const postDiscuss = (params) => {
  const url = '/discuss';
  return request.post(url, params);
};
