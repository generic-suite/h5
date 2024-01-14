<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 10:18:31
 * @LastEditors: Harley
 * @LastEditTime: 2023-12-06 13:15:24
-->
<template>
  <div class="pages">
    <div class="headers">
      <van-nav-bar fixed>
        <template #left>
          <img class="logo" :src="logo" alt="" @click="routerGo('/index/home')" />
        </template>
        <template #right>
          <div class="nav-bar-right" style="display: flex; align-items: center; gap: 4px" @click="routerGo('/account')">
            <img :src="getAssetsImgPath('profile.png')" style="width: 40px" alt="" />
            <span>{{ t('home.PROFILE') }}</span>
          </div>
        </template>
      </van-nav-bar>
      <van-tabs class="tabs" v-model:active="active">
        <van-tab :title="t('history.All')"></van-tab>
        <van-tab :title="t('history.Pending')"></van-tab>
        <van-tab :title="t('history.Completed')"></van-tab>
        <van-tab :title="t('history.Reverted')"></van-tab>
      </van-tabs>
    </div>
    <div class="main">
      <div class="item" v-for="item in renderList">
        <div class="top">
          <div class="time">{{ item.create_time }}</div>
          <div class="right">
            <div class="tag" :class="'tag' + item.status">{{ renderStatus(item.status) }}</div>
            <div class="tag btn" v-if="item.status === 1" @click="onSubmit(item.id)">Submit</div>
          </div>
        </div>
        <div class="content card">
          <div class="info">
            <div class="photo" style="align-self: flex-start">
              <img style="width: 100%; border-radius: 12px" :src="item.goods_img" />
            </div>
            <div class="describe">
              {{ item.goods_name }}
            </div>
          </div>
          <div class="price-block">
            <div class="item">
              <p class="label">{{ t('history.Price') }}</p>
              <span class="value">USDT {{ item.price }}</span>
            </div>
            <div class="item">
              <p class="label">{{ t('history.TotalCommission') }}</p>
              <span class="value">USDT {{ item.commission }}</span>
            </div>
          </div>
          <div class="row align-items-center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import logo from '@/icons/logo.svg';
import { getAssetsImgPath } from '@/utils/index.js';
import { getData, commitOrder } from './api';
import dayjs from 'dayjs';
const active = ref('All');
// 数据源
const listSource = ref([]);
const getList = async () => {
  const params = {
    page: 1,
    status: '',
    web_time: dayjs().format('YYYY/MM/DD HH:mm:ss'),
  };
  const res = await getData(params);
  listSource.value = res.data;
};

// 过滤数据
const renderList = computed(() => {
  const source = listSource.value || [];
  let list = source.filter((item) => {
    if (active.value === 0) {
      return true;
    } else {
      return item.status === active.value;
    }
  });
  return list;
});
// 过滤状态
const renderStatus = (e) => {
  const map = {
    1: t('history.Pending'),
    2: t('history.Completed'),
    3: t('history.Reverted'),
  };
  return map[e];
};

// 提交
const submitLoading = ref(false);
const onSubmit = (id) => {
  if (submitLoading.value) return;
  submitLoading.value = true;
  commitOrder(id)
    .then((res) => {
      if (res.success) {
        window.$showSuccessToast(t('history.SubmittedSuccessfully'));
        getList();
        setTimeout(() => {
          routerGo('/index/start');
        }, 1000);
      }
    })
    .finally(() => {
      setTimeout(() => {
        submitLoading.value = false;
      }, 500);
    });
};

(async () => {
  await getList();
})();

import { useRouter } from 'vue-router';
const router = useRouter();
const routerGo = (path) => {
  router.push(path);
};
</script>

<style scoped lang="scss">
.pages {
  background-color: #000;
  color: #fff;
  --van-tab-active-text-color: red;
  --van-tabs-bottom-bar-height: 0;
  height: 100vh;
}
.headers {
  padding-top: 50px;
  border-bottom: 1px solid rgba($color: #fff, $alpha: 0.45);
}
.main {
  max-height: calc(100vh - 174px);
  overflow: hidden;
  overflow-y: scroll;
}
.item {
  padding: 10px;
  margin-top: 20px;
  padding-top: 10px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    line-height: 40px;

    .time {
      font-size: 14px;
    }
    .right {
      display: flex;
      gap: 4px;

      .tag {
        display: inline-block;
        padding: 4px 8px;
        font-size: 75%;
        font-weight: 700;
        line-height: 1;
        text-align: center;
        white-space: nowrap;
        vertical-align: baseline;
        border-radius: 100px;
        transition:
          color 0.15s ease-in-out,
          background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
        font-weight: 100;
        --type-color: rgba(255, 255, 255, 0.65);
        color: var(--type-color);
        border: 1px solid var(--type-color);
        &.tag2 {
          --type-color: #28a745;
        }
        &.tag3 {
          --type-color: #dc3545;
        }
        &.btn {
          color: #fff;
          background: #eb008b;
          border: none;
        }
      }
    }
  }
  .card {
    background-color: #fff;
    color: #000;
    padding: 10px;
    border-radius: 10px;
    .info {
      display: flex;
      gap: 10px;
      align-items: center;
      .photo {
        width: min(25%, 120px);
      }
      .describe {
        flex: 1;
        height: fit-content;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
    .price-block {
      display: flex;
      .label {
        font-size: 14px;
        color: #0f5382;
      }
    }
  }
}
.button-block {
  display: block;
  margin-top: 10px;
  :deep(.van-button) {
    --van-button-primary-background: linear-gradient(to right, #5691fa, #004dd3);
    --van-button-primary-border-color: #000;
  }
}
</style>
