/*
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-10 11:42:53
 * @LastEditors: harley
 * @LastEditTime: 2023-10-12 15:56:23
 */
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/modules/user';

export default function useUserInfo() {
  const userStore = useUserStore();
  const userInfo = storeToRefs(userStore).user;

  const getUserInfo = () => {
    userStore.getUserInfo().then((res) => {
      userInfo.value = res.data;
    });
  };
  return {
    userInfo,
    getUserInfo,
  };
}
