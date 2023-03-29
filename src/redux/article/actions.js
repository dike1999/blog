/* eslint-disable implicit-arrow-linebreak */
import * as TYPES from '@/redux/types';
import tagAPI from '@/apis/tag';
import categoryAPI from '@/apis/category';

export const getTagList = () => (dispatch) =>
  tagAPI.getTagList().then((list) => {
    dispatch({
      type: TYPES.ARTICLE_GET_TAG_LIST,
      payload: list,
    });
  });

export const getCategoryList = () => (dispatch) =>
  categoryAPI.getCategoryList().then((list) => {
    dispatch({
      type: TYPES.ARTICLE_GET_CATEGORY_LIST,
      payload: list,
    });
  });
