<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 10:16:01
 * @LastEditors: harley
 * @LastEditTime: 2023-10-17 17:17:20
-->
<template>
  <van-nav-bar :title="t('support.ContactUs')" left-arrow @click-left="onClickLeft" />
  <div class="main">
    <p class="ng-binding">{{ t('support.ContactUsIfYouHaveAnyProblem') }}</p>
    <div style="padding-top: 20px; padding-bottom: 20px; text-align: center">
      <img style="width: 55px" :src="bgImg" />
    </div>
    <div class="text-center">
      <h6 class="ng-binding">{{ t('support.ContactUsVia') }}</h6>
      <p style="font-size: 0.85rem; color: #acacac" class="ng-binding">
        {{ t('support.CustomerServiceHoursOfOperation') }}
        {{ `10:00:00 - 23:00:00` }}
        {{ t('support.Unit') }}
      </p>
      <div class="btn-list">
        <van-button block v-for="item in customerList">
          {{ item.name }}
        </van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import bgImg from '@/assets/img/BG-19.png';
import { ref } from 'vue';
import { getCustomer } from '@/api/index.js';
const onClickLeft = () => history.back();
const customerList = ref([]);
getCustomer().then((res) => {
  if (res.success) {
    customerList.value = res.data;
  } else {
    window.$showFailToast(res.msg);
  }
});
const openCustomer = () => {
  window.open(customer.value.val, '_blank');
};
</script>

<style scoped lang="scss">
.main {
  padding: 20px;
  height: calc(100vh - 50px);
  background-color: #1d1d1d;
  color: #fff;
  .ng-binding {
    font-size: 16px;
    color: var(van-nav-bar);
  }
}
.text-center {
  text-align: center;
}
.btn-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  .van-button {
    margin: 10px;
    background-color: #5ffc7b;
  }
}
</style>
