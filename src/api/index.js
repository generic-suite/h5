/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-05 14:35:07
 * @LastEditors: harley
 * @LastEditTime: 2023-10-16 14:14:53
 */
import request from '@/utils/axios.js';
// 登录
export const login = (data) => {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  });
};

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: '/api/user/getUserInfo',
    method: 'POST',
  });
};
// 注册
export const registerApi = (data) => {
  return request({
    url: '/api/user/register',
    method: 'post',
    data,
  });
};
// 获取注册的条款
export const getAgreement = () => {
  return request({
    url: '/getAgreement',
    method: 'post',
  });
};

// 获取基础信息
export const getIndex = () => {
  return request({
    url: '/getIndex',
    method: 'POST',
  });
};

// 获取客服信息
export const getCustomer = () => {
  return request({
    url: '/api/customer',
    method: 'get',
  });
};

// 获取系统配置
export const getSystemConfig = () => {
  return request({
    url: '/api/system-config',
    method: 'get',
  });
};

// 获取系统文本信息
export const getSystemText = (data) => {
  return request({
    url: '/api/sys-config-text',
    method: 'get',
    params: data,
  });
}