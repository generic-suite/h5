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
    <div class="text" v-html="html"></div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref } from 'vue';
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
  margin-top: 50px;
  width: calc(100% - 20px);
}
</style>
