/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-06 15:38:47
 * @LastEditors: harley
 * @LastEditTime: 2023-10-16 18:10:15
 */
import request from '@/utils/axios';

export const getData = (data) => {
  return request({
    url: '/getWithList',
    // url: '/getWalletDepositList', // new interface
    method: 'POST',
    data,
  });
};

// 取款
export const withdraw = (data) => {
  return request({
    url: '/setWithData',
    method: 'POST',
    data,
  });
};

// 获取钱包信息
export const getWalletInfo = () => {
  return request({
    url: '/getCard',
    method: 'POST',
  });
};
