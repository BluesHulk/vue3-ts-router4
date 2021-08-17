import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import store from "../store";
import { toLoginRoute } from '@/utils/routes.js'
import routesWhiteList from '../config/index.js'
import Login from "@/views/login/index.vue";
import Layout from "@/views/layout/index.vue";
import Module from "@/views/module/index.vue";
import Index from "@/views/index/index.vue";
import User from "@/views/system/user/user.vue";
import Role from "@/views/system/role/role.vue";
import Dept from "@/views/system/organizes/index.vue";
import Dict from "@/views/system/dictionary/index.vue";
const routes: Array<RouteRecordRaw> = [
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
  {
    path: "/",
    name: "index",
    component: Layout,
    meta: {
      title: "首页",
    },
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "indext",
        component: Index,
        meta: {
          title: "首页",
          icon: "icon-icon_homePage_choose",
        },
      },
    ],
  },
  {
    path: "/system",
    name: "system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "系统管理",
      icon: "icon-icon_system_choose",
    },
    children: [
      {
        path: "user",
        name: "user",
        component: User,
        meta: {
          title: "用户管理",
          icon: "iconwode",
          level: 2,
        },
      },
      {
        path: "role",
        name: "role",
        component: Role,
        meta: {
          title: "角色管理",
          icon: "admin-line",
          level: 2,
        },
      },
      {
        path: "dept",
        name: "dept",
        component: Dept,
        meta: {
          title: "组织机构管理",
          icon: "menu-2-fill",
          level: 2,
        },
      },
      {
        path: "dict",
        name: "dict",
        component: Dict,
        meta: {
          title: "数据字典管理",
          icon: "menu-2-fill",
          level: 2,
        },
      },
    ],
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to: RouteLocationNormalized, _: RouteLocationNormalized) => {

})
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
export default router;
