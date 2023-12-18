import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createNotivue } from "notivue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "./assets/fonts/font.css";
import "notivue/notifications.css"; // 仅当使用内置通知时才需要
// import "notivue/animations.css"; // 仅当使用内置动画时才需要

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(router).use(pinia);
export const push = createNotivue(app,{
    position: "top-left",
    animations: {
        enter: 'pop-in',
        leave: 'pop-out',
        clearAll: 'fade'
    }
}); // 在插件链的末尾导出
app.mount("#app");
