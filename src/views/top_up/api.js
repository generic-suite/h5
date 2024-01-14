import request from '@/utils/axios';

export const getData = (data) => {
  return request({
    // url: '/getWithList',
    url: '/getWalletList', // 钱包记录列表
    method: 'POST',
    data,
  });
};
