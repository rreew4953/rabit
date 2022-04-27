import { createRouter, createWebHashHistory } from 'vue-router';
import topCategory from '@/views/category/index.vue';
import subCategory from '@/views/category/sub.vue';
import store from '@/store';

const Layout = () => import('@/views/Layout.vue');
const Home = () => import('@/views/home/index.vue');
const Goods = () => {
  import('@/views/goods/index.vue');
};
const login = () => import('@/views/login/index.vue');
const LoginCallback = () => import('@/views/login/callback.vue');
const PayCheckout = () => import('@/views/member/pay/checkout');
const PayIndex = () => import('@/views/member/pay/index');
const MemberLayout = () => import('@/views/member/Layout');
const MemberHome = () => import('@/views/member/home');
const MemberOrder = () => import('@/views/member/order');

//  路由规则
const routes = [
  //  一级路由布局容器
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/category/:id',
        component: topCategory,
      },
      {
        path: '/category/sub/:id',
        component: subCategory,
      },
      {
        path: '/product/id',
        component: Goods,
      },
    ],
  },
  { path: '/login', component: login },
  { path: '/login/callback', component: LoginCallback },
  { path: '/cart', component: Cart },
  { path: '/member/checkout', component: PayCheckout },
  { path: '/member/pay', component: PayIndex },
  {
    path: '/member',
    component: MemberLayout,
    children: [{ path: '/member', component: MemberHome }],
  },
  {
    path: '/member/order/',
    // vue3.0 需要有嵌套关系才能模糊匹配
    component: { render: () => h(<RouterView />) },
    children: [
      { path: '', component: MemberOrder },
      { path: ':id', component: MemberOrderDetail },
    ],
  },
];

// 前置导航守卫
router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook}
  // 用户信息
  const { token } = store.state.user.profile;
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    //  return next('/login?redirectUrl=' + encodeURIcomponent(to.fullpath))
    next({ path: '/login', query: { redirectUrl: to.fullPath } });
  }
  next();
});

const router = createRouter({
  //  使用路由模式  哈希  改成历史模式需要 导入
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
});

export default router;

/*
  创建路由
  vue 2.0  new VueRouter({})
  vue 3.0  createRouter({})
*/
