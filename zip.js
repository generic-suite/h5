/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-17 23:27:54
 * @LastEditors: harley
 * @LastEditTime: 2023-10-17 23:31:34
 */
//  zip.js 打包自动生成zip包，需npm i jszip -D
import path from 'path';
import fs from 'fs';
import JSZip from 'jszip';
const plugin = function (fileName = 'dist', output) {
  if (!output) output = path.resolve(__dirname, './dist');
  fileName += '.zip';
  const makeZip = function () {
    const zip = new JSZip();
    const distPath = path.resolve(output);
    const readDir = function (zip, dirPath) {
      // 读取dist下的根文件目录
      const files = fs.readdirSync(dirPath);
      files.forEach((fileName) => {
        const fillPath = path.join(dirPath, './', fileName);
        const file = fs.statSync(fillPath);
        // 如果是文件夹的话需要递归遍历下面的子文件
        if (file.isDirectory()) {
          const dirZip = zip.folder(fileName);
          readDir(dirZip, fillPath);
        } else {
          // 读取每个文件为buffer存到zip中
          zip.file(fileName, fs.readFileSync(fillPath));
        }
      });
    };
    const removeExistedZip = () => {
      const dest = path.join(distPath, './' + fileName);
      if (fs.existsSync(dest)) {
        fs.unlinkSync(dest);
      }
    };
    const zipDir = function () {
      readDir(zip, distPath);
      zip
        .generateAsync({
          type: 'nodebuffer', // 压缩类型
          compression: 'DEFLATE', // 压缩算法
          compressionOptions: {
            // 压缩级别
            level: 9,
          },
        })
        .then((content) => {
          const dest = path.join(distPath, '../' + fileName);
          removeExistedZip();
          // 把zip包写到硬盘中，这个content现在是一段buffer
          fs.writeFileSync(dest, content);
        });
    };
    removeExistedZip();
    zipDir(distPath);
  };
  return {
    name: 'vite-plugin-auto-zip',
    apply: 'build',
    closeBundle() {
      makeZip();
    },
  };
};
export default plugin;
