import request from '@/utils/axios';

export const getList = (data) => {
  return request({
    url: '/api/mid-wallet-flow/getList',
    method: 'get',
    params: data,
  });
};
