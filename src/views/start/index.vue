<template>
  <div class="pages">
    <div class="header">
      <van-nav-bar fixed>
        <template #left>
          <img :src="logoImg" />
        </template>
        <template #right>
          <div class="nav-bar-right" style="display: flex; align-items: center; gap: 4px" @click="routerGo('/account')">
            <img :src="getAssetsImgPath('profile.png')" style="width: 40px" alt="" />
            <span>{{ t('home.PROFILE') }}</span>
          </div>
        </template>
      </van-nav-bar>
    </div>
    <div class="main">
      <div class="photo-animation-area">
        <div class="photo-col">
          <div class="photo" v-for="item in appMap.col1">
            <img :src="item.img" />
          </div>
        </div>
        <div class="photo-col">
          <div class="photo" v-for="item in appMap.col2">
            <img :src="item.img" />
          </div>
        </div>
        <div class="photo-col">
          <div class="photo" v-for="item in appMap.col3">
            <img :src="item.img" />
          </div>
        </div>
        <div class="photo-col">
          <div class="photo" v-for="item in appMap.col4">
            <img :src="item.img" />
          </div>
        </div>
      </div>
    </div>
    <div class="handle-area">
      <a @click="orderStart" style="">
        <p class="start-text">{{ t('start.StartRating') }}</p>
        <!-- <p>({{ userInfo.order_total }}/{{ userInfo.level.order_num }})</p> -->
      </a>
    </div>

    <div class="card">
      <div class="title">
        <div class="left">
          <h3>{{ t('start.Starting') }}</h3>
        </div>
        <div class="right">
          <div>{{ userInfo.username }}</div>
          <div class="vipimg"><img :src="imgUrl" alt="" /></div>
        </div>
      </div>
      <div class="info">
        <div class="item">
          <div class="icon">
            <img :src="getAssetsImgPath('icon-qianbi.png')" />
          </div>
          <div class="data">
            <div class="label">{{ t('start.TodaysProfits') }}</div>
            <div class="value">USDT {{ userInfo.today_profit }}</div>
          </div>
          <div class="remark">{{ t('start.Profits_updated_automatically_system_every_day') }}</div>
        </div>
        <div class="item">
          <div class="icon">
            <img :src="getAssetsImgPath('icon-qianbao.png')" />
          </div>
          <div class="data">
            <div class="label">{{ t('start.Account_Balance') }}</div>
            <div class="value">USDT {{ userInfo.balance }}</div>
          </div>
          <div class="remark">{{ t('start.Profits_product_added_account_balance') }}</div>
        </div>
      </div>
    </div>
    <div class="text-list">
      <strong class="d-block mb-2 ng-binding">{{ t('start.ImportantNotice') }}</strong>
      <small class="text-dark d-block ng-binding">● {{ t('start.OperationHours') }} : {{ timeRange }}</small>
      <small class="text-dark d-block ng-binding">● {{ t('start.more_information_contact_customer_support') }}</small>
    </div>

    <van-action-sheet v-model:show="showOrderInfo" :title="t('start.OptimizationSubmission')">
      <div class="content">
        <div class="product-info">
          <div class="header">
            <div class="photo">
              <img :src="orderInfo.goods_img" alt="" />
            </div>
            <div class="name">{{ orderInfo.goods_name }}</div>
          </div>
          <div class="price">
            <div class="item">
              <div class="label">{{ t('start.Total_amount') }}</div>
              <div class="value">USDT {{ orderInfo.order_amount }}</div>
            </div>
            <div class="item">
              <div class="label">{{ t('start.Profit') }}</div>
              <div class="value">USDT {{ orderInfo.order_commission }}</div>
            </div>
          </div>
          <div class="cell-info">
            <div class="cell-item">
              <div class="label">{{ t('start.Creation_time') }}</div>
              <div class="value">{{ dayjs(orderInfo.create_time).format('yyyy-MM-dd hh:mm:ss') }}</div>
            </div>
            <div class="cell-item">
              <div class="label">{{ t('start.Data_No') }}</div>
              <div class="value">{{ orderInfo.order_no }}</div>
            </div>
          </div>
          <div class="handle">
            <button class="btn" @click="onSubmit">
              <img :src="getAssetsImgPath('icon-client-submit.png')" alt="" />
            </button>
          </div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
const { t } = useI18n();
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import logoImg from '@/icons/logo.svg';
import { getAssetsImgPath } from '@/utils/index.js';
import { setOrder, commitOrder } from './api';
import useUserInfo from '@/hooks/useUserInfo';
// 用户信息
const userInfo = ref(useUserInfo().userInfo);
const imgUrl = computed(() => {
  return userInfo.value.vip.img || '';
});
const showOrderInfo = ref(false);
const orderInfo = ref({});
import { showLoadingToast, closeToast } from 'vant';

