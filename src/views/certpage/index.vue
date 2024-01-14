<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 19:43:56
 * @LastEditors: harley
 * @LastEditTime: 2023-10-17 17:47:21
-->
<template>
  <van-nav-bar :title="t('home.Certificate')" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
  <div class="main">
    <img :src="certImg" alt="" />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import { useIndexStore } from '@/store';
const indexStore = useIndexStore();
indexStore.getIndex();
const certImg = ref('');
try {
  certImg.value = indexStore.indexInfo.config.cert_vi[0];
} catch (error) {}
const onClickLeft = () => history.back();
</script>

<style scoped lang="scss">
.main {
  margin: 0 auto;
  margin-top: 50px;
  width: calc(100% - 20px);
}
</style>
