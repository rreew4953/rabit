import { createStore } from "vuex"

//  2.0  new Vuex.store({})
//  3.0  createStore({})

/*   模块化使用  可单独文件导入，也可一个文件写。之后再注册
  1. A 模块 
 const modulesA = {
  state:{}
 }

   2. B 模块
 const modulesB = {

 }
 export default createStore({
    modulesA,
    modulesB
 }) */

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
})
