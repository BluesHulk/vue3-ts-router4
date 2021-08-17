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
export default {
  token: getToken(),
  refshToken: getRefreshToken(),
  username: getlhUserName(),
  avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
  routerLink: [],
  idIndex: 0, // 初始化第一个id的下标
  lhUserName: getlhUserName(),
  lhSysCode: getlhSysCode(),
  lhCoCode: getlhCoCode(),
  lhCoCodeName: getlhCoCodeName(),
  localTime: getLocalTime(),
  stepMin: getTimeStep(),
}