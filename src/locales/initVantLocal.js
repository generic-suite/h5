/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-19 15:53:14
 * @LastEditors: harley
 * @LastEditTime: 2023-10-20 12:08:30
 */
import { Locale } from 'vant';
import { getLocalLanguage } from '@/utils/index.js';
import enUS from 'vant/es/locale/lang/en-US';
import zhCN from 'vant/es/locale/lang/zh-CN';
import deDE from 'vant/es/locale/lang/de-DE';
import nlNL from 'vant/es/locale/lang/nl-NL';
const langMap = {
  en: 'enUS',
  'zh-CN': 'zhCN',
  de: 'deDE',
  nl: 'nlNL',
};
const langList = {
  enUS,
  zhCN,
  deDE,
  nlNL,
};

const navLang = getLocalLanguage();

Locale.use(navLang, langList[langMap[navLang]]);
