import {
  getToken,
  getlhUserName,
  getlhSysCode,
  getRefreshToken,
  getlhCoCode,
  getlhCoCodeName,
  getLocalTime,
  getTimeStep,
  getlhTenantCode,
  getlhDeptCode,
} from "../../utils/token.js";
import globalStore from "./declare";
import basicsRoutes from "../../router/module/baseRouters";
const globalStoreState: globalStore = {
  fakeName: "Fake Name",
  token: getToken(),
  refshToken: getRefreshToken(),
  username: getlhUserName(),
  avatar: "https://i.gtimg.cn/club/item/face/img/2/16022_100.gif",
  routerLink: [],
  router: basicsRoutes,
  idIndex: 0,
  lhUserName: getlhUserName(),
  lhSysCode: getlhSysCode(),
  lhCoCode: getlhCoCode(),
  lhTenantCode: getlhTenantCode(),
  deptCoCode: getlhDeptCode(),
  lhCoCodeName: getlhCoCodeName(),
  localTime: getLocalTime(),
  stepMin: getTimeStep(),
  sidebarMenu: [],
  currentMenu: "",
};

export default globalStoreState;
