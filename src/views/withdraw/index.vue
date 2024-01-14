<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-06 15:38:47
 * @LastEditors: Harley
 * @LastEditTime: 2023-12-05 10:44:42
-->
<template>
  <div class="header">
    <van-nav-bar :title="t('withdraw.CashWithdrawal')" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
    <van-tabs class="van-tabs" v-model:active="active">
      <van-tab :title="t('withdraw.CashWithdrawal')"></van-tab>
      <van-tab :title="t('withdraw.WithdrawalHistory')"></van-tab>
    </van-tabs>
  </div>
  <div class="main">
    <template v-if="active === 0">
      <div class="content">
        <div class="my-card">
          <div class="name">{{ t('withdraw.AccountBalance') }}</div>
          <div class="balance">USDT {{ userInfo.balance }}</div>
          <div class="text">*{{ t('withdraw.WithdrawTime') }}</div>
        </div>
        <p class="text-left text-secondary mb-1 ng-binding">
          {{ t('withdraw.withdrawalAddress1') }}
          <br />
          <br />
          {{ t('withdraw.withdrawalAddress2') }}
          <br />
          <br />
          {{ t('withdraw.WithdrawalTimeLimit') }}
          {{ withTimeRange }}
          {{ t('withdraw.WithdrawalTimeUnit') }}
        </p>

        <van-form @submit="onSubmit" label-width="130px">
          <div class="form-area">
            <van-field v-model="formValue.price" :label="t('withdraw.WithdrawAmount')" name="price" type="number" />
            <van-field v-model="formValue.pass" :label="t('withdraw.WithdrawPassword')" name="pass" type="password" />
          </div>
          <div class="btn-block">
            <van-button block v-if="isWalletAddress" type="primary" native-type="submit">{{
              t('withdraw.Withdraw')
            }}</van-button>
            <van-button block type="danger" v-else @click="routerGo('/profile-update-bank')">{{
              t('withdraw.YouHaveTotSetUpYourWalletAddress')
            }}</van-button>
          </div>
        </van-form>
      </div>
    </template>
    <template v-else>
      <template v-if="dataList.length">
        <van-list
          class="list"
          v-model:loading="loading"
          :finished="finished"
          :finished-text="t('common.NoMore')"
          :loading-text="t('common.loading')"
          @load="getList"
        >
          <div class="item" v-for="item in negativeList">
            <div class="top">
              <div class="name">{{ item.remark }}</div>
              <div class="value">-{{ item.price }}</div>
            </div>
            <div class="bottom">
              <div class="time">{{ item.handle_time }}</div>
              <div class="balance">{{ item.price_pre }}</div>
            </div>
          </div>
        </van-list>
        <div class="list" v-if="false">
          <div class="item" v-for="item in negativeList">
            <div class="top">
              <div class="name">{{ item.remark }}</div>
              <div class="value">-{{ item.price }}</div>
            </div>
            <div class="bottom">
              <div class="time">{{ item.handle_time }}</div>
              <div class="balance">{{ item.price_pre }}</div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <van-button block style="--van-button-radius: 15px" size="large" type="warning">{{
          t('withdraw.NoTransactionHistory')
        }}</van-button>
      </template>
    </template>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import { getData, withdraw, getWalletInfo } from './api';
import useUserInfo from '@/hooks/useUserInfo';
import dayjs from 'dayjs';
// 提现时间限制
import { useIndexStore } from '@/store';
const indexStore = useIndexStore();
indexStore.getIndex();
const withTimeRange = computed(() => {
  return indexStore.indexInfo.config.withdraw_time;
});
import { useRouter } from 'vue-router';
const router = useRouter();
const routerGo = (path) => {
  router.push(path);
};
const userInfo = computed(() => {
  const user = useUserInfo().userInfo;
  return user.value;
});

const active = ref(0);
const onClickLeft = () => history.back();
const formValue = reactive({
  price: '',
  pass: '',
});
const initFormValue = () => {
  formValue.price = '0.00';
};
initFormValue();

const loading = ref(false);
const finished = ref(false);
const dataList = ref([]);
const currentPage = ref(0);
const getList = async () => {
  currentPage.value++;
  const params = {
    page: currentPage.value,
    web_time: dayjs().format('YYYY/MM/DD HH:mm:ss'),
  };
  const res = await getData(params);
  loading.value = false;
  if (dataList.value.length >= res.total) {
    finished.value = true;
  }
  dataList.value.push(...res.data);
  return Promise.resolve();
};
const negativeList = computed(() => {
  return dataList.value || [];
});

const isWalletAddress = ref(false);
const getCardInfo = async () => {
  const res = await getWalletInfo(); // 获取钱包信息
  if (res.data.bank_name) {
    isWalletAddress.value = true;
  } else {
    isWalletAddress.value = false;
  }
  return Promise.resolve();
};
const onSubmit = async (e) => {
  const params = {
    pass: formValue.pass,
    price: formValue.price,
    web_time: dayjs().format('YYYY/MM/DD HH:mm:ss'),
  };
  const res = await withdraw(params);
  if (res.success) {
    window.$showSuccessToast(res.msg);
  } else {
    window.$showFailToast(res.msg);
  }
};
(async () => {
  // 这两个接口可以并行请求
  getCardInfo();
  getList();
})();
</script>

<style scoped lang="scss">
.header {
  background-color: #000;
  padding-top: 45px;
  .van-tabs {
    --van-tab-active-text-color: var(--primary);
    --van-tab-font-size: 16px;
    border-bottom: 1px solid rgb(214, 215, 217);
    :deep(.van-tabs__line) {
      display: none;
    }
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
  .text-secondary {
    color: #878787;
  }
  .van-form {
    .form-area {
      padding: 10px;
      margin-top: 20px;
      border-radius: 10px;
      background-color: #fff;
    }
  }

  .computed-amount {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
    .text-secondary {
      font-size: 12px;
    }
    .amount {
      font-size: 16px;
      font-weight: 600;
    }
  }
  .btn-block {
    margin-top: 10px;
  }
}
.container {
  margin-top: 20px;
}
.list {
  .item {
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    flex-direction: column;
    gap: 6px;
    &:last-child {
      border-bottom: none;
    }
    .top,
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
      color: rgba($color: #fff, $alpha: 0.65);
      font-size: 16px;
      font-weight: 400;
      .name {
        color: rgba($color: #fff, $alpha: 0.75);
      }
    }
    .value {
      color: #590f7f;
      font-weight: 600;
    }
  }
}
</style>
