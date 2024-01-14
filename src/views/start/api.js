/*
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-11 12:11:14
 * @LastEditors: harley
 * @LastEditTime: 2023-10-11 12:31:06
 */
import request from '@/utils/axios';
import dayjs from 'dayjs';
export const setOrder = () => {
  return request({
    url: '/setOrder',
    method: 'POST',
    data: {
      web_time: dayjs().format('YYYY/MM/DD HH:mm:ss'),
    },
  });
};

export const commitOrder = (params) => {
  return request({
    url: '/commitOrder',
    method: 'POST',
    data: params,
  });
}

// 获取图标列表
export const getAppList = () => {
  return request({
    url: '/getAppList',
    method: 'POST',
  });
}
