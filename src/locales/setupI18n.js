/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-17 09:56:30
 * @LastEditors: harley
 * @LastEditTime: 2023-10-17 19:18:27
 */
import { createI18n } from 'vue-i18n'; //引入vue-i18n组件
import { languange } from './getMessage.js';
import { getLocalLanguage } from '@/utils/index.js';
// 获取浏览器语言
const navLang = getLocalLanguage();
const localeData = {
  legacy: false, // composition API
  locale: navLang,
  messages: languange,
};
export function setupI18n(app) {
  const i18n = createI18n(localeData);
  app.use(i18n);
}
export const i18n = createI18n(localeData);
