import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './mock';
//  引入css normalize 包
import 'normalize.css';
import '@/assets/styles/common.less';

//  引入 自己的插件
import ui from './components/library/index-1';

// 插件的使用，在main.js使用app.use(插件)
createApp(App).use(store).use(router).use(ui).mount('#app');
