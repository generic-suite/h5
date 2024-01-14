// 将loading组件改造为命令式组件
import { createApp } from 'vue';
import index from './index.vue'

let root = null;
root = document.createElement('div');
root.setAttribute('id', 'loading');
// 挂载组件
const DEFAULT = '成功';
let instanceCache;
function mountComponent(arg) {
  if (!instanceCache) {
    instanceCache = createApp(index); // 构建应用上下文的应用实例
    let text = arg[0] ? arg[0] : DEFAULT;
    instanceCache.provide('text', text); // 外部注入到组件的值
    document.body.appendChild(root); // 本根节点添加到body
    instanceCache.mount('#loading'); // 挂载组件
  }
}

const loading = {
  open(...arg) {
    mountComponent(arg);
  },
  close() {
    if (instanceCache) {
      instanceCache.unmount('#loading');
      instanceCache = null;
    }
  },
};

export default loading;
