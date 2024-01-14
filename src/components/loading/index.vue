<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-06 11:04:46
 * @LastEditors: harley
 * @LastEditTime: 2023-10-15 09:48:18
-->
<template>
  <van-overlay class="overlay flex" :show="show">
    <div class="content">
      <div class="logo">
        <img :src="logo" alt="" />
      </div>
      <div class="loading">
        <van-loading color="#000" />
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import logo from '@/icons/logo.svg';
const show = ref(true);
const open = () => {
  show.value = true;
};
const close = () => {
  show.value = false;
};
defineExpose({
  open,
  close,
});
</script>

<style scoped lang="scss">
.overlay {
  --van-overlay-background: rgba(255, 255, 255, 1);
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .logo {
      width: 100px;
    }
    .loading {
      text-align: center;
    }
  }
}
</style>
