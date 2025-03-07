// 将各种message modules 汇总到这里
import { set } from 'lodash-es';
const modules = import.meta.globEager('./languange/**/*.js');

function genMessage(langs, prefix = 'lang') {
  const obj = {};
  Object.keys(langs).forEach((key) => {
    const mod = langs[key].default;
    let k = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = k.lastIndexOf('.');
    k = k.substring(0, lastIndex);
    const keyList = k.split('/');
    const lang = keyList.shift();
    const objKey = keyList.join('.');
    if (lang) {
      set(obj, lang, obj[lang] || {});
      set(obj[lang], objKey, mod);
    }
  });
  return obj;
}
export const { languange } = genMessage(modules);