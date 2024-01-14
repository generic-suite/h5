/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-05 13:57:02
 * @LastEditors: harley
 * @LastEditTime: 2023-10-11 16:38:40
 */
import request from '@/utils/axios.js';
// 获取首页信息
export const getIndex = () => {
  return request({
    url: '/getIndex',
    method: 'POST',
  });
};

// 获取会员列表
export const getVipList = (params) => {
  return request({
    url: '/api/vip-list',
    method: 'GET',
    data: params,
  });
}