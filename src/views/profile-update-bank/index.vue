<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-06 17:04:31
 * @LastEditors: Harley
 * @LastEditTime: 2023-12-05 10:41:50
-->
<template>
  <div class="pages">
    <van-nav-bar :title="t('wallet.header')" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
    <div class="main">
      <div class="material">
        <div class="text">
          {{ t('wallet.tipsText') }}
        </div>
      </div>
      <div class="form-area">
        <van-form @submit="withdrawalFormSubmit">
          <van-cell-group inset>
            <van-field
              v-model="walletForm.bank_name"
              label-width="120px"
              :label="t('wallet.CurrencyName')"
              :placeholder="t('wallet.PleaseEnter')"
              input-align="right"
              rows="1"
              type="textarea"
              autosize
            />
            <van-field
              v-model="walletForm.bank_card"
              label-width="120px"
              :label="t('wallet.Address')"
              :placeholder="t('wallet.PleaseEnter')"
              input-align="right"
              rows="1"
              type="textarea"
              autosize
            />
            <van-field
              v-model="walletForm.bank_account"
              label-width="120px"
              :label="t('wallet.PublicChain')"
              :placeholder="t('wallet.PleaseEnter')"
              input-align="right"
              rows="1"
              type="textarea"
              autosize
            />
            <van-field
              v-model="walletForm.branch_name"
              :label="t('wallet.Name')"
              label-width="120px"
              :placeholder="t('wallet.PleaseEnter')"
              input-align="right"
              rows="1"
              type="textarea"
              autosize
            />
            <van-field
              v-model="walletForm.branch_number"
              :label="t('wallet.wise_mail')"
              label-width="120px"
              :placeholder="t('wallet.PleaseEnter')"
              input-align="right"
              rows="1"
              type="textarea"
              autosize
            />
          </van-cell-group>
          <div style="margin-top: 20px">
            <van-button block type="primary" native-type="submit"> {{ t('wallet.save') }} </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, computed, reactive } from 'vue';
import { getCardInfo, setCardInfo } from './api';
const onClickLeft = () => history.back();
const walletForm = reactive({
  bank_name: '',
  bank_card: '',
  bank_account: '',
  branch_name: '',
  branch_number: '',
});
const getCard = async () => {
  const res = await getCardInfo();
  if (res.success) {
    walletForm.bank_name = res.data.bank_name;
    walletForm.bank_card = res.data.bank_card;
    walletForm.bank_account = res.data.bank_account;
    walletForm.branch_name = res.data.branch_name;
    walletForm.branch_number = res.data.branch_number;
  }
};

// 修改取款密码
const withdrawalFormSubmit = async () => {
  const res = await setCardInfo(walletForm);
  if (res.success) {
    window.$showSuccessToast(res.msg);
    setTimeout(() => {
      history.back();
    }, 1000);
  }
};
(async () => {
  await getCard();
})();
</script>

<style scoped lang="scss">
.pages {
  background-color: #000;
  height: 100vh;
}
.main {
  --van-cell-horizontal-padding: 0;
  --van-cell-group-inset-padding: 0;
  padding-top: 50px;
  .material {
    padding: 10px;
    font-size: 12px;
    text-align: center;
    color: red;
  }
}

.form-area {
  padding: 10px;
  padding-top: 0;
  .form-item {
    position: relative;
    padding-top: 20px;
    .label {
      position: absolute;
      top: 50%;
      left: 0;
      font-size: 16px;
      color: #999;
      z-index: 1;
      transform: scale(1);
      transform-origin: left;
      transition: all 0.3s ease-in-out;
      font-weight: 100;
      pointer-events: none;
      &.move {
        top: 4px;
        transform: scale(calc(14 / 16));
      }
      &.focus {
        color: #222;
      }
    }
  }
}
</style>
