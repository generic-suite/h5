/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-05 09:50:01
 * @LastEditors: harley
 * @LastEditTime: 2023-10-17 19:20:43
 */
import { createRouter, createWebHistory } from 'vue-router';
import routes from './router.js';
import { getToken } from '@/utils/auth.js';
import useUserInfo from '@/hooks/useUserInfo.js';
import { i18n } from '@/locales/setupI18n.js';
const { t } = i18n.global;
const router = createRouter({
  history: createWebHistory('/h5'), //可传参数，配置base路径，例如'/app'
  routes,
});

import loading from '@/components/loading/index.js';
// router的全局钩子
router.beforeEach((to, from, next) => {
  loading.open(t('common.loading'));
  // 过滤的地址
  const filterPath = ['/login', '/register'];
  if (filterPath.includes(to.path)) {
    next();
  } else {
    useUserInfo().getUserInfo(); // 每次跳转路由 重新获取用户信息
    const token = getToken();
    if (token) {
      next();
    } else {
      if (filterPath.includes(to.path)) {
        next();
      } else {
        next('/login');
      }
    }
  }
});

router.afterEach(() => {
  loading.close();
});

export default router;
