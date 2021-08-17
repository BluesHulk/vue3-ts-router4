import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import store from "../store";
import { getToken } from '../utils/token.js'
import { toLoginRoute } from '@/utils/routes.js'
import routesWhiteList from '../config/index.js'
import asyncRoutes from "./module/asyncRouters";
const Login = () => import("@/views/login/index.vue")
const Layout = () => import("@/views/layout/index.vue")
const Module = () => import("@/views/module/index.vue")
const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "首页"
    },
    component: Login,
  },
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "/login",
  },
  {
    path: "/module",
    name: "module",
    component: Module,
  },


];

// const redirectPath = (() => {
//   return getToken() ? '/index' : '/login'
// })()
// export const constantRoutes = [
//   {
//     path: "/login",
//     name: "login",
//     meta: {
//       title: "首页"
//     },
//     component: Login,
//   },
//   {
//     path: "/",
//     name: "layout",
//     component: Layout,
//     redirect: "/login",
//   },
// ]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to, from, next) => {
  let hasToken = store.getters.token
  console.log(hasToken)
  if (to.path === '/login' || to.path === '/register' || to.path === '/404') {
    next()
  }
  else {
    if (hasToken) {
      console.log(to)
      if (to.path == '/module') {
        await store.dispatch("getUserInfo")
        next()
      } else {
        store.dispatch("concatRoutes").then(res => {
          console.log(res, 'res')
          router.addRoute(res);
          // return to.fullPath
          console.log(to, 'to0000')
          console.log(router, 'router')
          next();
          // return to.fullPath
        })
      }
      // next()
    }
    else {
      next()
    }
  }
})
console.log(router, 'add router')
export default router;

// function getPageTitle(pageTitle: unknown) {
//   const titleReverse = false
//   const title = '来回科技'
//   let newTitles = []
//   if (pageTitle) newTitles.push(pageTitle)
//   if (title) newTitles.push(title)
//   if (titleReverse) newTitles = newTitles.reverse()
//   return newTitles.join('-')
// }
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
