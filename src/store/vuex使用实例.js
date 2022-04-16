import { createStore } from "vuex"

//  2.0  new Vuex.store({})
//  3.0  createStore({})
export default createStore({
  state: {
    username: "zs",
  },
  getters: {
    //  vuex 的计算属性
    newName(state) {
      return state.username + "......"
    },
  },
  mutations: {
    updateName(state) {
      state.username = "LS"
    },
  },
  actions: {
    updateName(context) {
      //  发送请求  实际上是action发送一个请求调用mutation里的方法来修改参数
      setTimeout(() => {
        context.commit("updateName")
      }, 1000)
    },
  },
  modules: {},
})
