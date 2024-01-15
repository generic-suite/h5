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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const onClickLeft = () => history.back();

import { getSystemText } from '@/api/index';
const html = ref('');
const params = {
  config_type: 11,
};
getSystemText(params).then((res) => {
  html.value = res.data[0].content;
});
</script>

<style scoped lang="scss">
.main {
  margin: 0 auto;
  margin-top: 45px;
  color: #fff;
  .text {
    padding: 20px;
  }
}
</style>
