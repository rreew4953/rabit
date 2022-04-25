<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a
          @click="activeName = 'account'"
          :class="{ active: activeName === 'account' }"
          href="javascript:;"
          >账户登录</a
        >
        <a
          @click="activeName = 'qrcode'"
          :class="{ active: activeName === 'qrcode' }"
          href="javascript:;"
          >扫码登录</a
        >
      </nav>
      <!-- 表单 -->
      <Form class="form" :validation-schema="schema" autocomplete="off">v-slot="{errors}" ...</Form>
      <!-- 二维码 -->
      <div v-if="activeName === 'qrcode'" class="qrcode-box">
        <img src="@/assets/images/qrcode.jpg" alt="" />
        <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
      </div>
    </div>
  </section>
  <LoginFooter />
</template>
<script>
import LoginHeader from './components/login-header';
import LoginFooter from './components/login-footer';
import LoginForm from './components/login-form';
import veeSchema from '@/utils/vee-validate-schema';
import { ref } from 'vue';
import Message from '@/components/library/Message';
import { userAccountLogin, userMobileLoginMsg } from '@/api/user';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useIntervalFn } from '@vueuse/core';

export default {
  name: 'Login',
  components: {
    LoginHeader,
    LoginFooter,
    LoginForm,
  },
  setup() {
    const activeName = ref('account');

    // 帐号密码登录
    userAccountLogin(form)
      .then(data => {
        // 成功
      })
      .catch(e => {
        // 失败
        Message({ type: 'error', text: '登录失败' });
      });

    // 使用store
    const store = useStore();
    // 使用route
    const route = useRoute();
    // 使用router
    const route = useRouter();
    // 登录提交
    const submit = async () => {
      // 整体校验
      const valid = await target.value.validate();
      console.log(valid);
    };
    if (valid) {
      // 发送请求
      let data = null
      try {
        if (!isMsgLogin.value) {
          // 帐号登录
          data = await userAccountLogin(form)
        } else {
           // 短信登录
            // 1. 定义两个API  短信登录，获取短信验证码
            // 2. 实现发送短信验证码发送功能
            // 3. 完成手机号短信验证码登录逻辑
            data = await userMobileLogin(form)
        }

      } catch (e) {
// 失败
            Message({ type: 'error', text: e.response.data.message || '登录失败' })
      }
            // 成功
            // 1. 存储信息

            const { id, account, nickName, avatar, token, mobile } = data.result;
            store.commit('user/setUser', { id, account, nickname, avatar, token, mobile });
            // 2. 提示
            Message({ type: 'success', text: '登录成功' });
            // 3. 跳转
            route.push(route.query.redirectUrl || '/');

  }

    //


        // 存储回调地址，提供将来QQ回调页使用  setup中
    const store = useStore()
    const route = useRoute()
    store.commit('user/setRedirectUrl', route.query.redirectUrl)

    return { activeName };
  },
};
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
  }
  // 二维码容器
  .qrcode-box {
    text-align: center;
    padding-top: 40px;
    p {
      margin-top: 20px;
      a {
        color: @xtxColor;
        font-size: 16px;
      }
    }
  }
}
</style>
