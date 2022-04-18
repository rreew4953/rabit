<template>
  <!-- 顶部组件 -->
  <AppTopnav></AppTopnav>
  <!-- 头部组件 -->
  <AppHeader></AppHeader>

  <!-- 内容容器 -->
  <main class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <!-- 底部组件 -->
  <AppFooter></AppFooter>
</template>

<script>
import AppTopnav from '@/components/app-topnav.vue';
import AppHeader from '@/components/app-header.vue';
import AppFooter from '@/components/app-footer.vue';
import useStore from 'vuex';
export default {
  name: 'Layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
  },
  //  获取分类数据
  setup() {
    const store = useStore();
    store.dispatch('category/getList');
  },
};
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
