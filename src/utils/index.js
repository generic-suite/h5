/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-05 11:41:43
 * @LastEditors: Harley
 * @LastEditTime: 2023-12-05 10:28:27
 */
import dayjs from 'dayjs';
export function getAssetsImgPath(path) {
  return new URL(`../assets/img/${path}`, import.meta.url).href;
}

export function renderTime(val, format = 'DD/MM/YYYY hh:mm a') {
  return dayjs(val).format(format);
}

// 获取本地语言
export function getLocalLanguage() {
  let navLang = navigator.language || 'en';
  if (import.meta.env.VITE_ENV === 'development') {
    navLang = 'zh-CN';
  } else {
    // 生产环境屏蔽中文
    if (navLang.includes('zh')) {
      navLang = 'en';
    }
    // 生产环境强行改为英文
    navLang = 'en';
  }
  navLang = 'en';
  return navLang;
}
