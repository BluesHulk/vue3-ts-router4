import {
  setToken,
  setlhUserName,
  setlhSysCode,
  setRefreshToken,
  setlhCoCode,
  setlhCoCodeName,
  setLocalTime,
  setTimeStep,
} from '../../utils/token.js'
import globalStore from './declare'
import { MutationTree } from 'vuex';
const globalStoreMutations: MutationTree<globalStore> = {
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  setRefshToken(state, refshToken) {
    state.refshToken = refshToken
    setRefreshToken(refshToken)
  },
  setlhUserName(state, lhUserName) {
    state.lhUserName = lhUserName
    setlhUserName(lhUserName)
  },
  setlhSysCode(state, lhSysCode) {
    state.lhSysCode = lhSysCode
    setlhSysCode(lhSysCode)
  },
  setlhCoCode(state, lhCoCode) {
    state.lhCoCode = lhCoCode
    setlhCoCode(lhCoCode)
  },
  setlhCoCodeName(state, lhCoCodeName) {
    state.lhCoCodeName = lhCoCodeName
    setlhCoCodeName(lhCoCodeName)
  },
  setLocalTime(state, localTime) {
    state.localTime = localTime
    setLocalTime(localTime)
  },
  setMin(state, stepMin) {
    state.stepMin = stepMin
    setTimeStep(stepMin)
  },
  /**
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  /**
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
  setRouterLink(state, routerLink) {
    state.routerLink = routerLink
  },
  initIndex(state, idIndex) {
    state.idIndex = idIndex
  },
  CONCAT_ROUTES(state, routerList) {
    // 这里要注意路由表的前后问题
    state.routes = routerList.concat(basicsRoutes);
  },
}
export default globalStoreMutations