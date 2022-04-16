import { createRouter, createWebHashHistory } from "vue-router";

const Layout = () => import("@/views/Layout.vue");
const Home = () => import("@/views/home/index.vue");

//  路由规则
const routes = [
  //  一级路由布局容器
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: Home,
      },
    ],
  },
];

const router = createRouter({
  //  使用路由模式  哈希  改成历史模式需要 导入
  history: createWebHashHistory(),
  routes,
});

export default router;

/* 
  创建路由
  vue 2.0  new VueRouter({})
  vue 3.0  createRouter({})
*/
