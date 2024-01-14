<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-06 13:27:16
 * @LastEditors: harley
 * @LastEditTime: 2023-10-19 17:09:59
-->
<template>
  <div class="pages">
    <div class="header">
      <van-nav-bar :title="t('topup.deposit')" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
    </div>
    <div class="main">
      <div class="content">
        <div class="my-card">
          <div class="name">{{ t('withdraw.AccountBalance') }}</div>
          <div class="balance">USDT {{ userInfo.balance }}</div>
        </div>

        <div class="title" style="color: #999; margin: 10px 0">{{ t('topup.DepositAmount') }}:</div>
        <div class="grid">
          <div class="item" v-for="item in valueList" @click="setInput(item.value)">
            <div class="label">USDT</div>
            <div class="value">{{ renderNums(item.value) }}</div>
          </div>
        </div>
        <div class="input-block">
          <van-field
            v-model="defaultValue"
            class="input-handle"
            placeholder="0.00"
            @blur="inputBlur"
            @focus="inputFocus"
            :formatter="formatter"
          />
        </div>
        <div class="container">
          <van-button class="btn" size="small" type="primary" block @click="goContact">{{
            t('topup.ContactSupport')
          }}</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';

import useUserInfo from '@/hooks/useUserInfo';
const userInfo = computed(() => {
  const user = useUserInfo().userInfo;
  return user.value;
});
const onClickLeft = () => history.back();
import { list } from './config.js';
const valueList = ref(list);
const renderNums = (num) => {
  // 1000转为1,000
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const inputType = ref(false);
const inputFocus = (e) => {
  inputType.value = true;
};
const inputBlur = (e) => {
  inputType.value = false;
};
const formatter = (value) => {
  // 限制只能输入数字
  let str = value.replace(/[^\d.]/g, '');
  // 为空时,重置为0.00
  if (str === '') {
    str = '0.00';
  }
  // 除了小数点,数字逢三加逗号
  str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return str;
};
const defaultValue = ref('0.00');
const setInput = (e) => {
  // 没有小数点时,添加小数点
  let value = e.toString();
  if (value.indexOf('.') === -1) {
    value += '.00';
  }
  defaultValue.value = value;
};
import { useRouter } from 'vue-router';
const router = useRouter();
const goContact = () => {
  const path = '/support';
  router.push({ path });
};
</script>

<style scoped lang="scss">
.pages {
  background-color: #000;
  height: 100vh;
  overflow-y: auto;
  padding-top: 45px;
}
.header {
  background-color: #000;
  --van-tab-active-text-color: var(--primary);
  --van-tab-font-size: 16px;
  border-bottom: 1px solid rgb(214, 215, 217);
  :deep(.van-tabs__line) {
    display: none;
  }
}
.main {
  padding: 15px;
  --van-cell-horizontal-padding: 0;
  background: #000;
  height: calc(100vh - 90px);
  overflow-y: scroll;
  .my-card {
    padding: 20px;
    border-radius: 10px;
    background: url('@/assets/img/bg-GIF02.gif');
    background-size: 100% auto;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
    .balance {
      font-size: 24px;
      font-weight: 600;
    }
    .text {
      font-size: 12px;
    }
  }
  .title {
    font-size: 16px;
    font-weight: 400;
  }
  .grid {
    // 一行3个,2行显示
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 8px;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 5px;

      background: #fff;
      border-radius: 3px;
      box-shadow: 0 5px 6px 0 rgb(220 220 220 / 36%);
      text-align: center;
      font-size: 13px;
      padding: 12px 0;
      .label {
        font-size: 14px;
        font-weight: 400;
      }
      .value {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  .input-block {
    margin-top: 10px;
    border-bottom: 1px solid #eee;
    --van-cell-horizontal-padding: 0;
    .title-tips {
      transition: all 0.3s ease-in-out;
      color: #999;
      font-size: 14px;
      font-weight: 100;
      &.focus {
        color: #222;
      }
    }
    .input-handle {
      font-size: 16px;
    }
  }
}
.deposit-list {
  .item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #333;
    align-items: center;
    .info {
      display: flex;
      flex-direction: column;
      gap: 6px;
      color: #fff;
      .name {
        font-size: 16px;
        font-weight: 400;
      }
      .time {
        font-size: 12px;
        color: #999;
      }
    }
    .value {
      font-size: 16px;
      font-weight: 600;
      text-align: right;
      display: flex;
      flex-direction: column;
      gap: 6px;
      color: #fff;
      .behavior {
        color: #999;
        font-weight: 100;
      }
      .value-after {
        color: var(--primary);
      }
    }
  }
}
.container {
  margin-top: 20px;
}
</style>
