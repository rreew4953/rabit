// 其实就是vue插件，扩展vue功能，全局组件、指令、函数 （vue.30取消过滤器）
// 当你在main.js导入，使用Vue.use()  (vue3.0 app)的时候就会执行install函数
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import XtxSkeleton from './xtx-skeleton.vue';
import XtxCarousel from './xtx-carousel.vue';
import XtxMore from './xtx-more.vue';
import defaultImg from '@/assets/images/200.png';
import XtxBread from './xtx-bread.vue';
import XtxBreadItem from './xtx-bread-item.vue';

/**
 * 创建观察对象实例
@const observer = new IntersectionObserver(callback, [options]);
@callback 被观察dom进入可视区离开可视区都会触发
两个回调参数 @entries , @observer
@entries 被观察的元素信息对象的数组 [{元素信息},{}]，信息中isIntersecting判断进入或离开
@observer 就是观察实例
@options 配置参数 三个配置属性 root rootMargin threshold
@root 基于的滚动容器，默认是document
@rootMargin 容器有没有外边距
@threshold 交叉的比例

@实例提供两个方法
@observe(dom) 观察哪个dom
@unobserve(dom) 停止观察那个dom
 */

const defineDirective = app => {
  //  1、图片懒加载指令 v-lazy
  //  原理：先存储图片地址，不能在src上。当图片进入可视区将存储图片的地址设置给图片元素即可。
  app.directive('lazy', {
    //  vue 2.0 监听使用指令的DOM是否创建好，钩子函数：inserted
    //  vue 3.0 的指令拥有的钩子函数和组件一样，钩子函数：mounted
    mounted(el, binding) {
      //  2、创建一个观察对象，观察当前使用指令的元素
      const observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            //  停止观察
            observer.unobserve(el);
            //  3、把指令的值设置给el的src属性 binding.value 就是指令的值
            //  4、处理图片加载失败  原生事件 onerror 和 load
            el.onerror = () => {
              el.src = defaultImg;
            };
            el.src = binding.value;
          }
        },
        {
          threshold: 0.01,
        },
      );
      //  开启观察
      observer.observe(el);
    },
  });
};

export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    app.component(XtxSkeleton.name, XtxSkeleton);
    app.component(XtxCarousel.name, XtxCarousel);
    app.component(XtxMore.name, XtxMore);
    app.component(XtxBread.name, XtxBread);
    app.component(XtxBreadItem.name, XtxBreadItem);
    defineDirective(app);
  },
};
