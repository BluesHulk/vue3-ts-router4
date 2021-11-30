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
import basicsRoutes from '../../router/module/baseRouters'
import { MutationTree } from 'vuex';
// const getAccesRouterList = (basicsRoutes: any[], rules: { [x: string]: any; }) => {
//   return basicsRoutes.filter((item: { name: string | number; children: any; }) => {
//     console.log(item);
//     if (rules[item.name]) {
//       if (item.children)
//         item.children = getAccesRouterList(item.children, rules);
//       return true;
//     } else return false;
//   });
// };
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
  setlhCoCode(state, lhTenantCode) {
    state.lhTenantCode = lhTenantCode
    setlhCoCode(lhTenantCode)
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
  setRouter(state, router) {
    state.router = router
  },

  initIndex(state, idIndex) {
    state.idIndex = idIndex
  },
  CONCAT_ROUTES(state, routerList) {
    // 这里要注意路由表的前后问题
    state.router = routerList;
  },
  SET_MENU(state, menu) {
    state.sidebarMenu = menu
  },
  SET_CURRENT_MENU(state, currentMenu) {
    state.currentMenu = currentMenu
  }
}
export default globalStoreMutations