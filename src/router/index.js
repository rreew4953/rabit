import { createRouter, createWebHashHistory } from 'vue-router';
import topCategory from '@/views/category/index.vue';
import subCategory from '@/views/category/sub.vue';

const Layout = () => import('@/views/Layout.vue');
const Home = () => import('@/views/home/index.vue');
const Goods = () => {
  import('@/views/goods/index.vue');
};
const login = () => import('@/views/login/index.vue');
const LoginCallback = () => import('@/views/login/callback.vue')

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
  { path: '/login', component: Login },
  { path: '/login/callback', component: LoginCallback }
];

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
