import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized, RouteRecordName } from "vue-router";
import store from "../store";
import { getToken, getRouter } from '../utils/token.js'
import { toLoginRoute } from '@/utils/routes.js'
import routesWhiteList from '../config/index.js'
import asyncRoutes from "./module/asyncRouters";
import basicsRoutes from "./module/baseRouters"
const Login = () => import("@/views/login/index.vue")
const Layout = () => import("@/views/layout/index.vue")
const Module = () => import("@/views/module/index.vue")
const Index = () => import("@/views/index/index.vue")
const User = () => import("@/views/system/user/user.vue")
const Role = () => import("@/views/system/role/role.vue")
const Dept = () => import("@/views/system/organizes/index.vue")
const Dict = () => import("@/views/system/dictionary/index.vue")
const Maintain = () => import("@/views/waybill/maintain/index.vue")
const Signfor = () => import("@/views/waybill/signfor/index.vue")
const Fzt = () => import("@/views/error/error403.vue")
const Fzf = () => import("@/views/error/error404.vue")
const routes = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      iShow: false
    },
    component: Login,
  },
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect: "/login",
    meta: {
      iShow: false
    },
  },
  {
    path: "/module",
    name: "module",
    component: Module,
    meta: {
      title: "引导页",
      iShow: false
    },
  },
  {
    path: "/error403",
    name: "error403",
    component: Fzt,
    meta: {
      title: "error403",
      iShow: false
    },
  },
  {
    path: "/error404",
    name: "error404",
    component: Fzf,
    meta: {
      title: "error404",
      iShow: false
    },
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
  // 运单管理
  {
    path: '/waybill',
    name: 'waybill',
    component: Layout,
    redirect: '/waybill/maintain',
    meta: {
      title: '运单管理',
      icon: 'icon-icon_yundanguanli_choose',
    },
    children: [
      {
        path: 'maintain',
        name: 'maintain',
        component: Maintain,
        meta: {
          title: '运单维护',
          icon: 'admin-line',
          level: 2,
        },
      },
      {
        path: 'signfor',
        name: 'signfor',
        component: Signfor,
        meta: {
          title: '运单签收',
          icon: 'menu-2-fill',
          level: 2,
        },
      },
    ],
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
function getPageTitle(pageTitle: unknown) {
  const titleReverse = false
  const title = ''
  let newTitles = []
  if (pageTitle) newTitles.push(pageTitle)
  if (title) newTitles.push(title)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join('-')
}
router.beforeEach(async (to, from, next) => {
  let hasToken = store.getters.token
  const menuList = JSON.parse(getRouter());
  const name = to.fullPath
  const stateRouter = store.getters.router
  const routerName: (RouteRecordName | null | undefined)[] = []
  stateRouter.map((item: { path: any; }) => {
    routerName.push(item.path)
  })
  console.log(to.matched, 'matched')
  console.log(routerName, name)
  const hasName = routerName.includes(name)
  // else {
  console.log(hasName, 'hasName')
  console.log(router)
  console.log(store.getters.router)


  if (hasToken) {

    if (menuList && menuList.length) {
      if (to.path === '/login') {
        next({ path: '/index' })
      } else {
        if (to.path == '/module') {
          await store.dispatch("getUserInfo")
          next()
        } else {
          if (!hasName) {
            next({ path: "/error404" })
          } else {
            next()
          }
        }
      }
    } else {
      console.log(hasToken, to)
      if (hasName) {
        if (to.path == '/module') {
          await store.dispatch("getUserInfo")
          next()
        } else if (to.path == '/login') {
          await store.dispatch("getUserInfo")
          next({ path: '/module' })
        } else {
          await store.dispatch("concatRoutes").then(res => {
            next()
          })
        }
      }
      else {
        next({ path: "/error404" })
      }


    }
    // next()

  }
  else {
    if (to.path === '/login' || to.path === '/register' || to.path === '/404') {
      next()
    }
    // next()
  }


  // }
})
router.afterEach((to, from) => {
  document.title = getPageTitle(to.meta.title)
  store.commit('SET_CURRENT_MENU', to.path)
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
