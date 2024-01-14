import request from '@/utils/axios'

export const getCardInfo = () => {
  return request({
    url: '/api/mid-bank/getCard',
    method: 'GET',
  });
}
export const setCardInfo = (params) => {
  return request({
    url: '/api/mid-bank/setCard',
    method: 'POST',
    data: params,
  });
}