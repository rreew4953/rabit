<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        >{{ item.label }}</XtxTabsPanel
      >
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list" v-if="orderList">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <!-- 对于像：对话框，消息提示，确认提示，通知组件 适合使用传送门 Teleport -->
      <Teleport to="#dailog">
        <OrderCancel ref="orderCancelCom" />
      </Teleport>
      <OrderItem
        v-for="item in orderList"
        :key="item.id"
        :order="item"
        @on-cancel-order="onCancelOrder(item)"
        @on-delete-order="onDeleteOrder(item)"
        @on-confirm-order="onConfirmOrder(item)"
      />
    </div>
    <div v-else class="loading"></div>

    <!-- tabs分页组件 -->
    <XtxPagination
      v-if="total > requestParams.pageSize"
      @current-change="requestParams.page = $event"
      :total="total"
      :page-size="requestParams.pageSize"
      :current-page="requestParams.page"
    />
  </div>
  <!-- 查看物流组件 -->
  <Teleport to="#dailog">
    <OrderLogistics ref="logisticsOrderCom" />
  </Teleport>
</template>
<script>
import { reactive, ref, watch } from 'vue';
import { orderStatus } from '@/api/constants';
import { delteOrder, findOrderList } from '@/api/order';
import OrderItem from './components/order-item';
import OrderCancel from './components/order-cancel';
import Confirm from '@/components/library/Confirm';
import Message from '@/components/library/Message';

export default {
  name: 'MemberOrderPage',
  components: { OrderItem, OrderCancel },
  // 组件本身触发的自定义事件可以在这里申明
  emits: ['on-cancel-order', 'on-delete-order', 'on-confirm-order'],
  setup() {
    const activeName = ref('all');

    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      oderState: 0,
    });
    // 订单列表
    const orderList = ref([]);
    // 查询订单
    findOrderList(requestParams).then(data => {
      orderList.value = data.result.items;
    });

    const tabClick = tab => {
      // 此时：tab.index 就是订单的状态
      requestParams.orderState = tab.index;
      requestParams.page = 1;
    };
    const orderList = ref([]);
    const total = ref(0);
    const loading = ref(true);
    // 初始化后，查询条件更改后，查询。
    // 使用侦听器，监听 requestParams 的改变
    const findOrderList = () => {
      loading.value = true;
      findOrderList(requestParams).then(data => {
        orderList.value = data.result.items;
        total.value = data.result.counts;
        loading.value = false;
      });
    };
    watch(
      requestParams,
      () => {
        findOrderList();
      },
      { immediate: true },
    );
    //
    const changePager = np => {
      requestParams.page = np;
    };

    // 删除订单
    const onDeleteOrder = item => {
      Confirm({ text: '您确认删除该条订单吗？' })
        .then(() => {
          delteOrder([item.id]).then(() => {
            Message({ text: '删除订单成功', type: 'success' });
            findOrderListFn();
          });
        })
        .catch(e => {});
    };

    // 封装逻辑-确认收货
    export const useConfirmOrder = () => {
      const onConfirmOrder = item => {
        // item 就是你要确认收货的订单
        Confirm({ text: '您确认收到货吗？确认后货款将会打给卖家。' }).then(() => {
          confirmOrder(item.id).then(() => {
            Message({ text: '确认收货成功', type: 'success' });
            // 确认收货后状态变成 待评价
            item.orderState = 4;
          });
        });
      };
      return { onConfirmOrder };
    };

    // 封装逻辑-取消订单
    const useCancelOrder = () => {
      const orderCancelCom = ref(null);
      const onCancelOrder = item => {
        // item 就是你要取消的订单
        OrderCancelCom.value.open(item);
      };
      return { onCancelOrder, orderCancelCom };
    };
    // 封装逻辑-查看物流
    export const useLogisticsOrder = () => {
      const logisticsOrderCom = ref(null);
      const onLogisticsOrder = item => {
        logisticsOrderCom.value.open(item);
      };
      return { onLogisticsOrder, logisticsOrderCom };
    };

    // setup中的return
    return {
      activeName,
      orderStatus,
      tabClick,
      requestParams,
      orderList,
      loading,
      total,
      changePager,
      onDeleteOrder,
      ...useCancelOrder(),
      ...useConfirmOrder(),
      ...useLogisticsOrder(),
    };
  },
};
</script>

<style scoped lang="less">
.order-list {
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
