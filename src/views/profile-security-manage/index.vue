<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 10:18:31
 * @LastEditors: harley
 * @LastEditTime: 2023-10-10 14:37:32
-->
<template>
  <div class="headers">
    <van-nav-bar title="Security" fixed left-arrow @click-left="onClickLeft"> </van-nav-bar>
    <van-tabs class="tabs" v-model:active="active" @change="tabChange">
      <van-tab title="Change login"></van-tab>
      <van-tab title="Change withdrawal"></van-tab>
    </van-tabs>
  </div>
  <div class="main">
    <template v-if="active === 0">
      <div class="top-info">
        <div class="icon">
          <img :src="lockImg" alt="" />
        </div>
        <div class="text">Change login password</div>
      </div>
      <div class="form-area">
        <van-form @submit="formSubmit('1')" ref="loginFormRef">
          <van-cell-group inset>
            <van-field
              v-model="loginForm.currentPassword.value"
              name="Current Password"
              label-align="top"
              placeholder="Current Password"
              :rules="[{ required: true, message: 'Current Password Must Between 6 Characters to 32 Characters' }]"
            />
            <van-field
              v-model="loginForm.newPassword.value"
              type="password"
              name="New Password"
              label-align="top"
              placeholder="New Password"
              :rules="[{ required: true, message: 'New Password Must Between 6 Characters to 32 Characters' }]"
            />
            <van-field
              v-model="loginForm.confirmPassword.value"
              type="password"
              name="Confirm Password"
              label-align="top"
              placeholder="Confirm Password"
              :rules="[{ validator: loginForm.confirmValidator }]"
            />
          </van-cell-group>
          <div>
            <van-button block type="primary" native-type="submit"> Submit </van-button>
          </div>
        </van-form>
      </div>
    </template>
    <template v-if="active === 1">
      <div class="top-info">
        <div class="icon">
          <img :src="keyImg" alt="" />
        </div>
        <div class="text">Change withdrawal password</div>
      </div>
      <div class="form-area">
        <van-form @submit="formSubmit('2')" ref="withFormRef">
          <van-cell-group inset>
            <van-field
              v-model="withForm.currentPassword.value"
              name="Current withdrawal password"
              label-align="top"
              placeholder="Current withdrawal password"
              :rules="[{ required: true, message: 'Current withdrawal password needs to be verified' }]"
            />
            <van-field
              v-model="withForm.newPassword.value"
              type="password"
              name="New withdrawal password"
              placeholder="New withdrawal password"
              label-align="top"
              :rules="[{ required: true, message: 'Withdrawal Password Must between 6 Characters to 32 Characters' }]"
            />
            <van-field
              v-model="withForm.confirmPassword.value"
              type="password"
              name="Confirm new withdrawal password"
              placeholder="Confirm new withdrawal password"
              label-align="top"
              :rules="[{ validator: loginForm.confirmValidator }]"
            />
          </van-cell-group>
          <div>
            <van-button block type="primary" native-type="submit"> Submit </van-button>
          </div>
        </van-form>
      </div></template
    >
  </div>
</template>

<script setup>
import lockImg from '@/assets/img/icon-lock.png';
import keyImg from '@/assets/img/icon-key.png';
import { ref, reactive, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import useChangePasswordForm from './useChangePasswordForm';
import useUserInfo from '@/hooks/useUserInfo'
import { changePass } from './api.js';
const onClickLeft = () => history.back();
const active = ref(0);
// 登录密码的表单
const loginFormRef = ref(null);
const loginForm = useChangePasswordForm();

// 取款密码的表单
const withFormRef = ref(null);
const withForm = useChangePasswordForm();
onMounted(() => {
  tabChange(0);
});
const tabChange = (val) => {
  if (val === 0) {
    nextTick(() => {
      loginFormRef.value.validate();
    });
  } else {
    nextTick(() => {
      withFormRef.value.validate();
    });
  }
};
const formSubmit = async (type) => {
  // 校验通过
  let form = loginForm;
  if (type === '2') {
    form = withForm;
  }
  const params = {
    new_pass: form.newPassword.value,
    old_pass: form.currentPassword.value,
    type: type,
  };
  const res = await changePass(params);
  if (res.success) {
    window.$showSuccessToast(res.msg);
    useUserInfo().getUserInfo()
  } else {
    window.$showFailToast(res.msg);
  }
};
</script>

<style scoped lang="scss">
.headers {
  padding-top: 50px;
  background-image: linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%);
  background-color: #b8c6db;
  :deep(.van-tabs__nav) {
    background: none;
  }
  :deep(.van-nav-bar) {
    background: none;
  }
}
.main {
  max-height: calc(100vh - 144px);
  overflow: hidden;
  overflow-y: scroll;
  padding: 30px;
  --van-cell-group-inset-padding: 0;
  --van-cell-horizontal-padding: 0;
}
.top-info {
  display: flex;
  align-items: center;
  gap: 10px;
  .icon {
    width: 40px;
    height: 40px;
  }
}
.van-cell {
  &::after {
    display: none;
  }
}
</style>
