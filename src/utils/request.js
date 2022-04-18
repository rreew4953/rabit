//  1.创建一个新的 axios 实例
//  2.请求拦截器，如果有 token 进行头部携带
//  3、响应拦截器：1\ 剥离无效数据   2、处理失效 token
//  4、导出一个函数，调用当前的 axios 实例发送请求,返回值是 Promise

// 步骤：1、npm i axios  2、 const instance = axios.create({}) 基本配置   3、请求响应拦截器创建 =》 目的是检查请求是否携带有token =》 为此所以需要去核对 token =》 为此需要去本地查找 用户信息的 token =》 用户信息token 存储在 store.state.user.profile 里 => 如果有 profile.token 则在头部携带 config.headers.Authorization = `Bearer ${profile.token}`

import axios from 'axios';
import store from '@/store';
import router from '@/router';

//  导出即基准地址，因为不是通过 axios 发请求的地方用的上
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/';

//  instance 实例
const instance = axios.create({
  //  axios 的一些配置  baseURL  timeout
  baseURL,
  timeout: 5000,
});

//  instance 实例的 请求拦截器
instance.interceptors.request.use(
  config => {
    /*
    拦截业务逻辑   store 里存储 token 所以去 store 找
    进行请求配置的修改
    如果本地有 token 就在头部携带
     */
    //  1、获取用户信息对象
    const { profile } = store.state.user;
    //  2、判断是否有 token
    if (profile.token) {
      //  3、设置 token
      config.headers.Authorization = `Bearer ${profile.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

//  instance 实例的 响应拦截器
//  res => res.data  取出data 数据，将来调用接口直接拿到的就是后台数据
instance.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    // 应用场景:未登录购物车结算
    // token失效  401 状态码，进入该函数
    if (err.response && err.response.status === 401) {
      //  1、清空无效用户信息
      //  2、跳转到登录页  (登录才能结算)
      //  3、跳转需要传参(当前路由地址)给登录页码  (登录完成后跳转到结算页面)
      store.commit('user/serUser', {});
      //  当前路由地址
      //  组件里头：'/user?a=10'  $route.path === /user  后面的a=10会丢失  $route.fullPath === '/user?a=10'
      //  js模块中： router.currentRoute.value.fullPath 就是当前的路由地址，router.currentRoute 是 ref 响应式数据所以要加value
      //  因为地址栏中会有特殊字符 ？ @ 之类的  所以要转成URL编码 % 用JS原生api：encodeURLComponent()
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
      router.push('/login?redirectURL=' + fullPath);
    }
    return Promise.reject(err);
  },
);

//  请求工具函数
export default (url, method, submitData) => {
  //  负责发送请求：请求地址，方式，提交的数据
  return instance({
    url,
    method,
    //  1、如果是get 需要用 params 来传参submitData   ?a=1&c=100
    //  2、如果不是get 需要用 data 来传参submitData   请求体传参
    //  3、[] 可以写变量和表达式。 设置一个动态的key 写js 表达式，表达式的结果当做key
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  });
};

/*
     store
     (config) => {
        const { profile } = store.state.user
        if (profile.token) {
            config.headers.Authorization = `Bearer ${profile.token}`
        }
        return config
     } */
