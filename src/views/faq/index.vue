<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 20:01:30
 * @LastEditors: harley
 * @LastEditTime: 2023-10-24 17:23:36
-->
<template>
  <van-nav-bar title="General FAQs" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
  <div class="main">
    <div class="text" v-html="html"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useIndexStore } from '@/store';
const indexStore = useIndexStore();
indexStore.getIndex();
const html = computed(() => {
  let str = '';
  try {
    str = indexStore.indexInfo.config.intro_vi;
  } catch (error) {}
  return str;
});
const onClickLeft = () => history.back();
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
