/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-05 15:35:26
 * @LastEditors: harley
 * @LastEditTime: 2023-10-13 12:38:54
 */

import { defineStore } from 'pinia';
import { login, getUserInfo } from '@/api/index.js';
import { setToken } from '@/utils/auth.js';
// defineStore 第一个参数是id，必需且值唯一
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null,
      authorization: '',
    };
  },
  getters: {
    userInfo: (state) => state.user,
  },
  actions: {
    //更新整个对象
    updateUser(userInfo) {
      this.user = userInfo;
    },
    //更新对象中某个属性
    updateAge(key, age) {
      this.user[key] = age;
    },

    login(params) {
      return login(params).then((res) => {
        if (res.success === true) {
          this.authorization = res.data.token;
          setToken(res.data.token);
          return res;
        } else {
          window.$showFailToast(res.msg);
          return Promise.reject(res);
        }
      });
    },
    getUserInfo() {
      return getUserInfo().then((res) => {
        if (res.success === true) {
          this.user = res.data;
          return res;
        } else {
          return Promise.reject(res);
        }
      });
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        //key的名称
        key: 'user',
        storage: localStorage, //更改默认存储方式
      },
    ],
  },
});
