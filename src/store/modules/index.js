// 基础数据
import { defineStore } from 'pinia';
import { getIndex } from '@/api/index.js';

export const useIndexStore = defineStore('index', {
  state: () => {
    return {
      index: null,
    };
  },
  getters: {
    indexInfo: (state) => state.index,
  },
  actions: {
    getIndex() {
      return getIndex().then((res) => {
        if (res.success === true) {
          this.index = res.data;
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
        key: 'index',
        storage: localStorage, //更改默认存储方式
      },
    ],
  },
});
