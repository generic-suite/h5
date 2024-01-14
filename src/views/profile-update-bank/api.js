import request from '@/utils/axios'

export const getCardInfo = () => {
  return request({
    url: '/getCard',
    method: 'POST',
  });
}
export const setCardInfo = (params) => {
  return request({
    url: '/setCard',
    method: 'POST',
    data: params
  });
}