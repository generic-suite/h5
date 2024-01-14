<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-06 22:58:10
 * @LastEditors: harley
 * @LastEditTime: 2023-10-17 18:16:36
-->
<template>
  <van-nav-bar :title="t('home.LatestEvent')" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
  <div class="main">
    <img :src="imgUrl1" alt="" />
    <img :src="imgUrl2" alt="" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref } from 'vue';
const onClickLeft = () => history.back();
import { useIndexStore } from '@/store';
const indexStore = useIndexStore();
const imgUrl1 = ref(indexStore.indexInfo.config.active_vi[0]);
const imgUrl2 = ref(indexStore.indexInfo.config.pop_vi);
</script>

<style scoped lang="scss">
.main {
  margin: 0 auto;
  margin-top: 50px;
  width: calc(100% - 20px);
}
</style>