const orderStart = (e) => {
  showLoadingToast({
    message: 'Matching...',
    forbidClick: true,
  });

  setOrder()
    .then((res) => {
      if (res.success) {
        useUserInfo().getUserInfo();
        if (res.data) {
          showOrderInfo.value = true;
          orderInfo.value = res.data;
        }
      } else {
        window
          .$showDialog({
            message: res.msg,
          })
          .then(() => {
            router.push('/index/history');
          });
      }
    })
    .finally(() => {
      closeToast();
    });
};

// 提交
const submitLoading = ref(false);
const onSubmit = () => {
  if (submitLoading.value) return;
  submitLoading.value = true;
  const params = {
    order_id: orderInfo.value.order_id,
  };
  commitOrder(params)
    .then((res) => {
      if (res.success) {
        window.$showSuccessToast(res.msg);
        showOrderInfo.value = false;
        useUserInfo().getUserInfo();
      } else {
        window.$showFailToast(res.msg);
      }
    })
    .finally(() => {
      setTimeout(() => {
        submitLoading.value = false;
      }, 500);
    });
};

// 开关盘时间
import { getSystemConfig } from '@/api/index.js';
const timeRange = ref('');
getSystemConfig().then((res) => {
  if (res.success) {
    console.log('🚀  file: index.vue:202  getSystemConfig  res:', res.data);
    const data = res.data;
    timeRange.value = `${data.open_time} - ${data.close_time}`;
  }
});

import { useRouter } from 'vue-router';
const router = useRouter();
const routerGo = (path) => {
  router.push(path);
};

import { getAppList } from './api';
const appList = ref([]);
(async () => {
  const res = await getAppList();
  if (res.success) {
    appList.value = res.data;
  }
})();
const appMap = computed(() => {
  // 将appList  分为4组平分
  const obj = {
    col1: [],
    col2: [],
    col3: [],
    col4: [],
  };
  appList.value.forEach((item, index) => {
    const key = `col${(index % 4) + 1}`;
    obj[key].push(item);
  });
  return obj;
});
</script>

<style scoped lang="scss">
.pages {
  width: 100%;
  height: 100%;
  background: #000;
  padding-bottom: 80px;
  padding-top: 55px;
  color: #fff;
  .header {
    margin: auto;
    :deep(.van-nav-bar) {
      color: #fff;
      &::after {
        display: none;
      }
      .van-nav-bar__title {
        display: flex;
      }
    }
  }
}
.photo-animation-area {
  height: 350px;
  background-color: rgba($color: #fff, $alpha: 0.15);
  width: calc(100% - 40px);
  margin: 0 auto;
  display: flex;
  gap: 10px;
  overflow: hidden;
  .photo-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    animation: photoCol 10s linear infinite;
    &:nth-child(2n) {
      animation: photoCol2 10s linear infinite;
    }
  }
}
@keyframes photoCol {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
@keyframes photoCol2 {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
.handle-area {
  margin-top: 20px;
  --van-button-normal-font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: block;
    color: #fff;
    background-color: #d81427;
    border-radius: 100px;
    width: 100px;
    height: 100px;
    word-break: break-all;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .start-text {
    font-size: 12px;
  }
}

.card {
  box-shadow: rgba(0, 0, 0, 0.08) 0 4px 12px;
  width: 100%;
  margin-top: 20px;
  padding: 0 20px;
  border-radius: 20px;
  .title {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .vipimg {
      width: 35px;
    }
  }
  .info {
    .item {
      display: flex;
      gap: 20px;
      padding: 20px 0;
      .icon {
        width: 30px;
        display: flex;
        align-items: center;
        img {
          height: auto;
        }
      }
      .data {
        width: 120px;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .value {
          font-size: 18px;
        }
      }
      .remark {
        flex: 1;
        font-size: 14px;
        font-weight: 100;
      }
      &:not(:last-child) {
        position: relative;
        &::after {
          content: ' ';
          display: block;
          width: 100%;
          height: 1px;
          background: #e8e8e8;
          position: absolute;
          bottom: 0;
          left: 0;
        }
      }
    }
  }
}

.text-list {
  padding: 20px;
}

.product-info {
  .header {
    .photo {
      margin: 0 auto;
      width: min(100%, 140px);
    }
    .name {
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
    }
  }
  .price {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
    .item {
      .label {
        font-size: 12px;
        color: #999;
      }
      .value {
        font-size: 14px;
      }
    }
  }
  .cell-info {
    margin-top: 10px;
    padding: 20px;
    padding-bottom: 0;
    .cell-item {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      .label {
        font-size: 14px;
        color: #999;
      }
      .value {
        font-size: 14px;
      }
    }
  }
  .handle {
    padding: 0 120px;
  }
}
:deep(.van-popup) {
  width: var(--page-width);
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
}
</style>
