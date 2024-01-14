<!--
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 09:24:37
 * @LastEditors: harley
 * @LastEditTime: 2023-11-02 14:40:34
-->
<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  // 修改网页标题
  document.title = import.meta.env.VITE_APP_TITLE;
});
import { useCurrentLang } from 'vant';
const currentLang = useCurrentLang();
console.log('渲染的语言', currentLang.value); // --> 'zh-CN'

</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
