<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/' + goods.categories[0].id">{{
          goods.categories[0].name
        }}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/' + goods.categories[1].id">{{
          goods.categories[1].name
        }}</XtxBreadItem>
        <XtxBreadItem>{{ goods.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPicture"></GoodsImage>
          <GoodsSales />
        </div>
        <div class="spec"><GoodsName :goods="goods" /></div>
      </div>
      <!-- 名字区组件 -->
      <GoodsName :goods="goods" />
      <!-- 规格组件 -->
      <GoodsSku :goods="goods" @change="changeSku" />

      <!-- 数量 -->
      <XtxNumbox label="数量" v-model="num" :max="goods.inventory" />
      <!-- 按钮 -->
      +<XtxButton type="primary" style="margin-top: 20px">加入购物车</XtxButton>
      <!-- 按钮 -->
      <GoodsTabs :goods="goods" />

      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
        <!-- 分页 -->
        <XtxPagination
          @current-change="changePager"
          :total="total"
          :current-page="reqParams.page"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant';
import GoodsImage from './components/goods-image.vue';
import { nextTick, ref, watch } from 'vue';
import { findGoods } from '@/api/product';
import { useRoute } from 'vue-router';
import GoodsSales from './components/goods-sales';
import GoodsName from './components/goods-name';
import GoodsTabs from './components/goods-tabs';
import GoodsHot from './components/goods-tabs';
import GoodsWarn from './components/goods-warn';

export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsWarn,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
  },
  setup() {
    provide('goods', goods);

    const num = ref(1);

    const goods = useGoods();
    // sku改变时候触发
    const changeSku = sku => {
      if (sku.skuId) {
        goods.value.price = sku.price;
        goods.value.oldPrice = sku.oldPrice;
        goods.value.inventory = sku.inventory;
      }
    };
    return { goods, changeSku, num };
  },
};

// //  处理后台数据不规范，规格属性顺序和sku属性顺序不一致问题
// findGoods('1369155859933827074').then(resolve => {
//   // const sortSpecs = []
//   // result.skus[0].specs.forEach(spec => {
//   //   sortSpecs.push(result.specs.find(item => item.name === spec.name))
//   // })
//   // result.specs = sortSpecs
//   result.skus.forEach(sku => {
//     const sortSpecs = [];
//     result.specs.forEach(spec => {
//       sortSpecs.push(sku.specs.find(item => item.name === specs.name));
//     });
//     sku.specs = sortSpecs;
//   });
//   goods.value = result;
// });

// 获取商品详情
const useGoods = () => {
  // 出现路由地址商品ID发生变化，但是不会重新初始化组件
  const goods = ref(null);
  const route = useRoute();
  watch(
    () => {
      route.params.id;
    },
    newVal => {
      // 是否有值 且 是二级路由路径
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then(data => {
          // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
          goods.value = null;
          nextTick(() => {
            goods.value = data.result;
          });
        });
      }
    },
    { immediate: true },
  );
  return goods;
};
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
