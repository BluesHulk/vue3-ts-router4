import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized } from "vue-router";
import store from "../store";
import { getToken, getRouter } from '../utils/token.js'
import { toLoginRoute } from '@/utils/routes.js'
import routesWhiteList from '../config/index.js'
import asyncRoutes from "./module/asyncRouters";
import basicsRoutes from "./module/baseRouters"
import { ElMessage } from "element-plus";
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
const Order = () => import("@/views/procurement/order/index.vue")
const Play = () => import("@/views/procurement/play/index.vue")
const Norelease = () => import("@/views/procurement/norelease/index.vue")
const Manage = () => import("@/views/company/manage/index.vue")
const Product = () => import("@/views/basisfiles/product/index.vue")
const ProductCategory = () => import('@/views/basisfiles/productCategory/index.vue')
const sendconsAddr = () => import('@/views/basisfiles/sendconsAddr/index.vue')
const businessRel = () => import('@/views/basisfiles/businessRel/index.vue')
const salearea = () => import('@/views/basisfiles/sale/index.vue')
const driver = () => import('@/views/basisfiles/driver/index.vue')
const car = () => import('@/views/basisfiles/car/index.vue')
const warehouse = () => import('@/views/basisfiles/warehouse/index.vue')
const areahouse = () => import('@/views/basisfiles/areahouse/index.vue')
const outFacInformed = () => import('@/views//centralctrlroom/outFacInformed/index.vue')
const qualityInsReport = () => import('@/views//centralctrlroom/qualityInsReport/index.vue')
const sale = () => import('@/views/schedules/sale/index.vue')
const ticket = () => import('@/views/salement/saleticket/index.vue')
const saleplay = () => import('@/views/salement/saleplay/index.vue')
const salecar = () => import('@/views/salement/salecar/index.vue')

