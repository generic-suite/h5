<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-06 09:34:47
 * @LastEditors: harley
 * @LastEditTime: 2023-10-23 18:43:10
-->
<template>
  <van-nav-bar :title="t('transaction.header')" left-arrow @click-left="onClickLeft" fixed />
  <div class="main">
    <div style="padding: 0 20px">
      <van-field
        v-model="searchDate"
        is-link
        readonly
        name="datePicker"
        label=""
        placeholder="点击选择时间"
        @click="showCalendar = true"
      />
    </div>
    <van-calendar v-model:show="showCalendar" @confirm="onConfirm" :min-date="minDate" :max-date="maxDate" />
    <van-list
      class="list"
      v-model:loading="loading"
      :finished="finished"
      :finished-text="t('common.noMore')"
      :loading-text="t('common.loading')"
      @load="onLoad"
      :offset="100"
    >
      <div class="item" v-for="item in dataList">
        <div class="info">
          <div class="name">{{ item.title || 'Bonus' }}</div>
          <div class="time">{{ renderTime(item.create_time) }}</div>
        </div>
        <div class="value">
          <div class="nums" v-if="isGtZero(item.price)">USDT {{ item.price }}</div>
          <div class="nums red" v-else>USDT ({{ item.price }})</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import { renderTime } from '@/utils/index.js';
import dayjs from 'dayjs';
// 最小日期为3年前 dayjs
const minDate = dayjs().subtract(1, 'year').toDate();
const maxDate = dayjs().toDate();
const onClickLeft = () => {
  // 返回上个路由
  history.back();
};
const searchDate = ref(dayjs().format('YYYY-MM-DD'));
const showCalendar = ref(false);

import { getList } from './api';
const dataList = ref([]);
const loading = ref(false);
const finished = ref(false);
const currentPage = ref(0);
const onLoad = () => {
  currentPage.value += 1;
  const params = {
    page: currentPage.value,
    web_time: searchDate.value,
  };
  getList(params).then((res) => {
    loading.value = false;
    dataList.value.push(...res.data);
    if (dataList.value.length >= res.total) {
      finished.value = true;
    } else {
      finished.value = false;
    }
  });
};

const onConfirm = async (val) => {
  searchDate.value = dayjs(val).format('YYYY-MM-DD');
  showCalendar.value = false;
  currentPage.value = 0;
  onLoad();
};
// 是否大于0
const isGtZero = (e) => {
  const num = Number(e);
  return num > 0;
};
</script>

<style scoped lang="scss">
.main {
  padding-top: 45px;
  .van-cell {
    border-radius: 200px;
    border: 1px solid #ced4da;
    --van-cell-vertical-padding: 6px;
  }
}
.list {
  height: calc(100vh - 96px);
  overflow-y: scroll;
  margin-top: 10px;
  padding: 20px;
  padding-top: 0;
  .item {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    .info {
      width: 50%;

      .name {
        // 文本超出隐藏
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .time {
      color: #999;
    }
    .red {
      color: #dc3545;
    }
  }
}
</style>
