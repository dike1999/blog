import request from '@/utils/request';

export const deleteUserById = (id) => {
  const url = `/user/${id}`;
  return request.get(url);
};
export const postLogin = (params) => {
  const url = '/login';
  return request.post(url, params);
};

export const postRegister = (params) => {
  const url = '/register';
  return request.post(url, params);
};
export const putUserAuthority = (id, params) => {
  const url = `/user/${id}`;
  return request.put(url, params);
};
