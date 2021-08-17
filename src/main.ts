import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { RouteLocationNormalized } from 'vue-router'
import { toLoginRoute } from '@/utils/routes.js'
import routesWhiteList from './config/index.js'
import './styles/index.scss'
// router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized, next: any) => {

// })

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");


function getPageTitle(pageTitle: unknown) {
  const titleReverse = false
  const title = '来回科技'
  let newTitles = []
  if (pageTitle) newTitles.push(pageTitle)
  if (title) newTitles.push(title)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join('-')
}
// router.beforeEach(async (to, from, next) => {
//   let hasToken = store.getters.token
//   const localTime = store.getters.localTime
//   const stepMin = store.getters.stepMin
//   var ispast
//   if (localTime && stepMin) {
//     ispast = true
//   } else {
//     ispast = false
//   }
//   if (hasToken) {
//     if (store.getters['routes/routes'].length) {
//       // 禁止已登录用户返回登录页
//       if (to.path === '/login') {
//         next({ path: '/' })
//       } else next()
//     } else {
//       try {
//         if (hasToken && to.path !== '/login' && ispast) {
//           await store.dispatch('getUserInfo')
//         } else {
//           await store.dispatch('user/setVirtualRoles')
//         }
//         let index = store.getters.idIndex
//         let item = store.getters.routerLink[index] //用户信息有的工厂id
//         // 根据路由模式获取路由并根据权限过滤
//         const iIndex = sessionStorage.getItem('iIndex')
//         if (to.path === '/module') {
//           next()
//         } else {
//           //区分一个系统还是多个系统 调用菜单接口
//           if (iIndex) {
//             await store.dispatch('setRoutes', { id: iIndex })
//           } else {
//             await store.dispatch('setRoutes', { id: item.rid })
//           }
//         }
//         next({ ...to, replace: true })
//       } catch (err) {
//         console.error('vue-admin-beautiful错误拦截:', err)
//         await store.dispatch('user/resetAll')
//         next(toLoginRoute(to.path))
//       }
//     }
//   } else {
//     if (routesWhiteList.includes(to.path)) {
//       next()
//     } else next(toLoginRoute(to.path))
//   }
// })

// router.afterEach((to) => {
//   document.title = getPageTitle(to.meta.title)
// })

