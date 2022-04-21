<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active }">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="active">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span
          @click="changeItem(item)"
          class="ellipsis"
          v-for="item in currList"
          :key="item.code"
          >{{ item.name }}</span
        >
      </template>
    </div>
  </div>
</template>
<script>
import { computed, reactive, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
// import axios from

export default {
  name: 'XtxCity',
  setup() {
    // 控制展开收起,默认收起
    const active = ref(false);

    const openDialog = () => {
      active.value = true;
      getCityData().then(data => {
        console.log(data);
      });
    };
    const closeDialog = () => {
      active.value = false;
    };
    // 切换展开收起
    const toggleDialog = () => {
      if (active.value) closeDialog();
      else openDialog();
    };
    // 点击其他位置隐藏
    const target = ref(null);
    onClickOutside(target, () => {
      closeDialog();
    });

    // 获取城市数据,显示当前地方列表
    // 2. 显示和隐藏函数（为什么是函数，做更多事情）
    const loading = ref(false);
    const cityData = ref([]);
    const open = () => {
      active.value = true;
      loading.value = true;
    };
    // 获取数据
    getCityData().then(data => {
      cityData.value = data;
      loading.value = false;
    });
    for (const key in changeResult) {
      changeResult[key] = '';
    }
    // 定义计算属性
    const currList = computed(() => {
      // TODO 根据点击的省份城市获取对应的列表
      // 省份
      const currList = cityData.value;
      // 城市
      if (changeResult.provinceCode) {
        currList = currList.find(p => p.code === changeResult.provinceCode).areaList;
      }
      // 地区
      if (changeResult.cityCode) {
        currList = currList.find(c => c.code === changeResult.cityCode).areaList;
      }

      return currList;
    });

    // 省份城市获取对应的列表
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countyCode: '',
      countyName: '',
      fullLocation: '',
    });

    const changeItem = item => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code;
        changeResult.provinceName = item.name;
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code;
        changeResult.cityName = item.name;
      }
      // 地区
      if (item.level === 2) {
        changeResult.countyCode = item.code;
        changeResult.countyName = item.name;
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`;
        close();
        emit('change', changeResult);
      }
    };

    return { active, toggleDialog, target, currList, loading, changeResult };
  },
};
// 获取城市数据
// 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
const getCityData = () => {
  // 这个位置可能有异常操作，封装成promise
  return new Promise((resolve, reject) => {
    if (window.cityData) {
      // 有缓存
      resolve(window.cityData);
    } else {
      // 没有缓存
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json';
      axios.get(url).then(res => {
        console.log(res);
        window.cityData = res.data;
        resolve(window.cityData);
      });
    }
  });
};
</script>
<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
      .loading {
        height: 290px;
        width: 100%;
        background: url(../../assets/images/loading.gif) no-repeat center;
      }
    }
  }
}
</style>
