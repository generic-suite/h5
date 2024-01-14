/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-05 09:24:37
 * @LastEditors: harley
 * @LastEditTime: 2023-10-17 19:19:49
 */
import { createApp } from 'vue';
import App from './App.vue';
import pinia from './store/index.js';

import router from './router/index';
import '@/assets/css/module-style.scss';
import '@/assets/css/index.scss';
import '@/assets/fonts/index.scss';
// Toast
import { showToast, showSuccessToast, showFailToast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';
import '@/assets/css/vant-custom.scss';

window.$showToast = showToast;
window.$showSuccessToast = showSuccessToast;
window.$showFailToast = showFailToast;
window.$showDialog = showDialog;
window.$showNotify = showNotify;
window.$showImagePreview = showImagePreview;

const app = createApp(App);
import ids from 'virtual:svg-icons-names';

// svg图标
import svgIcon from '@/components/SvgIcon/index.vue';
import 'virtual:svg-icons-register';
app.component('svg-icon', svgIcon); // 注册svg-icon组件
// 视频播放组件
import HVideo from '@/components/HVideo/index.vue';
app.component('HVideo', HVideo); // 注册svg-icon组件

// 国际化组件
import { setupI18n } from '@/locales/setupI18n';
setupI18n(app);
import '@/locales/initVantLocal.js';

app.use(pinia); // 注册pinia
app.use(router); //注册路由

app.mount('#app');
