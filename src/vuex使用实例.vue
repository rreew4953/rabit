<template>
  <div>
    App
    <p>{{ $store.state.username }}</p>
    <p>{{ $store.getters.username }}</p>
    <button @click="mutationsFn">mutationsFn</button>
  </div>
  <router-view />
</template>

<script>
//   2.0 需要根元素  vue 3.0 可以是代码片段 fragment
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    //  使用 vuex 仓库 => useStore()
    const store = useStore();
    // 1.使用根模块 state 的数据
    console.log(store.state.username);
    // 2.使用根模块 getters 的数据
    console.log(store.getters.username);
    // 3.提交根模块 mutation 的数据
    const mutationsFn = () => {
      store.mutation("updateName");

      // 4.调用根模块 action 函数
      store.dispatch("updateName");
    };
    //  返回这个方法是因为要到上面调用
    return { mutationsFn };
  },
};
</script>
