<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-15 15:46:12
 * @LastEditors: harley
 * @LastEditTime: 2023-10-19 17:09:25
-->
<template>
  <div class="pages">
    <van-nav-bar fixed left-arrow @click-left="onClickLeft" :title="t('userinfo.changePassword')"> </van-nav-bar>
    <div class="main">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="formValue.oldPassword"
            label-width="100px"
            name="oldPassword"
            :label="t('userinfo.OldPassword')"
            input-align="right"
          />
          <van-field
            v-model="formValue.password"
            label-width="160px"
            name="password"
            :label="t('userinfo.NewPassword')"
            input-align="right"
          />
          <van-field
            v-model="formValue.repassword"
            label-width="120px"
            name="repassword"
            :label="t('userinfo.repassword')"
            input-align="right"
          />
        </van-cell-group>
        <div style="margin: 16px">
          <van-button block type="primary" native-type="submit"> {{ t('common.Submit') }} </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, reactive } from 'vue';
const onClickLeft = () => history.back();

const formValue = reactive({
  oldPassword: '',
  password: '',
  repassword: '',
});
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
import { changePass } from './api';
const onSubmit = async (values) => {
  if (values.password !== values.repassword) {
    window.$showFailToast(t('userinfo.PasswordInconsistent'));
    return;
  }

  const params = {
    ...values,
    type: +route.query.type,
  };
  const res = await changePass(params);
  if (res.success) {
    window.$showSuccessToast(res.msg);
    router.back();
  } else {
    window.$showFailToast(res.msg);
  }
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
    // padding: 20px;
    padding-top: 20px;
    .van-cell-group {
      margin-bottom: 20px;
    }
  }
}
</style>
