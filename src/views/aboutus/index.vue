<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 20:03:42
 * @LastEditors: harley
 * @LastEditTime: 2023-10-16 14:54:43
-->
<template>
  <van-nav-bar :title="t('home.AboutUs')" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
  <div class="main">
    <div class="text" v-html="html"></div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const onClickLeft = () => history.back();
import { useIndexStore } from '@/store';
import { computed } from 'vue';
const indexStore = useIndexStore();
indexStore.getIndex();
const html = computed(() => {
  let str = '';
  try {
    str = indexStore.indexInfo.config.about_us_vi;
  } catch (error) {}
  return str;
});
</script>

<style scoped lang="scss">
.main {
  margin: 0 auto;
  margin-top: 45px;
  background: #000;
  color: #fff;
  .text {
    padding: 20px;
  }
}
</style>
