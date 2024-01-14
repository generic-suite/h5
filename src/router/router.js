/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-05 09:49:54
 * @LastEditors: harley
 * @LastEditTime: 2023-10-15 16:04:53
 */
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      keepAlive: false,
    },
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '首页',
      keepAlive: false,
    },
    children: [
      {
        path: '/index/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          keepAlive: false,
        },
      },
      {
        path: '/index/start',
        name: 'start',
        component: () => import('@/views/start/index.vue'),
        meta: {
          title: '开始',
          keepAlive: false,
        },
      },
      {
        path: '/index/history',
        name: 'history',
        component: () => import('@/views/history/index.vue'),
        meta: {
          title: '历史',
          keepAlive: false,
        },
      },
    ],
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/account/index.vue'),
    meta: {
      title: '账户',
      keepAlive: false,
    },
  },
  {
    path: '/support',
    name: 'support',
    component: () => import('@/views/support/index.vue'),
    meta: {
      title: '支持',
      keepAlive: false,
    },
  },
  {
    path: '/vip',
    name: 'vip',
    component: () => import('@/views/vip/index.vue'),
    meta: {
      title: 'vip',
      keepAlive: false,
    },
  },
  {
    path: '/event',
    name: 'event',
    component: () => import('@/views/event/index.vue'),
    meta: {
      title: '活动',
      keepAlive: false,
    },
  },
  {
    path: '/certpage',
    name: 'certpage',
    component: () => import('@/views/certpage/index.vue'),
    meta: {
      title: '认证',
      keepAlive: false,
    },
  },
  {
    path: '/tnc',
    name: 'tnc',
    component: () => import('@/views/tnc/index.vue'),
    meta: {
      title: '条款和条件',
      keepAlive: false,
    },
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/views/faq/index.vue'),
    meta: {
      title: '一般常见问题',
      keepAlive: false,
    },
  },
  {
    path: '/aboutus',
    name: 'aboutus',
    component: () => import('@/views/aboutus/index.vue'),
    meta: {
      title: '关于我们',
      keepAlive: false,
    },
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: () => import('@/views/transaction/index.vue'),
    meta: {
      title: '交易记录',
      keepAlive: false,
    },
  },
  {
    path: '/agency',
    name: 'agency',
    component: () => import('@/views/agency/index.vue'),
    meta: {
      title: '代理',
      keepAlive: false,
    },
  },
  {
    path: '/top_up',
    name: 'top_up',
    component: () => import('@/views/top_up/index.vue'),
    meta: {
      title: '存款',
      keepAlive: false,
    },
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: () => import('@/views/withdraw/index.vue'),
    meta: {
      title: '取款',
      keepAlive: false,
    },
  },
  {
    path: '/profile-update-bank',
    name: 'profile-update-bank',
    component: () => import('@/views/profile-update-bank/index.vue'),
    meta: {
      title: '钱包信息',
      keepAlive: false,
    },
  },
  {
    path: '/profile-security-manage',
    name: 'profile-security-manage',
    component: () => import('@/views/profile-security-manage/index.vue'),
    meta: {
      title: '安全',
      keepAlive: false,
    },
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: () => import('@/views/userinfo/index.vue'),
    meta: {
      title: '编辑个人资料',
      keepAlive: false,
    },
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () => import('@/views/changePassword/index.vue'),
    meta: {
      title: '修改密码',
      keepAlive: false,
    },
  },
];

export default routes;
