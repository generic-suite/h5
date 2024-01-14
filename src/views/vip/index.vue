<!--
 * @Descripttion: 
 * @Author: Harley
 * @Date: 2023-12-01 19:16:30
 * @LastEditors: Harley
 * @LastEditTime: 2023-12-04 08:58:04
-->
<template>
  <div class="pages">
    <van-nav-bar title="VIP & LEVEL" fixed left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="main">
      <div class="vip-list">
        <div class="vip-item" v-for="item in vipList">
          <div class="icon">
            <img :src="item.img" alt="" />
          </div>
          <div class="info">
            <div class="top">
              <div class="name">{{ item.name }}</div>
              <van-tag type="primary" v-if="userInfo.level_id === item.id">current</van-tag>
            </div>
            <div class="value">USDT {{ item.price }}</div>
            <div class="label">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import { getIndex } from './api';
import useUserInfo from '@/hooks/useUserInfo';
const user = useUserInfo();
const userInfo = computed(() => {
  return user.userInfo.value;
});
const onClickLeft = () => history.back();
const vipList = ref([]);
getIndex().then(({ data }) => {
  vipList.value = data.vip_list;
});
const renderClass = (e) => {
  return `vip-${e.id}`;
};
</script>

<style scoped lang="scss">
.pages {
  width: var(--page-width);
  height: 100vh;
  background-color: #000;
  padding-top: 50px;
  overflow-y: scroll;
}
.vip-list {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  .vip-item {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px;
    display: flex;
    width: 100%;
    gap: 10px;
    .icon {
      width: 30px;
      height: 30px;
    }
    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .top {
        display: flex;
        gap: 10px;
      }
      .value {
        color: var(--primary);
      }
    }
  }
}
</style>
