import request from '@/utils/request';

export const createArticle = (params) => {
  const url = '/article';
  return request.post(url, params);
};

export const deleteArticleById = (id) => {
  const url = `/article/${id}`;
  return request.delete(url);
};

export const deleteArticleList = (params) => {
  const url = `/article/list/${params}`;
  return request.delete(url);
};

export const getArticleById = ({ articleId, type }) => {
  let url = `/article/${articleId}`;
  if (type) {
    url += `?type=${type}`;
  }
  return request.get(url);
};

export const postArticleCheckExist = (params) => {
  const url = '/article/checkExist';
  return request.post(url, params);
};

export const updateActicle = (id, params) => {
  const url = `/article/${id}`;
  return request.put(url, params);
};

export const uploadArticle = (params) => {
  const url = '/article/upload/confirm';
  return request.post(url, params);
};
