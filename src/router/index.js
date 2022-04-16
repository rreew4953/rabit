import { createRouter, createWebHashHistory } from "vue-router"

//  路由规则
const routes = []
/* 
  创建路由
  vue 2.0  new VueRouter({})
  vue 3.0  createRouter({})
*/

const router = createRouter({
  //  使用路由模式  哈希  改成历史模式需要 导入
  history: createWebHashHistory(),
  routes,
})

export default router
