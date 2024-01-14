<template>
  <div class="form-area">
    <van-form @submit="onSubmit" ref="formRef">
      <van-cell-group>
        <van-field
          v-model="formValue.username"
          name="username"
          :label="t('login.Username')"
          :rules="formRules.username"
        />
        <van-field v-model="formValue.mobile" name="mobile" :label="t('login.Phone_No')" :rules="formRules.mobile" />
        <van-field
          v-model="formValue.deal_pass"
          label-width="120px"
          type="password"
          name="deal_pass"
          :label="t('login.Withdrawal_Password')"
          :rules="formRules.deal_pass"
        />
        <van-field
          v-model="formValue.pass"
          :type="passType ? 'text' : 'password'"
          name="pass"
          :label="t('login.Password')"
          :rules="formRules.pass"
        >
          <template #right-icon>
            <div style="cursor: pointer" @click="togglePassInputType">
              <van-icon :name="passType ? 'eye-o' : 'closed-eye'" />
            </div>
          </template>
        </van-field>

        <van-field
          v-model="formValue.Confirm_Password"
          label-width="100px"
          type="password"
          name="Confirm_Password"
          :label="t('login.Confirm_Password')"
          :rules="formRules.Confirm_Password"
        />
        <van-field
          v-model="formValue.invite_code"
          name="Referral_Code"
          :label="t('login.Referral_Code')"
          :rules="formRules.invite_code"
        />
        <van-row style="--van-cell-background: transparent">
          <van-col span="6">
            <van-field name="switch">
              <template #input>
                <van-switch v-model="formValue.agreed" size="16px" />
              </template>
            </van-field>
          </van-col>
          <van-col span="18" style="display: flex; align-items: center; color: #fff">
            <span @click="showAgreedPage = true">{{ t('login.I_Read_And_Agreed') }}</span>
          </van-col>
        </van-row>
      </van-cell-group>
      <button class="btn" type="submit">
        <img :src="getAssetsImgPath('icon-client-register.png')" alt="" />
      </button>
    </van-form>
  </div>
  <agreedPage v-if="showAgreedPage" @close="showAgreedPage = false" @onConfirm="agreedConfirm"></agreedPage>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { getAssetsImgPath } from '@/utils';
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import agreedPage from '@/components/agreedPage/index.vue';
import { registerApi } from '@/api/index.js';
const formRef = ref(null);
onMounted(() => {
  // 自动校验一次
  // formRef.value.validate();
});
const formValue = reactive({
  username: '', // 用户名
  mobile: '', // 手机号
  deal_pass: '', // 取款密码
  pass: '', // 密码
  Confirm_Password: '', // 二次确认的密码
  invite_code: '', // 推荐码
  agreed: false, // 是否同意协议
});
const passType = ref(false); // 密码是否可见
const togglePassInputType = () => {
  passType.value = !passType.value;
};
const showAgreedPage = ref(false);
const agreedConfirm = () => {
  formValue.agreed = true;
  showAgreedPage.value = false;
};

const formRules = {
  username: [
    { required: true, message: t('login.fill_Account_Number') },
    { message: t('login.userNameLenghtRules_6_25'), pattern: /^.{6,25}$/ },
  ],
  mobile: [{ required: true, message: t('login.fill_Mobile_Number') }],
  deal_pass: [
    { required: true, message: t('login.fill_With_Password') },
    { message: t('login.With_Password_LenghtRules_6_32'), pattern: /^.{6,32}$/ },
  ],
  pass: [
    { required: true, message: t('login.fill_Password') },
    { message: t('login.Password_LenghtRules_6_32'), pattern: /^.{6,32}$/ },
  ],
  Confirm_Password: [
    { required: true, message: t('login.fill_Confirm_Password') },
    {
      validator: (value) => {
        return value === formValue.pass;
      },
      message: t('login.Passwords_entered_twice_are_inconsistent'),
    },
  ],
  invite_code: [{ required: true, message: t('login.fill_Referral_Code') }],
};

import { useRouter } from 'vue-router';
const router = useRouter();
const onSubmit = async (e) => {
  const params = {
    deal_pass: formValue.deal_pass,
    invite_code: formValue.invite_code,
    mobile: formValue.mobile,
    username: formValue.username,
    pass: formValue.pass,
    nickname: formValue.username,
  };
  const res = await registerApi(params);
  if (!res.success) return window.$showFailToast(res.msg);
  window.$showSuccessToast(t('login.registrationSuccessful'));
  setTimeout(() => {
    router.push({ path: '/login' });
  }, 1000);
};
</script>
<style scoped lang="scss">
.form-area {
  --van-cell-font-size: 12px;
  --van-cell-group-background: transparent;
  --van-border-width: 0;
  padding: 20px;
  padding-top: 0;
  font-size: 12px;
  :deep(.van-cell-group) {
    .van-cell {
      border-radius: 10px;
    }
    & > .van-cell.van-field {
      margin-top: 10px;
    }
  }
}
.icon-img {
  width: 20px;
  height: auto;
}
.btn {
  all: unset;
}
</style>
