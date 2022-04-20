<template>
  <div class="xtx-infinite-loading" ref="container">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

export default {
  name: 'XtxInfiniteLoading',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const container = ref(null);
    //  是否进入可视区 懒加载组件
    useIntersectionObserver(
      //  观察目标 target   ref="container"
      container,
      ([{ isIntersecting }], dom) => {
        //  是否进入可视区
        if (isIntersecting) {
          //  是否加载完成数据
          if (props.loading === false && props.finished === false) {
            emit('infinite');
          }
        }
      },
      //  阈值：交集区域  更新的时机
      { threshold: 0 },
    );
    return { container };
  },
};
</script>

<style scoped lang="less">
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
