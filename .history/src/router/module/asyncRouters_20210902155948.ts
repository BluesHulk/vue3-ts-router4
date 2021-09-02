import { RouteRecordRaw } from 'vue-router';
import router from '../index'
const Index = () => import("@/views/index/index.vue")
const User = () => import("@/views/system/user/user.vue")
const Role = () => import("@/views/system/role/role.vue")
const Dept = () => import("@/views/system/organizes/index.vue")
const Dict = () => import("@/views/system/dictionary/index.vue")
const Maintain = () => import("@/views/waybill/maintain/index.vue")
const Signfor = () => import("@/views/waybill/signfor/index.vue")
const Order = () => import("@/views/procurement/order/index.vue")
const Play = () => import("@/views/procurement/play/index.vue")
const Norelease = () => import("@/views/procurement/norelease/index.vue")
const Manage = () => import("@/views/company/manage/index.vue")
const Product = () => import("@/views/basisfiles/product/index.vue")
const Product = () => import('@/views/basisfiles/productCategory/index.vue')

const Layout = () => import("@/views/layout/index.vue")
//iShow 区分404等页面不在左侧菜单内
const asyncRouter = [
  {
    path: "/",
    name: "index",
    component: Layout,
    meta: {
      title: "首页",
      iShow: true
    },
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "indext",
        component: Index,
        meta: {
          title: "首页",
          iShow: true,
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
      iShow: true,
      icon: "icon-icon_system_choose",
    },
    children: [
      {
        path: "/user",
        name: "user",
        component: User,
        meta: {
          title: "用户管理",
          icon: "iconwode",
          iShow: true,
          level: 2,
        },
      },
      {
        path: "/role",
        name: "role",
        component: Role,
        meta: {
          title: "角色管理",
          icon: "admin-line",
          iShow: true,
          level: 2,
        },
      },
      {
        path: "/dept",
        name: "dept",
        component: Dept,
        meta: {
          title: "组织机构管理",
          icon: "menu-2-fill",
          level: 2,
        },
      },
      {
        path: "/dict",
        name: "dict",
        component: Dict,
        meta: {
          title: "数据字典管理",
          icon: "menu-2-fill",
          iShow: true,
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
      iShow: true,
    },
    children: [
      {
        path: '/maintain',
        name: 'maintain',
        component: Maintain,
        meta: {
          title: '运单维护',
          icon: 'admin-line',
          iShow: true,
          level: 2,
        },
      },
      {
        path: '/signfor',
        name: 'signfor',
        component: Signfor,
        meta: {
          title: '运单签收',
          iShow: true,
          icon: 'menu-2-fill',
          level: 2,
        },
      },
    ],
  },
  // 采购管理
  {
    path: '/procurement',
    name: 'procurement',
    component: Layout,
    redirect: '/procurement/order',
    meta: {
      title: '采购管理',
      icon: 'icon-icon_caigouguanli_choose',
      iShow: true,
    },
    children: [
      {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
          title: '采购订单',
          icon: 'admin-line',
          iShow: true,
          level: 2,
        },
      },
      {
        path: '/play',
        name: 'play',
        component: Play,
        meta: {
          title: '采购派车计划',
          icon: 'menu-2-fill',
          iShow: true,
          level: 2,
        },
      },
      {
        path: '/sendorder',
        name: 'sendorder',
        component: Norelease,
        meta: {
          title: '派车单管理',
          icon: 'user-3-line',
          iShow: true,
          level: 2,
        },
      },
    ],
  },
  //企业管理
  {
    path: '/company',
    name: 'company',
    component: Layout,
    redirect: '/company/manage',
    meta: {
      title: '企业管理',
      icon: 'icon-icon_qiyeguanli_notchoose',
      iShow: true,
    },
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: Manage,
        meta: {
          title: '企业管理',
          icon: 'icon-icon_qiyeguanli_notchoose',
          level: 1,
          iShow: true,
        },
      },
    ],
  },
  //基础档案
  {
    path: '/base',
    name: 'base',
    component: Layout,
    redirect: '/base/product',
    meta: {
      title: '基础档案',
      icon: 'icon-icon_basicArchives_choose',
      iShow: true,
    },
    children: [
      {
        path: 'product',
        name: 'product',
        component: Product,
        meta: {
          title: '物料档案',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'productCategory',
        name: 'productCategory',
        component: ProductCategory,
        meta: {
          title: '物料分类档案',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'sendconsAddr',
        name: 'sendconsAddr',
        component: '@/views/basisfiles/sendconsAddr',
        meta: {
          title: '收发货地址管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'businessRel',
        name: 'businessRel',
        component: '@/views/basisfiles/businessRel',
        meta: {
          title: '客商管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'salearea',
        name: 'salearea',
        component: '@/views/basisfiles/sale',
        meta: {
          title: '销售区域',
          icon: 'shopping-cart-line',
          level: 2,
        },
      },
      {
        path: 'driver',
        name: 'driver',
        component: '@/views/basisfiles/driver',
        meta: {
          title: '司机管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'car',
        name: 'car',
        component: '@/views/basisfiles/car',
        meta: {
          title: '车辆管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'warehouse',
        name: 'warehouse',
        component: '@/views/basisfiles/warehouse',
        meta: {
          title: '仓库管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'areahouse',
        name: 'areahouse',
        component: '@/views/basisfiles/areahouse',
        meta: {
          title: '仓库区域管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
    ],
  },
]

export default asyncRouter;