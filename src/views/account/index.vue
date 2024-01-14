<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 10:18:42
 * @LastEditors: harley
 * @LastEditTime: 2023-10-24 10:25:32
-->
<template>
  <div class="pages">
    <div class="bg-model"></div>
    <van-nav-bar :title="t('home.PROFILE')" fixed left-arrow @click-left="onClickLeft" />
    <div class="main">
      <div class="card">
        <div class="avatar">
          <van-image width="80px" height="80px" fit="cover" :src="userAvatar" />
        </div>
        <div class="userinfo">
          <div class="name">{{ userInfo.username || 'name' }}</div>
          <van-image width="40px" height="40px" fit="cover" :src="userInfo.level.img" />
        </div>
        <div class="code" @click="copyCode">
          <div class="label">{{ t('account.ReferralCode') }}: {{ userInfo.codeText }}</div>
        </div>
        <div class="code">
          <div class="label">{{ t('account.CreditScore') }}: {{ userInfo.credit_score }}</div>
        </div>
        <div class="today-info">
          <div class="item">
            <div class="value">USDT {{ userInfo.today_profit }}</div>
            <div class="label">{{ t('account.TodaysCommission') }}</div>
          </div>
          <div class="item">
            <div class="value">USDT {{ userInfo.balance }}</div>
            <div class="label">{{ t('account.AccountBalance') }}</div>
          </div>
        </div>
      </div>
      <div class="card list">
        <div class="item" v-for="item in list" @click="handle(item)">
          <div class="icon">
            <img :src="renderImg(item.img)" alt="" />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="arrow">
            <van-icon name="arrow" color="#999" />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>Copyright © 2023 {{ appName }} All Rights Reserved</span>
    </div>
  </div>

  <!-- 设置钱包地址 -->
  <van-popup v-model:show="showWalletPop" position="bottom">
    <div class="form-item">
      <van-field
        v-model="walletPassword"
        name="walletPassword"
        type="password"
        :label="t('account.PleaseEnterWithPassword')"
        :placeholder="t('account.Password')"
        label-align="top"
      >
      </van-field>
      <div class="cell" style="padding: 10px">
        <van-button block type="primary" @click="onSubmit">{{ t('common.Submit') }}</van-button>
      </div>
    </div>
  </van-popup>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';
import { showSuccessToast } from 'vant';
import userAvatar from '@/assets/img/BG-20.png';
const onClickLeft = () => history.back();
const appName = computed(() => {
  return import.meta.env.VITE_APP_TITLE || 'appName';
});
// 复制邀请码
const copyCode = () => {
  const input = document.createElement('input');
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('value', userInfo.value.codeText);
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, 9999);
  if (document.execCommand('copy')) {
    document.execCommand('copy');
    showSuccessToast('复制成功');
  }
  document.body.removeChild(input);
};
// import { list } from './config.js';
import { getAssetsImgPath } from '@/utils/index.js';
const list = ref([
  {
    name: t('account.Support'),
    img: 'icon-4.png',
    clickFn: 'routerGo',
    path: '/support',
  },
  {
    name: t('account.Withdraw'),
    img: 'icon-3.png',
    clickFn: 'routerGo',
    path: '/withdraw',
  },
  {
    name: t('account.EditProfile'),
    img: 'username.png',
    clickFn: 'routerGo',
    path: '/userinfo',
  },
  {
    name: t('account.WalletInfo'),
    img: 'icon-2.png',
    clickFn: 'walletInfo',
    path: '/profile-update-bank',
  },
  {
    name: t('account.Transaction'),
    img: 'BG-06.png',
    clickFn: 'routerGo',
    path: '/transaction',
  },
  {
    name: t('account.Logout'),
    img: 'BG-24.png',
    clickFn: 'logout',
  },
]);
const renderImg = (path) => {
  return getAssetsImgPath(path);
};
const handle = (item) => {
  if (item.clickFn === 'routerGo') {
    routerGo(item.path);
  } else if (item.clickFn === 'logout') {
    logout();
  } else if (item.clickFn === 'walletInfo') {
    walletInfo();
  } else {
    console.log('clickFn is not defined');
  }
};
import { useRouter } from 'vue-router';
const router = useRouter();
const routerGo = (path) => {
  router.push(path);
};
import { removeToken } from '@/utils/auth.js';
const logout = () => {
  removeToken();
  router.push('/login');
};
import { useUserStore } from '@/store/modules/user';
const userStore = useUserStore();
const userInfo = computed(() => {
  const user = {
    ...userStore.user,
    userName: userStore.user.username,
    codeText: userStore.user?.invite_code,
  };
  return user;
});

// 钱包地址设置
const showWalletPop = ref(false);
const walletPassword = ref('');
const walletInfo = (e) => {
  showWalletPop.value = true;
};
const onSubmit = (e) => {
  console.log();
  const password = walletPassword.value;
  if (password === userInfo.value.deal_pass) {
    router.push('/profile-update-bank');
  } else {
    window.$showFailToast('Withdrawal password error');
  }
};
</script>

<style scoped lang="scss">
.pages {
  padding-top: 45px;
  background: url('@/assets/img/202307.gif') no-repeat;
  background-color: #000;
  background-size: 100% auto;
  background-position: center 200px;
  padding: 10px;

  .bg-model {
    position: fixed;
    z-index: 0;
    margin-top: 80px;
    img {
      width: 100%;
      height: auto;
    }
  }
  .main {
    padding-top: 80px;
  }
}

.card {
  margin: 0 auto;
  background-color: rgba($color: #fff, $alpha: 0.65);
  box-shadow: 0px 3px 7px 0px #00000012;
  border-radius: 8px;
  padding: 17px 11px 5px 11px;
  margin-bottom: 10px;
  position: relative;
  padding-top: 50px;
  .avatar {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
  }
  .userinfo {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .code {
    text-align: center;
    font-size: 14px;
  }
  .today-info {
    display: flex;
    text-align: center;
    padding: 10px 0;
    position: relative;
    .item {
      flex: 1;
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
    }
    .label {
      font-size: 12px;
      color: #666;
      font-size: 13px;
      font-weight: 300;
    }
    .value {
      font-weight: 600;
    }
  }
}

.list {
  padding: 15px;
  background-color: rgba($color: #fff, $alpha: 0.65);
  padding-top: 0;
  .item {
    height: 50px;
    border-bottom: 1px solid #d9d9d9;
    display: grid;
    grid-template-columns: 20px 1fr 20px;
    gap: 20px;
    align-items: center;
    vertical-align: text-bottom;
    &:last-child {
      border-bottom: none;
      // 剧中对其
      display: flex;
      justify-content: center;
      .icon {
        display: none;
      }
      .name {
        font-size: 18px;
      }
    }
    .name {
      font-size: 14px;
      font-weight: 300;
    }
    .icon {
      --img-size: 32px;
      width: var(--img-size);
      height: var(--img-size);
    }
    .arrow {
      text-align: right;
    }
  }
}
.footer {
  text-align: center;
  color: #fff;
  font-size: 12px;
  margin: 40px auto;
}
</style>
