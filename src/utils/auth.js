/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-05 14:47:39
 * @LastEditors: harley
 * @LastEditTime: 2023-10-12 21:09:32
 */
import jsCookie from 'js-cookie';

const KEY = 'authorization';
export const getToken = () => {
  return jsCookie.get(KEY);
};
export const setToken = (token) => {
  return jsCookie.set(KEY, token);
};
export const removeToken = () => {
  return jsCookie.remove(KEY);
};