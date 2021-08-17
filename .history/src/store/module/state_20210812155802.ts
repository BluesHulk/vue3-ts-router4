import {
  getToken,
  getlhUserName,
  getlhSysCode,
  getRefreshToken,
  getlhCoCode,
  getlhCoCodeName,
  getLocalTime,
  getTimeStep,
} from '../../utils/token.js'
import globalStore from './declare'
import basicsRoutes from '../../router/module/baseRouters'
const globalStoreState: globalStore = {
  fakeName: 'Fake Name',
  token: getToken(),
  refshToken: getRefreshToken(),
  username: getlhUserName(),
  avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
  routerLink: [],
  router: basicsRoutes,
  idIndex: 0,
  lhUserName: getlhUserName(),
  lhSysCode: getlhSysCode(),
  lhCoCode: getlhCoCode(),
  lhCoCodeName: getlhCoCodeName(),
  localTime: getLocalTime(),
  stepMin: getTimeStep(),
};

export default globalStoreState