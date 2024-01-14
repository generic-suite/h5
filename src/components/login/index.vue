<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-13 11:55:43
 * @LastEditors: harley
 * @LastEditTime: 2023-10-23 17:32:32
-->
<template>
  <div class="form-area">
    <div class="text">{{ t('login.AccountLogin') }}</div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formValue.username"
          name="username"
          :label="t('login.Username')"
          :placeholder="t('login.Phone_Username')"
        >
          <template #left-icon>
            <img class="icon-img" :src="usernameUrl" alt="" />
          </template>
        </van-field>
        <van-field
          v-model="formValue.password"
          name="password"
          type="password"
          :label="t('login.Password')"
          :placeholder="t('login.Password')"
        >
          <template #left-icon>
            <img class="icon-img" :src="passwordUrl" alt="" />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <button class="login-btn" type="submit">
          <img :src="loginUrl" alt="" />
        </button>
        <!-- <van-button class="login-btn" round block type="primary" native-type="submit"> 沙发上 </van-button> -->
        <a class="forget" @click="forgetPassword"> {{ t('login.Forget_The_Password') }}</a>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, reactive } from 'vue';
import usernameUrl from '@/assets/img/username.png';
import passwordUrl from '@/assets/img/password.png';
import loginUrl from '@/assets/img/icon-client-login.png';
import { useRouter } from 'vue-router';
const router = useRouter();

const formValue = reactive({
  username: '',
  password: '',
});

import { useUserStore } from '@/store/modules/user.js';
const userStore = useUserStore();
const onSubmit = async (values) => {
  const params = {
    ...values,
  };
  try {
    const loginRes = await userStore.login(params);
    if (loginRes.success) {
      userStore.getUserInfo().then((userInfo) => {
        router.push('/index/home');
      });
    } else {
      window.$showFailToast(res.msg);
    }
  } catch (error) {
    window.$showFailToast(error.msg || error);
  }
};
import { getCustomer } from '@/api/index.js';
const customerInfo = ref('');
(async () => {
  const res = await getCustomer();
  if (res.success) {
    customerInfo.value = res.data[0].val;
  } else {
    window.$showFailToast(res.msg);
  }
})();
const forgetPassword = (e) => {
  // 跳转到第三方页面
  if (customerInfo.value) {
    window.open(customerInfo.value);
  } else {
    window.$showFailToast(t('message.Please_contact_customer_service'));
  }
};
</script>

<style scoped lang="scss">
.form-area {
  --van-cell-font-size: 12px;
}
.icon-img {
  width: 26px;
  height: auto;
}
.text {
  margin-bottom: 20px;
  color: #fff;
  text-align: center;
}
.forget {
  color: #fff;
  font-size: 14px;
  margin-top: 10px;
  display: block;
  cursor: pointer;
  text-align: center;
  font-weight: 100;
  &:hover {
    text-decoration: underline;
  }
}
.login-btn{
  all: unset;
  margin: 0 auto;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
