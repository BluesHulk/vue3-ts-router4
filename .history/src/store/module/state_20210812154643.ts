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
  routerLink2: [],
  idIndex: 0,
  lhUserName: getlhUserName(),
  lhSysCode: getlhSysCode(),
  lhCoCode: getlhCoCode(),
  lhCoCodeName: getlhCoCodeName(),
  localTime: getLocalTime(),
  stepMin: getTimeStep(),
  // router: []
};

export default globalStoreState