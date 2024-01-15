<template>
  <van-nav-bar :title="t('home.TermsConditions')" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
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
  config_type: 8,
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
  .text {
    padding: 20px;
  }
}
</style>
