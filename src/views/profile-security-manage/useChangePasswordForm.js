/*
 * @Descripttion:
 * @Author: harley
 * @Date: 2023-10-06 20:39:31
 * @LastEditors: harley
 * @LastEditTime: 2023-10-06 21:00:58
 */
import { ref } from 'vue';

export default function useChangePasswordForm() {
  // 创建ref变量来存储表单字段
  const currentPassword = ref('');
  const newPassword = ref('');
  const confirmPassword = ref('');

  // 创建方法来处理表单提交
  const changePassword = () => {
    if (newPassword.value !== confirmPassword.value) {
      alert('新密码和确认密码不匹配');
    } else {
      // 这里可以添加密码修改的逻辑，例如通过API发送请求
      // 使用currentPassword.value和newPassword.value来获取当前密码和新密码
      console.log('当前密码：', currentPassword.value);
      console.log('新密码：', newPassword.value);
      console.log('确认密码：', confirmPassword.value);
    }
  };

  const confirmValidator = (value) => {
    let flag = 'The two passwords that you entered do not match!';
    if (value === '') {
      flag = 'Please enter your password again';
    } else if (value === newPassword.value) {
      flag = true;
    }
    return flag;
  };

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    changePassword,
    confirmValidator,
  };
}