const jxsorder = () => import('@/views/jxsprocurement/order/index.vue')
const jxsplay = () => import('@/views/jxsprocurement/play/index.vue')
const jxssendorder = () => import('@/views/jxsprocurement/norelease/index.vue')
const jxsmaintain = () => import('@/views/jxswaybill/maintain/index.vue')
const statement = () => import('@/views/dporder/statement/index.vue')
const jxsstatement = () => import('@/views/jxsdporder/statement/index.vue')
const processControl = () => import('@/views/process/processControl/index.vue')
const ptdriver = () => import('@/views/operation/driver/index.vue')
const ptcar = () => import('@/views/operation/car/index.vue')
const ptproduct = () => import('@/views/operation/product/index.vue')
const ptproductCategory = () => import('@/views/operation/productCategory/index.vue')
const schedulesSale = () => import('@/views/schedules/sale/index.vue')
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
  // 系统管理
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
  // 采购管理
  {
    path: '/procurement',
    name: 'procurement',
    component: Layout,
    redirect: '/procurement/order',
    meta: {
      title: '采购管理',
      icon: 'icon-icon_caigouguanli_choose',
    },
    children: [
      {
        path: 'order',
        name: 'order',
        component: Order,
        meta: {
          title: '采购订单',
          icon: 'admin-line',
          level: 2,
        },
      },
      {
        path: 'play',
        name: 'play',
        component: Play,
        meta: {
          title: '采购派车计划',
          icon: 'menu-2-fill',
          level: 2,
        },
      },
      {
        path: 'sendorder',
        name: 'sendorder',
        component: Norelease,
        meta: {
          title: '派车单管理',
          icon: 'user-3-line',
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
        component: sendconsAddr,
        meta: {
          title: '收发货地址管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'businessRel',
        name: 'businessRel',
        component: businessRel,
        meta: {
          title: '客商管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'salearea',
        name: 'salearea',
        component: salearea,
        meta: {
          title: '销售区域',
          icon: 'shopping-cart-line',
          level: 2,
        },
      },
      {
        path: 'driver',
        name: 'driver',
        component: driver,
        meta: {
          title: '司机管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'car',
        name: 'car',
        component: car,
        meta: {
          title: '车辆管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'warehouse',
        name: 'warehouse',
        component: warehouse,
        meta: {
          title: '仓库管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'areahouse',
        name: 'areahouse',
        component: areahouse,
        meta: {
          title: '仓库区域管理',
          icon: 'home-2-line',
          level: 2,
        },
      },
    ],
  },
  //中化室
  {
    path: '/centralctrlroom',
    name: 'centralctrlroom',
    component: Layout,
    redirect: '/centralctrlroom/outFacInformed',
    meta: {
      title: '中化室',
      icon: 'icon-icon_zhonghuashi_choose',
    },
    children: [
      {
        path: 'outFacInformed',
        name: 'outFacInformed',
        component: outFacInformed,
        meta: {
          title: '出厂通知单',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'qualityInsReport',
        name: 'qualityInsReport',
        component: qualityInsReport,
        meta: {
          title: '质检报告单',
          icon: 'home-2-line',
          level: 2,
        },
      },
    ],
  },
  //分配管理
  {
    path: '/schedules',
    name: 'schedules',
    component: Layout,
    redirect: '/schedules/sale',
    meta: {
      // title: '计划分配管理',
      title: '分配管理',
      icon: 'user-settings-line',
    },
    children: [
      {
        path: 'sale',
        name: 'sale',
        component: sale,
        meta: {
          title: '销售计划分配',
          icon: 'user-3-line',
          level: 1,
        },
      },
    ],
  },
  // 销售管理
  {
    path: '/salement',
    name: 'salement',
    component: Layout,
    redirect: '/salement/ticket',
    meta: {
      title: '销售管理',
      icon: 'icon-icon_xiaoshouguanli_choose',
    },
    children: [
      {
        path: 'ticket',
        name: 'ticket',
        component: ticket,
        meta: {
          title: '销售订单',
          icon: 'admin-line',
          level: 2,
        },
      },
      {
        path: 'saleplay',
        name: 'saleplay',
        component: saleplay,
        meta: {
          title: '销售派车计划',
          icon: 'menu-2-fill',
          level: 2,
        },
      },
      {
        path: 'salecar',
        name: 'salecar',
        component: salecar,
        meta: {
          title: '派车单管理',
          icon: 'user-3-line',
          level: 2,
        },
      },
    ],
  },
  // 经销商订单管理
  {
    path: '/jxsprocurement',
    name: 'jxsprocurement',
    component: Layout,
    redirect: '/jxsprocurement/order',
    meta: {
      title: '经销商管理',
      icon: 'icon-icon_caigouguanli_choose',
    },
    children: [
      {
        path: 'jxsorder',
        name: 'jxsorder',
        component: jxsorder,
        meta: {
          title: '订单管理',
          icon: 'admin-line',
          level: 2,
        },
      },
      {
        path: 'jxsplay',
        name: 'jxsplay',
        component: jxsplay,
        meta: {
          title: '派车计划管理',
          icon: 'menu-2-fill',
          level: 2,
        },
      },
      {
        path: 'jxssendorder',
        name: 'jxssendorder',
        component: jxssendorder,
        meta: {
          title: '派车单管理',
          icon: 'user-3-line',
          level: 2,
        },
      },
    ],
  },
  // 经销商运单管理
  {
    path: '/jxswaybill',
    name: 'jxswaybill',
    component: 'Layout',
    redirect: '/jxswaybill/maintain',
    meta: {
      title: '运单管理',
      icon: 'icon-icon_yundanguanli_choose',
    },
    children: [
      {
        path: 'jxsmaintain',
        name: 'jxsmaintain',
        component: jxsmaintain,
        meta: {
          title: '运单维护',
          icon: 'icon-icon_yundanguanli_choose',
          level: 1,
        },
      },
    ],
  },
  //对账单
  {
    path: '/dporderstatement',
    name: 'dporderstatement',
    component: Layout,
    redirect: '/dporderstatement/statement',
    meta: {
      title: '对账单',
      icon: 'icon-dkw_zhangdan',
    },
    children: [
      {
        path: 'statement',
        name: 'statement',
        component: statement,
        meta: {
          title: '对账单',
          icon: 'icon-dkw_zhangdan',
          level: 1,
        },
      },
    ],
  },
  //经销商对账单
  {
    path: '/jxsdporderstatement',
    name: 'jxsdporderstatement',
    component: Layout,
    redirect: '/jxsdporderstatement/statement',
    meta: {
      title: '对账单',
      icon: 'icon-dkw_zhangdan',
    },
    children: [
      {
        path: 'jxsstatement',
        name: 'jxsstatement',
        component: jxsstatement,
        meta: {
          title: '对账单',
          icon: 'icon-dkw_zhangdan',
          level: 1,
        },
      },
    ],
  },
  //流程管理
  {
    path: '/process',
    name: 'process',
    component: Layout,
    redirect: '/process/processControl',
    meta: {
      title: '流程管理',
      icon: 'icon-icon_basicArchives_choose',
    },
    children: [
      {
        path: 'processControl',
        name: 'processControl',
        component: processControl,
        meta: {
          title: '流程管理',
          icon: 'icon-icon_basicArchives_choose',
          level: 1,
        },
      },
    ],
  },
  // 平台端
  {
    path: '/operation',
    name: 'operation',
    component: Layout,
    redirect: '/operation/ptcar',
    meta: {
      title: '运营管理',
      icon: 'icon-icon_caigouguanli_choose',
    },
    children: [
      {
        path: 'ptdriver',
        name: 'ptdriver',
        component: ptdriver,
        meta: {
          title: '司机管理',
          icon: 'admin-line',
          level: 2,
        },
      },
      {
        path: 'ptcar',
        name: 'ptcar',
        component: ptcar,
        meta: {
          title: '车辆管理',
          icon: 'admin-line',
          level: 2,
        },
      },
      {
        path: 'ptproduct',
        name: 'ptproduct',
        component: ptproduct,
        meta: {
          title: '物料档案',
          icon: 'home-2-line',
          level: 2,
        },
      },
      {
        path: 'ptproductCategory',
        name: 'ptproductCategory',
        component: ptproductCategory,
        meta: {
          title: '物料分类档案',
          icon: 'home-2-line',
          level: 2,
        },
      },
    ],
  },
  {
    path: '/schedules', //计划分配管理
    name: 'schedules',
    component: Layout,
    redirect: '/schedules/sale',
    meta: {
      title: '计划分配管理',
      icon: 'user-settings-line',
    },
    children: [
      {
        path: 'sale',
        name: 'sale',
        component: schedulesSale,
        meta: {
          title: '销售计划分配',
          icon: 'user-3-line',
        },
      },
    ],
  },
];

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
  if (hasToken) {

    if (menuList && menuList.length) {
      if (to.path === '/login') {
        next({ path: '/index' })
      } else {
        await store.dispatch("getUserInfo")
        next()
      }
    } else {
      if (to.path == '/module') {
        await store.dispatch("getUserInfo")
        next()
      } else if (to.path == '/login') {
        await store.dispatch("getUserInfo")
        ElMessage.warning({
          message: '已登录,不能返回登录页',
          type: 'warning'
        });
        return
      } else {
        await store.dispatch("concatRoutes").then(res => {
          next()
        })
      }

    }
  }
  else {
    if (to.path === '/login' || to.path === '/register' || to.path === '/404') {
      next()
    }
  }
})
router.afterEach((to, from) => {
  document.title = getPageTitle(to.meta.title)
  store.commit('SET_CURRENT_MENU', to.path)
});
// console.log(router, 'add router')
export default router;
