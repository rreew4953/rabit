import { createStore } from "vuex";

const moduleA = {
  // 子模块state建议写成函数
  state: () => {
    return {
      username: "模块A",
    };
  },
  getters: {
    changeName(state) {
      return state.username + "AAAAAA";
    },
  },
};

const moduleB = {
  // 带命名空间的模块
  namespaced: true,
  // 子模块state建议写成函数
  state: () => {
    return {
      username: "模块B",
    };
  },
  getters: {
    changeName(state) {
      return state.username + "BBBBBB";
    },
  },
  mutations: {
    // 修改名字的mutation
    update(state) {
      state.username = "BBBB" + state.username;
    },
  },
  actions: {
    update({ commit }) {
      // 假设请求
      setTimeout(() => {
        commit("update");
      }, 2000);
    },
  },
};

// 创建vuex仓库并导出
export default createStore({
  state: {
    // 数据
    person: [
      { id: 1, name: "tom", gender: "男" },
      { id: 2, name: "lucy", gender: "女" },
      { id: 3, name: "jack", gender: "男" },
    ],
  },
  mutations: {
    // 改数据函数
  },
  actions: {
    // 请求数据函数
  },
  modules: {
    // 分模块
    a: moduleA,
    b: moduleB,
  },
  getters: {
    // vuex的计算属性
    boys: (state) => {
      return state.person.filter((p) => p.gender === "男");
    },
  },
});

//  没有使用命名空间的默认模块 state 状态是默认命名的,其他状态则是挂载到全局，调用如下。
//  使用了命名空间的模块，所有数据都需要加上模块名才能使用。比如: [modulesB/username]

{
  /* <template>
 <div>APP组件</div>
 <ul>
   <li v-for="item in $store.getters.boys" :key="item.id">{{item.name}}</li>
 </ul>
 <!-- 使用模块A的username -->
 <p>A的username --- {{$store.state.a.username}}</p>
 <p>A的changeName --- {{$store.getters.changeName}}</p>
 <hr>
 <p>B的username --- {{$store.state.b.username}}</p>
 <p>B的changeName --- {{$store.getters['b/changeName']}}</p>
 <button @click="$store.commit('b/update')">修改username</button>
 <button @click="$store.dispatch('b/update')">异步修改username</button>
</template>
 */
}
