import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

console.log(store);
createApp(App).use(store).use(router).mount("#app");
let hasToken = store.getters.token
router.beforeEach(async (to, from, next) => {
  let hasToken = store.getters.token
  const localTime = store.getters.localTime
  const stepMin = store.getters.stepMin
  var ispast
  if (localTime && stepMin) {
    ispast = true
  } else {
    ispast = false
  }
  if (hasToken) {
    if (store.getters['routes/routes'].length) {
      // 禁止已登录用户返回登录页
      if (to.path === '/login') {
        next({ path: '/' })
      } else next()
    } else {
      try {
        if (hasToken && to.path !== '/login' && ispast) {
          await store.dispatch('getUserInfo')
        } else {
          // config/setting.config.js loginInterception为false(关闭登录拦截时)时，创建虚拟角色
          await store.dispatch('user/setVirtualRoles')
        }
        let index = store.getters.idIndex
        let item = store.getters.routerLink[index] //用户信息有的工厂id
        // 根据路由模式获取路由并根据权限过滤
        const iIndex = sessionStorage.getItem('iIndex')
        // await store.dispatch('routes/setRoutes', { id: item.rid })
        if (to.path === '/module') {
          next()
        } else {
          //区分一个系统还是多个系统 调用菜单接口
          if (iIndex) {
            await store.dispatch('setRoutes', { id: iIndex })
          } else {
            await store.dispatch('setRoutes', { id: item.rid })
          }
          // await store.dispatch('routes/setRoutes', { id: item.id })
        }
        // await store.dispatch('routes/setRoutes')
        next({ ...to, replace: true })
      } catch (err) {
        console.error('vue-admin-beautiful错误拦截:', err)
        await store.dispatch('user/resetAll')
        next(toLoginRoute(to.path))
      }
    }
  } else {
    if (routesWhiteList.includes(to.path)) {
      // 设置游客路由(不需要可以删除)
      // if (supportVisit && !store.getters['routes/routes'].length) {
      //   await store.dispatch('routes/setRoutes', 'visit')
      //   next({ ...to, replace: true })
      // } else
      next()
    } else next(toLoginRoute(to.path))
  }
})
router.afterEach((to) => {
  document.title = getPageTitle(to.meta.title)
  if (VabProgress.status) VabProgress.done()
})