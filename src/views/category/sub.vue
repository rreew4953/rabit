<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter />
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort />
        <!-- 列表 -->
        <ul>
          <li v-for="i in 20" :key="i">
            <GoodsItem :goods="{}" />
          </li>
        </ul>
        <!-- 加载 -->
        <XtxInfiniteLoading :loading="loading" :finished="finished" @infinite="getData" />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread';
import SubFilter from './components/sub-filter';
import SubSort from './components/sub-sort';
import GoodsItem from './components/goods-item';
import { ref, watch } from 'vue';
import { findSubCategoryGoods } from '@/api/category';
import { useRoute } from 'vue-router';

export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup() {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute()
    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])
     // 查询参数
     let reqParams = {
       page:1,
       pageSize:29
     }

  },
};
</script>

<style lang="less" scoped>
.xtx-skeleton {
  padding: 10px 0;
}
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
