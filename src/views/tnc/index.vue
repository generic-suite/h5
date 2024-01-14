<template>
  <van-nav-bar :title="t('home.TermsConditions')" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
  <div class="main">
    <div class="text" v-html="html"></div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { useIndexStore } from '@/store/index';
import { computed } from 'vue';
const index = useIndexStore();

const onClickLeft = () => history.back();
const html = computed(() => {
  let str = '';
  try {
    str = index.indexInfo.config.rule_vi;
  } catch (error) {}
  return str;
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
