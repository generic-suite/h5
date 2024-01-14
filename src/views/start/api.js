/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-11 12:11:14
 * @LastEditors: harley
 * @LastEditTime: 2023-10-11 12:31:06
 */
import request from '@/utils/axios';
export const setOrder = () => {
  return request({
    url: '/api/mid-order/startOrder',
    method: 'POST',
  });
};

export const commitOrder = (params) => {
  return request({
    url: '/api/mid-order/submitOrder',
    method: 'POST',
    data: params,
  });
};

// 获取图标列表
export const getAppList = () => {
  return request({
    url: '/api/app-list',
    method: 'get',
  });
};
