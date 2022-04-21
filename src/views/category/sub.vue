<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @sort-change="changeFilter" />
      <GoodsSort @filter-change="changeSort" />
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
    const route = useRoute();

    const loading = ref(false);
    const finished = ref(false);
    const goodsList = ref([]);
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20,
    };
    //  获取数据函数
    const getData = () => {
      loading.value = true;
      //  设置二级分类的ID 从地址栏赋值给接口 categoryId
      reqParams.categoryId = route.params.id;
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          //  接口文档 result.items 商品集合
          goodsList.value.push(...result.items);
          reqParams.page++;
        } else {
          // 加载完毕
          finished.value = true;
        }
        // 请求结束
        loading.value = false;
      });
    };

    // 切换二级分类重新加载
    watch(
      () => {
        route.params.id;
      },
      newVal => {
        //  要做的就是确定 路由的路径是否是二级类目的子菜单
        if (newVal && route.path === '/category/sub/' + newVal) {
          goodsList.value = [];
          //  重置
          reqParams.value = {
            page: 1,
            pageSize: 20,
          };
          finished.value = false;
        }
      },
    );

    // 监听筛选区改变
    const changeFilter = filterParams => {
      reqParams = { ...reqParams, ...filterParams };
      reqParams.page = 1;
      goodsList.value = [];
      finished.value = false;
    };

    // 监听排序改变
    const changeSort = filterParams => {
      reqParams = { ...reqParams, ...filterParams };
      reqParams.page = 1;
      goodsList.value = [];
      finished.value = false;
    };

    return { loading, finished, goodsList, getData, changeFilter, changeSort };
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
