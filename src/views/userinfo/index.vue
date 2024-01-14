<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-15 15:46:12
 * @LastEditors: harley
 * @LastEditTime: 2023-10-19 17:10:28
-->
<template>
  <div class="pages">
    <van-nav-bar fixed left-arrow @click-left="onClickLeft" :title="t('userinfo.EditProfile')"> </van-nav-bar>
    <div class="main">
      <van-cell-group>
        <van-cell :title="t('userinfo.ProfileImage')" is-link>
          <template #value>
            <div class="photo">
              <img :src="getAssetsImgPath('default_headimg.jpg')" />
            </div>
          </template>
        </van-cell>

        <van-cell :title="t('userinfo.username')" :value="userInfo.username" />
      </van-cell-group>

      <van-cell-group>
        <van-cell :title="t('userinfo.ChangeWithdrawalPassword')" is-link @click="changePassword('2')"> </van-cell>
        <van-cell :title="t('userinfo.ChangeLoginPassword')" is-link @click="changePassword('1')" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import { getAssetsImgPath } from '@/utils';
const onClickLeft = () => history.back();

import { useUserStore } from '@/store';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
import { useRouter } from 'vue-router';
const router = useRouter();
const changePassword = (num) => {
  router.push({
    path: '/changePassword',
    query: {
      type: num,
    },
  });
};
</script>

<style scoped lang="scss">
.pages {
  background-color: #000;
  padding-top: 45px;
  height: 100vh;
  --van-cell-text-color: #d81427;
  --van-cell-value-color: #000;
  --van-cell-right-icon-color: var(--van-cell-text-color);
  :deep(.van-cell-group) {
    border-radius: 10px;
    overflow: hidden;
  }
  :deep(.van-cell) {
      align-items: center;
  }
  .photo {
    width: 24px;
    height: 24px;
    width: 40px;
    height: 40px;
    display: flex;
    float: right;
    border-radius: 40px;
    overflow: hidden;
  }
  .main {
    padding: 20px;
    .van-cell-group {
      margin-bottom: 20px;
    }
  }
}
</style>
