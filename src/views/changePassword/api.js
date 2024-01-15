import request from '@/utils/axios';

export const changePass = (data) => {
  return request({
    url: '/api/user/changePassword',
    method: 'post',
    data,
  });
};
