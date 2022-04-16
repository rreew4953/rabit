import { createStore } from "vuex";
import createPersistedstate from "vuex-persistedstate";

//  三个子模块
import cart from "./modules/cart";
import user from "./modules/user";
import category from "./modules/category";

//  2.0  new Vuex.store({})
//  3.0  createStore({})

export default createStore({
  modules: {
    cart,
    user,
    category,
  },
  //  配置插件
  plugins: [
    //  默认存储在 localstorage 上
    createPersistedstate({
      //  指定本地存储的名字  key是存储数据的键名
      key: "erabbit-client-pc-124-store",
      //  指定存储的模块  paths是存储state中的那些数据，如果是模块下具体的数据需要加上模块名称，如user.token
      //  修改state后触发才可以看到本地存储数据的的变化。
      path: ["user", "cart"],
    }),
  ],
});
