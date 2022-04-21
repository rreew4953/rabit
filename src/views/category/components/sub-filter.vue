<template>
  <!-- 筛选区 -->
  <div class="sub-filter">
    <div class="item" v-for="i in 4" :key="i">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="changeBrand(item.id)"
          :class="{ active: item.id === filterData.selectedBrand }"
          href="javascript:;"
          >全部</a
        >
        <a
          @click="changeProp(item.id, prop.id)"
          :class="{ active: prop.id === filterData.selectedProp }"
          href="javascript:;"
          v-for="item in filterData"
          :key="item.id"
          >小米</a
        >
      </div>
    </div>
    <!-- 骨架动画 -->
  </div>
  <!-- 筛选区 -->
  <div class="item" v-for="i in 4" :key="i">
    <div class="head">品牌：</div>
    <div class="body">
      <a href="javascript:;">全部</a>
      <a href="javascript:;" v-for="i in 4" :key="i">小米</a>
    </div>
  </div>
</template>
<script>
import { findSubCategoryFilter } from '@/api/category';
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';

export default {
  name: 'SubFilter',
  setup(props, { emit }) {
    // 1. 获取数据
    // 2. 数据中需要全部选中，需要预览将来点击激活功能。默认选中全部
    // 3. 完成渲染
    const route = useRoute();
    const filterData = ref(null);
    const filterLoading = ref(false);
    // 4. 分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
    watch(
      () => {
        route.params.id;
      },
      (newVal, oldVal) => {
        // 当你从二级分类去顶级分类也会拿到ID，不能去加载数据因为它不是二级分类的ID
        if (newVal && route.path === '/category/sub/' + newVal) {
          filterLoading.value = true;
          newVal &&
            findSubCategoryFilter(route.params.id).then(({ result }) => {
              //  品牌 全部
              result.selectedBrand = null;
              result.brands.unshift({ id: null, name: '全部' });
              //  销售属性 全部
              result.saleProperties.forEach(p => {
                p.selectedProp = undefined;
                p.properties.unshift({ id: null, name: '全部' });
              });
              filterData.value = result;
              filterLoading.value = false;
            });
        }
      },
      { immediate: true },
    );

    // 获取筛选参数
    const getFilterParams = () => {
      const filterParams = {};
      const attrs = [];
      filterParams.brandId = filterData.value.selectedBrand;
      filterData.value.saleProperties.forEach(p => {
        const attr = p.properties.find(attr => attr.id === p.selectedProp);
        if (attr && attr.id !== undefined) {
          attrs.push({ groupName: p.name, propertyName: attr.name });
        }
      });
      if (attrs.length) filterParams.attrs = attrs;
      return filterParams;
    };
    // 选择品牌
    const changeBrand = brandId => {
      if (filterData.value.selectedBrand === brandId) return;
      filterData.value.selectedBrand = brandId;
      emit('filter-change', getFilterParams());
    };
    // 选中属性
    const changeAttr = (p, attrId) => {
      if (p.selectedProp === attrId) return;
      p.selectedProp = attrId;
      emit('filter-change', getFilterParams());
    };

    return { filterData, filterLoading, changeBrand, changeAttr, filterParams };
  },
};
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
