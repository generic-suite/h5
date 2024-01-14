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
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  async (res) => {
    console.log('🚀 正确返还', res);
    if (res.status >= 200 && res.status < 300 && res.data) {
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    if (error.response.status === 401) {
      removeToken();
      window.location.href = '/login';
      return;
    }
    return Promise.reject(error);
  },
);

export default service;
