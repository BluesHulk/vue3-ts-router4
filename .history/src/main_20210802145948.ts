import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { globalStoreKey } from "./store";

console.log(store, globalStoreKey);
createApp(App).use(store).use(router).mount("#app");
