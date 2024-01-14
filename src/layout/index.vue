<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 09:42:47
 * @LastEditors: Harley
 * @LastEditTime: 2023-12-04 08:58:54
-->
<template>
  <div class="layout">
    <router-view> </router-view>
    <div class="footer">
      <div class="router-item" v-for="item in routerList" @click="goRouter(item.to)">
        <div class="photo">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="text">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { getAssetsImgPath } from '@/utils/index.js';
const routerList = [
  { name: t('layout.HOME'), to: '/index/home', imgUrl: getAssetsImgPath('home.png') },
  { name: t('layout.START'), to: '/index/start', imgUrl: getAssetsImgPath('app.png') },
  { name: t('layout.RECORDS'), to: '/index/history', imgUrl: getAssetsImgPath('calendar.png') },
];
import { useRouter } from 'vue-router';
const router = useRouter();
const goRouter = (path) => {
  router.push(path);
};
</script>

<style scoped lang="scss">
.footer {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: var(--page-width);
  background-color: #fff;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .router-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // &:nth-child(2) {
    //   position: relative;
    //   .photo {
    //     width: 50px;
    //     height: 50px;
    //     margin-top: -26px;
    //     background-color: rgb(36, 36, 36);
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     border-radius: 100px;
    //     overflow: hidden;
    //   }
    // }
    .photo {
      border-radius: 100px;
      width: 40px;
    }
    .text {
      margin-top: 0;
    }
  }
}
.layout {
  :deep(.van-tabbar) {
    .van-tabbar-item {
      &:nth-child(2) {
        // background-color: red;
        .van-badge__wrapper {
          // width: 60px;
          // height: 60px;
          background: red;
          // position: absolute;
          // top: -20px;
        }
      }
    }
  }
}
</style>
