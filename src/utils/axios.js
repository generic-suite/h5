/*
 * @Descripttion:
 * @Author: 李峥
 * @Date: 2023-07-10 15:53:56
 * @LastEditors: harley
 * @LastEditTime: 2023-10-12 21:10:39
 */
import axios from 'axios';
import { getToken, removeToken } from './auth.js';
import CryptoJS from 'crypto-js';
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // 超时
  timeout: 15000,
});

service.interceptors.request.use(
  (config) => {
    // 毫秒时间戳
    const S_Time = new Date().getTime();
    config.headers['S-Time'] = S_Time;
    const tokenSocurce = `${S_Time}@62b7c5572a99ee1@${S_Time}`;
    const S_Token = CryptoJS.MD5(tokenSocurce).toString();
    config.headers['S-Token'] = S_Token;
    config.headers['authorization'] = getToken() || '';
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  async (res) => {
    if (res.status == 200 && res.data) {
      // 需要重新登录
      if (res.data.logout === true) {
        removeToken();
        window.location.href = '/login';
        return;
      }
      return res.data;
    } else {
      return Promise.reject(msg);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default service;
