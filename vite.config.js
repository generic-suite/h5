/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-05 09:24:37
 * @LastEditors: harley
 * @LastEditTime: 2023-10-17 23:27:34
 */
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';
// https://vitejs.dev/config/
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import myPlugin from './zip';

export default (configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd());
  const { VITE_BASE_URL, VITE_APP_TITLE, VITE_ENV } = viteEnv;
  return {
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
      myPlugin(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [process.cwd() + '/src/icons'],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      }),
    ],
    // @路径
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    // 本地代理
    server: {
      hmr: {
        overlay: false,
        host: '127.0.0.1',
        prot: 8080,
      },
      host: '0.0.0.0',
      port: '80',
      proxy: {
        [VITE_BASE_URL]: {
          target: VITE_BASE_URL,
          changeOrigin: true,
          pathRewrite: {
            ['^' + VITE_BASE_URL]: '',
          },
        },
      },
    },
  };
};
