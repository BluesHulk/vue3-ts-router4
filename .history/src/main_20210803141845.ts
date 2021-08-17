import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

console.log(store);
createApp(App).use(store).use(router).mount("#app");
let hasToken = store.getters.token
router.beforeEach((to, from, next) => {

  if (to.path === '/login' || to.path === '/register' || to.path === '/404') {
    next()
  }
  else {
    if (hasToken) {

    }
    else {
      next('/login')
    }
  }
})