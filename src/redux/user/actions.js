/* eslint-disable implicit-arrow-linebreak */
import { message } from 'antd';
import * as TYPES from '@/redux/types';
import postLogin from '@/apis/user/postLogin';
import postRegister from '@/apis/user/postRegister';

export const login = (params) => (dispatch) =>
  postLogin(params).then((res) => {
    dispatch({
      type: TYPES.USER_LOGIN,
      payload: res,
    });
    message.success(`登录成功, 欢迎您 ${res.username}`);
    return res;
  });

export const register = (params) => () =>
  postRegister(params).then(() => {
    message.success('注册成功，请重新登录您的账号!');
  });

export const loginout = () => ({
  type: TYPES.USER_LOGIN_OUT,
});
