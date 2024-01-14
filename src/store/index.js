/*
 * @Descripttion: 
 * @Author: harley
 * @Date: 2023-10-05 15:34:50
 * @LastEditors: harley
 * @LastEditTime: 2023-10-13 10:03:23
 */
import { createPinia } from 'pinia';
// 引入持久化插件
import piniaPluginPersist from 'pinia-plugin-persist';
export * from './modules/user';
export * from './modules/index';

const pinia = createPinia();
pinia.use(piniaPluginPersist);
export default pinia;
