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
        await store.dispatch("concatRoutes").then(res => {
          console.log(res, 'res')
          res.map((respon: RouteRecordRaw) => {
            router.addRoute(respon);
          })
          router.match = createRouter(constantRoutes).match;
          // router.addRoute(res[0]);
          // return to.fullPath
          // console.log(to, 'to0000')
          // console.log(router, 'router')
          // next({ ...to, replace: true })
          // next({ path: '/index' })
          // console.log(router.getRoutes())
          // return to.fullPath
          console.log(to, from);
          next()
        })
      }
      // next({ ...to, replace: true })
      next()
    }
    else {
      next()
    }
  }
})
router.afterEach((to, from) => {
  console.log(to, from);
});
// console.log(router, 'add router')
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

// router.afterEach((to) => {
//   document.title = getPageTitle(to.meta.title)
// })
