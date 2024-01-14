<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-12 17:10:43
 * @LastEditors: harley
 * @LastEditTime: 2023-10-17 18:16:22
-->
<template>
  <van-overlay :show="show">
    <div class="pages" @click.stop>
      <van-nav-bar title="Terms & Conditions" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
      <div class="text" v-html="htmlText"></div>
      <div class="btn">
        <van-button type="primary" block @click="agree" v-if="htmlText">I Agree</van-button>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { ref } from 'vue';
import { getAgreement } from '@/api/index.js';
// 条款
const htmlText = ref('');
const show = ref(true);
getAgreement().then((res) => {
  htmlText.value = res.data.register_vi;
});
const emits = defineEmits(['close', 'onConfirm']);
const onClickLeft = () => {
  emits('close');
};
const agree = () => {
  emits('onConfirm');
};
</script>

<style scoped lang="scss">
.pages {
  padding: 20px;
  padding-top: 45px;
  padding-bottom: 100px;
  height: 100vh;
  overflow-y: scroll;
  background-color: #000;
  color: rgba($color: #fff, $alpha: 0.75);
  background-size: cover;
}
.btn {
  margin-top: 50px;
}
</style>
