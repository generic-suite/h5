import request from '@/utils/axios';

export const changePass = (data) => {
  return request({
    url: '/changePass',
    method: 'post',
    data,
  });
};
