const Login = () => import("@/views/login/index.vue")
const Layout = () => import("@/views/layout/index.vue")
const Module = () => import("@/views/module/index.vue")
const Fzt = () => import("@/views/error/error403.vue")
const Fzf = () => import("@/views/error/error404.vue")
const basicsRoutes = [
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
    path: '*',
    name: "error404",
    redirect: '/error404',
    meta: {
      title: "error404",
      iShow: false
    },
    hidden: true,
  },

];
export default basicsRoutes