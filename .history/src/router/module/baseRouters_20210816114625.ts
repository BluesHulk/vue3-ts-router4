const Login = () => import("@/views/login/index.vue")
const Layout = () => import("@/views/layout/index.vue")
const Module = () => import("@/views/module/index.vue")
const basicsRoutes = [
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
export default basicsRoutes