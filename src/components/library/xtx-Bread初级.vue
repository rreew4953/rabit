<template>
  <div class="xtx-bread">
    <div class="xtx-bread-item">
      <RouterLink to="/">首页</RouterLink>
    </div>
    <i class="iconfont icon-angle-right"></i>
    // 如果有 parentName 有 parentPath 显示 parentName :to="parentPath"
    <div class="xtx-bread-item" v-if="parentName">
      <RouterLink v-if="parentPath" :to="parentPath">{{ parentName }}</RouterLink>
      //如果有 parentName 没有 parentPath 显示 parentName
      <span v-else>{{ parentName }}</span>
    </div>
    //如果有 parentName 显示 iconfont
    <i v-if="parentName" class="iconfont icon-angle-right"></i>
    <div class="xtx-bread-item">
      <span><slot /></span>
    </div>
  </div>
</template>

<script>
/* **
使用如下
<XtxBread parentPath="/category/1005000" parentName="电器">空调</XtxBread>
*/
export default {
  name: 'XtxBread',
  props: {
    parentName: {
      type: String,
      default: '',
    },
    parentPath: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="less">
.xtx-bread {
  display: flex;
  padding: 25px 10px;
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
  }
}
</style>
