import { RouteRecordRaw } from 'vue-router';
import router from '../index'
const Layout = () => import("@/views/layout/index.vue")

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
const outFacInformed = () => import('@/views/centralctrlroom/outFacInformed/index.vue')
const qualityInsReport = () => import('@/views/centralctrlroom/qualityInsReport/index.vue')

const sale = () => import('@/views/schedules/index.vue')

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

//iShow ??????404??????????????????????????????
const asyncRouter = [
  {
    path: "/",
    name: "index",
    component: Layout,
    meta: {
      title: "??????",
      iShow: true
    },
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "indext",
        component: Index,
        meta: {
          title: "??????",
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
      title: "????????????",
      iShow: true,
      icon: "icon-icon_system_choose",
    },
    children: [
      {
        path: "/user",
        name: "user",
        component: User,
        meta: {
          title: "????????????",
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
          title: "????????????",
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
          title: "??????????????????",
          icon: "menu-2-fill",
          level: 2,
        },
      },
      {
        path: "/dict",
        name: "dict",
        component: Dict,
        meta: {
          title: "??????????????????",
          icon: "menu-2-fill",
          iShow: true,
          level: 2,
        },
      },
    ],
  },

  // ????????????
  {
    path: '/waybill',
    name: 'waybill',
    component: Layout,
    redirect: '/waybill/maintain',
    meta: {
      title: '????????????',
      icon: 'icon-icon_yundanguanli_choose',
      iShow: true,
    },
    children: [
      {
        path: '/maintain',
        name: 'maintain',
        component: Maintain,
        meta: {
          title: '????????????',
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
          title: '????????????',
          iShow: true,
          icon: 'menu-2-fill',
          level: 2,
        },
      },
    ],
  },
  // ????????????
  {
    path: '/procurement',
    name: 'procurement',
    component: Layout,
    redirect: '/procurement/order',
    meta: {
      title: '????????????',
      icon: 'icon-icon_caigouguanli_choose',
      iShow: true,
    },
    children: [
      {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
          title: '????????????',
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
          title: '??????????????????',
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
          title: '???????????????',
          icon: 'user-3-line',
          iShow: true,
          level: 2,
        },
      },
    ],
  },
  //????????????
  {
    path: '/company',
    name: 'company',
    component: Layout,
    redirect: '/company/manage',
    meta: {
      title: '????????????',
      icon: 'icon-icon_qiyeguanli_notchoose',
      iShow: true,
    },
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: Manage,
        meta: {
          title: '????????????',
          icon: 'icon-icon_qiyeguanli_notchoose',
          level: 1,
          iShow: true,
        },
      },
    ],
  },
  //????????????
  {
    path: '/base',
    name: 'base',
    component: Layout,
    redirect: '/base/product',
    meta: {
      title: '????????????',
      icon: 'icon-icon_basicArchives_choose',
      iShow: true,
    },
    children: [
      {
        path: 'product',
        name: 'product',
        component: Product,
        meta: {
          title: '????????????',
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
          title: '??????????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'sendconsAddr',
        name: 'sendconsAddr',
        component: sendconsAddr,
        meta: {
          title: '?????????????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'businessRel',
        name: 'businessRel',
        component: businessRel,
        meta: {
          title: '????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'salearea',
        name: 'salearea',
        component: salearea,
        meta: {
          title: '????????????',
          icon: 'shopping-cart-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'driver',
        name: 'driver',
        component: driver,
        meta: {
          title: '????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'car',
        name: 'car',
        component: car,
        meta: {
          title: '????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'warehouse',
        name: 'warehouse',
        component: warehouse,
        meta: {
          title: '????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'areahouse',
        name: 'areahouse',
        component: areahouse,
        meta: {
          title: '??????????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
    ],
  },
  //?????????
  {
    path: '/centralctrlroom',
    name: 'centralctrlroom',
    component: Layout,
    redirect: '/centralctrlroom/outFacInformed',
    meta: {
      title: '?????????',
      icon: 'icon-icon_zhonghuashi_choose',
      iShow: true,
    },
    children: [
      {
        path: 'outFacInformed',
        name: 'outFacInformed',
        component: outFacInformed,
        meta: {
          title: '???????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'qualityInsReport',
        name: 'qualityInsReport',
        component: qualityInsReport,
        meta: {
          title: '???????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
    ],
  },
  //????????????
  {
    path: '/schedules',
    name: 'schedules',
    component: Layout,
    redirect: '/schedules/sale',
    meta: {
      // title: '??????????????????',
      title: '????????????',
      icon: 'user-settings-line',
      iShow: true,
    },
    children: [
      {
        path: 'sale',
        name: 'sale',
        component: sale,
        meta: {
          title: '??????????????????',
          icon: 'user-3-line',
          level: 1,
          iShow: true,
        },
      },
    ],
  },
  // ????????????
  {
    path: '/salement',
    name: 'salement',
    component: Layout,
    redirect: '/salement/ticket',
    meta: {
      title: '????????????',
      icon: 'icon-icon_xiaoshouguanli_choose',
      iShow: true,
    },
    children: [
      {
        path: 'ticket',
        name: 'ticket',
        component: ticket,
        meta: {
          title: '????????????',
          icon: 'admin-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'saleplay',
        name: 'saleplay',
        component: saleplay,
        meta: {
          title: '??????????????????',
          icon: 'menu-2-fill',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'salecar',
        name: 'salecar',
        component: salecar,
        meta: {
          title: '???????????????',
          icon: 'user-3-line',
          level: 2,
          iShow: true,
        },
      },
    ],
  },
  // ?????????????????????
  {
    path: '/jxsprocurement',
    name: 'jxsprocurement',
    component: Layout,
    redirect: '/jxsprocurement/order',
    meta: {
      title: '???????????????',
      icon: 'icon-icon_caigouguanli_choose',
      iShow: true,
    },
    children: [
      {
        path: 'jxsorder',
        name: 'jxsorder',
        component: jxsorder,
        meta: {
          title: '????????????',
          icon: 'admin-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'jxsplay',
        name: 'jxsplay',
        component: jxsplay,
        meta: {
          title: '??????????????????',
          icon: 'menu-2-fill',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'jxssendorder',
        name: 'jxssendorder',
        component: jxssendorder,
        meta: {
          title: '???????????????',
          icon: 'user-3-line',
          level: 2,
          iShow: true,
        },
      },
    ],
  },
  // ?????????????????????
  {
    path: '/jxswaybill',
    name: 'jxswaybill',
    component: 'Layout',
    redirect: '/jxswaybill/maintain',
    meta: {
      title: '????????????',
      icon: 'icon-icon_yundanguanli_choose',
      iShow: true,
    },
    children: [
      {
        path: 'jxsmaintain',
        name: 'jxsmaintain',
        component: jxsmaintain,
        meta: {
          title: '????????????',
          icon: 'icon-icon_yundanguanli_choose',
          level: 1,
          iShow: true,
        },
      },
    ],
  },
  //?????????
  {
    path: '/dporderstatement',
    name: 'dporderstatement',
    component: Layout,
    redirect: '/dporderstatement/statement',
    meta: {
      title: '?????????',
      icon: 'icon-dkw_zhangdan',
      iShow: true,
    },
    children: [
      {
        path: 'statement',
        name: 'statement',
        component: statement,
        meta: {
          title: '?????????',
          icon: 'icon-dkw_zhangdan',
          level: 1,
          iShow: true,
        },
      },
    ],
  },
  //??????????????????
  {
    path: '/jxsdporderstatement',
    name: 'jxsdporderstatement',
    component: Layout,
    redirect: '/jxsdporderstatement/statement',
    meta: {
      title: '?????????',
      icon: 'icon-dkw_zhangdan',
      iShow: true,
    },
    children: [
      {
        path: 'jxsstatement',
        name: 'jxsstatement',
        component: jxsstatement,
        meta: {
          title: '?????????',
          icon: 'icon-dkw_zhangdan',
          level: 1,
          iShow: true,
        },
      },
    ],
  },
  //????????????
  {
    path: '/process',
    name: 'process',
    component: Layout,
    redirect: '/process/processControl',
    meta: {
      title: '????????????',
      icon: 'icon-icon_basicArchives_choose',
      iShow: true,
    },
    children: [
      {
        path: 'processControl',
        name: 'processControl',
        component: processControl,
        meta: {
          title: '????????????',
          icon: 'icon-icon_basicArchives_choose',
          level: 1,
          iShow: true,
        },
      },
    ],
  },
  // ?????????
  {
    path: '/operation',
    name: 'operation',
    component: Layout,
    redirect: '/operation/ptcar',
    meta: {
      title: '????????????',
      icon: 'icon-icon_caigouguanli_choose',
      iShow: true,
    },
    children: [
      {
        path: 'ptdriver',
        name: 'ptdriver',
        component: ptdriver,
        meta: {
          title: '????????????',
          icon: 'admin-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'ptcar',
        name: 'ptcar',
        component: ptcar,
        meta: {
          title: '????????????',
          icon: 'admin-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'ptproduct',
        name: 'ptproduct',
        component: ptproduct,
        meta: {
          title: '????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
      {
        path: 'ptproductCategory',
        name: 'ptproductCategory',
        component: ptproductCategory,
        meta: {
          title: '??????????????????',
          icon: 'home-2-line',
          level: 2,
          iShow: true,
        },
      },
    ],
  },
  {
    path: '/schedules', //??????????????????
    name: 'schedules',
    component: Layout,
    redirect: '/schedules/sale',
    meta: {
      title: '??????????????????',
      icon: 'user-settings-line',
      iShow: true,
    },
    children: [
      {
        path: 'sale',
        name: 'sale',
        component: schedulesSale,
        meta: {
          title: '??????????????????',
          icon: 'user-3-line',
          iShow: true,
        },
      },
    ],
  },
]

export default asyncRouter;