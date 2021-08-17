import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

console.log(store);
createApp(App).use(store).use(router).mount("#app");

router.beforeEach((to, from, next) => {

  if (to.path === '/login' || to.path === '/register' || to.path === '/404') {
    next()
  }
  else {
    if (token) {
      if (menuarraystringzh && !menuarraystringzh.includes(to.path)) {
        next('/404')
      }
      else {
        next()
      }
    }
    else {
      next('/login')
    }
  }
})