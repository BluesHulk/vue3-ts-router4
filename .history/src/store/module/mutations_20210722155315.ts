import {
  setToken,
} from '../../utils/token'
export default {
  setToken(state: { token: any }, token: any) {
    state.token = token
    setToken(token)
  },
  setRefshToken(state: { refshToken: any }, refshToken: any) {
    state.refshToken = refshToken
    setRefreshToken(refshToken)
  },
  setlhUserName(state: { lhUserName: any }, lhUserName: any) {
    state.lhUserName = lhUserName
    setlhUserName(lhUserName)
  },
  setlhSysCode(state: { lhSysCode: any }, lhSysCode: any) {
    state.lhSysCode = lhSysCode
    setlhSysCode(lhSysCode)
  },
  setlhCoCode(state: { lhCoCode: any }, lhCoCode: any) {
    state.lhCoCode = lhCoCode
    setlhCoCode(lhCoCode)
  },
  setlhCoCodeName(state: { lhCoCodeName: any }, lhCoCodeName: any) {
    state.lhCoCodeName = lhCoCodeName
    setlhCoCodeName(lhCoCodeName)
  },
  setLocalTime(state: { localTime: any }, localTime: any) {
    state.localTime = localTime
    setLocalTime(localTime)
  },
  setMin(state: { stepMin: any }, stepMin: any) {
    state.stepMin = stepMin
    setTimeStep(stepMin)
  },
  /**
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state: { username: any }, username: any) {
    state.username = username
  },
  /**
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state: { avatar: any }, avatar: any) {
    state.avatar = avatar
  },
  setRouterLink(state: { routerLink: any }, routerLink: any) {
    state.routerLink = routerLink
  },
  initIndex(state: { idIndex: any }, idIndex: any) {
    state.idIndex = idIndex
  },
}