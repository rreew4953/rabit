<template>
  <div class="home-banner">
    <XtxCarousel :sliders="sliders" />
  </div>
</template>
<script>
import { ref } from 'vue';
import { findBanner } from '@/api/home';
export default {
  name: 'HomeBanner',
  setup() {
    const sliders = ref([]);
    findBanner().then(data => {
      slider.value = data.result;
    });
    return { sliders };
  },
};
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
//  覆盖轮播图组件样式
.xtx-carousel {
  //  ::v-deep  深度作用 改变轮播图组件样式
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
