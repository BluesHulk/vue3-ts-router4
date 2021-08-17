import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
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
routes.beforeEach(async () => {

})
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
