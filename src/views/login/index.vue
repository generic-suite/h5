<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 09:58:37
 * @LastEditors: Harley
 * @LastEditTime: 2023-12-04 09:04:07
-->
<template>
  <div class="header">
    <div class="logo">
      <img :src="logo" alt="" />
    </div>
    <div class="handle">
      <div class="btn login" @click="openLoginDialog">
        <img :src="loginIcon" alt="" />
      </div>
      <div class="btn register plain" @click="openRegisterDialog">
        <img :src="signupIcon" alt="" />
      </div>
    </div>
  </div>
  <div class="video-main">
    <HVideo class="video-player" :src="videoUrl"></HVideo>
  </div>
  <div v-if="showOverlay" class="overlay" @click="showOverlay = false">
    <div class="wrapper" @click.stop>
      <div class="logo">
        <img :src="logo" alt="" />
      </div>
      <login v-if="overLayType === 'login'"></login>
      <register v-if="overLayType === 'register'"></register>
    </div>
  </div>
</template>
<script setup>
import loginIcon from '@/assets/img/icon-client-login.png';
import signupIcon from '@/assets/img/icon-client-signup.png';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref } from 'vue';
import videoUrl from '/video/video.mp4';
import logo from '@/icons/logo.svg';
import login from '@/components/login/index.vue';
import register from '@/components/register/index.vue';
const showOverlay = ref(false);
const overLayType = ref('login');
const openLoginDialog = () => {
  showOverlay.value = true;
  overLayType.value = 'login';
};
const openRegisterDialog = () => {
  console.log('safsa');
  showOverlay.value = true;
  overLayType.value = 'register';
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 56px;
  background: rgba($color: black, $alpha: 0.1);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    height: 40px;
    width: auto;
  }
  .handle {
    display: flex;
    justify-content: space-between;
    .btn {
      // width: 100px;
      height: 40px;
      line-height: 32px;
      text-align: center;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
      &.plain {
        background: none;
      }
    }
  }
}
.video-main {
  width: var(--page-width);
  height: 100vh;
  :deep(video) {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
}

.overlay {
  width: 100vw;
  height: 100vh;
  background: none;
  position: fixed;
  top: 0;
  left: 0;

  .wrapper {
    width: 300px;
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba($color: #000000, $alpha: 0.4);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
      width: calc(100% - 80px);
      margin: 20px 0;
    }
  }
}
</style>
