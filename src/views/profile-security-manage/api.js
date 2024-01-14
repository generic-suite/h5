/*
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-06 20:17:50
 * @LastEditors: harley
 * @LastEditTime: 2023-10-10 14:37:17
 */
import request from '@/utils/axios';

export const changePass = (data) => {
  return request({
    url: '/changePass',
    method: 'post',
    data,
  });
}
