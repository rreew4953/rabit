import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//  引入css normalize 包
import "normalize.css";
import "@/assets/styles/common.less";

//  使用插件的方式
createApp(App).use(store).use(router).mount("#app");
