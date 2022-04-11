/* eslint-disable implicit-arrow-linebreak */
import * as TYPES from '@/redux/types';
import getTagListAPI from '@/apis/tag/getTagList';
import getCategoryListAPI from '@/apis/category/getCategoryList';

export const getTagList = () => (dispatch) =>
  getTagListAPI().then((list) => {
    dispatch({
      type: TYPES.ARTICLE_GET_TAG_LIST,
      payload: list,
    });
  });

export const getCategoryList = () => (dispatch) =>
  getCategoryListAPI().then((list) => {
    dispatch({
      type: TYPES.ARTICLE_GET_CATEGORY_LIST,
      payload: list,
    });
  });
