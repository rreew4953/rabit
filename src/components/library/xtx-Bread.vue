<template>
  <div class="xtx-bread">
    <slot />
  </div>
</template>

<script>
/**
 <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem to="/category/1005000">电器</XtxBreadItem>
        <XtxBreadItem >空调</XtxBreadItem>
      </XtxBread>
  //import App from './App.vue'
    //new Vue({
    //    render:h=>h(App)
    //}).mount('#app')
    // h() =====>  createElement()
    // h(App) =====>  根据APP组件创建html结构
    // render的返回值就是html结构，渲染到#app容器
    // h() 函数参数，1.节点名称  2. 属性|数据 是对象  3. 子节点

 */
import { h } from 'vue';
export default {
  name: 'XtxBread',
  render() {
    // 用法
    // 1. template 标签去除，单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的h函数传参进来的，vue3.0 的h函数导入进来
    // 4. h 第一个参数 标签名字  第二个参数 标签属性对象  第三个参数 子节点
    // 需求
    // 1. 创建xtx-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除xtx-bread-item组件的i标签，由render函数来组织
    // 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5. 把动态创建的节点渲染再xtx-bread标签中
    const items = this.$slots.default();
    //  items 拿到的是三个 xtx-bread-item
    const dynamicItems = [];
    items.forEach((item, i) => {
      if (i < item.length - 1) {
        dynamicItems.push(h('i', { class: 'iconfont icon-angle-right' }));
      }
    });
    return h('div', { class: 'xtx-bread' }, dynamicItems);
  },
};
</script>

<style lang="less">
// 去除 scoped 属性，目的：让样式作用到xtx-bread-item组件
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  // ul li:last-child {}
  // 先找到父元素，找到所有的子元素，找到最后一个，判断是不是LI，是就是选中，不是就是无效选择器
  // ul li:last-of-type {}
  // 先找到父元素，找到所有的类型为li的元素，选中最后一个
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式，不合理
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>
