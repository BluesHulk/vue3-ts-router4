import { RouteRecordRaw } from 'vue-router';
import router from '../index'
const Index = () => import("@/views/index/index.vue")
const User = () => import("@/views/system/user/user.vue")
const Role = () => import("@/views/system/role/role.vue")
const Dept = () => import("@/views/system/organizes/index.vue")
const Dict = () => import("@/views/system/dictionary/index.vue")
const Layout = () => import("@/views/layout/index.vue")
const asyncRouter = [
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
    component: 'Layout',
    redirect: '/waybill/maintain',
    meta: {
      title: '运单管理',
      icon: 'icon-icon_yundanguanli_choose',
    },
    children: [
      {
        path: 'maintain',
        name: 'maintain',
        component: '@/views/waybill/maintain/index.vue',
        meta: {
          title: '运单维护',
          icon: 'admin-line',
          level: 2,
        },
      },
      {
        path: 'signfor',
        name: 'signfor',
        component: '@/views/waybill/signfor',
        meta: {
          title: '运单签收',
          icon: 'menu-2-fill',
          level: 2,
        },
      },
    ],
  },
]

// const _addRoute = (parentName: string | symbol, routes: Array<RouteRecordRaw>) => {
//   routes.forEach((route: RouteRecordRaw) => {
//     router.addRoute(parentName, route)
//   })
// }

// const addDynamicRoutte = () => {
//   _addRoute('login', asyncRouter)
// }
export default asyncRouter;