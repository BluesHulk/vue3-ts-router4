import { getSystem, login, logout, refreshToken } from '@/api/user.js'
import { isArray, isString } from '../../utils/validate.js'
// import { title, tokenName } from '../../config'
import {
  removeToken,
  removeButtonsKey,
} from '../../utils/token.js'
import globalStore from './declare'
import { ActionTree } from 'vuex';
const globalStoreActions: ActionTree<globalStore, any> = {
  setToken({ commit }, token) {
    commit('setToken', token)
  },

  setRefshToken({ commit }, token) {
    commit('setRefshToken', token)
  },

  /**
   * @description 设置头像
   * @param {*} { commit }
   * @param {*} avatar
   */
  setAvatar({ commit }, avatar) {
    commit('setAvatar', avatar)
  },
  setIndex({ commit }, idIndex) {
    commit('initIndex', idIndex)
  },
  setlhSysCode({ commit }, lhSysCode) {
    commit('setlhSysCode', lhSysCode)
  },
  setlhCoCode({ commit }, lhcoCode) {
    commit('setlhCoCode', lhcoCode)
  },
  setlhCoCodeName({ commit }, lhcoCodeName) {
    commit('setlhCoCodeName', lhcoCodeName)
  },
  setLocalTime({ commit }, lhcoCode) {
    commit('setLocalTime', lhcoCode)
  },
  setMin({ commit }, stepMin) {
    commit('setMin', stepMin)
  },
  setlhUserName({ commit }, lhUserName) {
    commit('setlhUserName', lhUserName)
  },
  async login({ commit }, userInfo) {
    const data = await login(userInfo)
    if (data.code == 200 && data.status == 0) {
      const access_token = data.data.jwt.access_token
      const refresh_token = data.data.jwt.refresh_token
      const expires_in = data.data.jwt.expires_in * 1000
      const user = data.data.user
      const local = new Date().getTime()
      commit('setToken', access_token)
      commit('setRefshToken', refresh_token)
      commit('setLocalTime', local)
      commit('setMin', expires_in)
      commit('setlhCoCodeName', data.data.coName)

      if (user.username && !isString(user.username)) {
        const err = 'getUserInfo核心接口异常，请检查返回JSON格式是否正确'
        throw err
      } else {
        // 如不使用username用户名,可删除以下代码
        if (user.username) {
          commit('setUsername', user.username)
          commit('setlhUserName', user.username)
          commit('setlhCoCode', user.coCode)
        }
      }
      return data
    } else {
      const err = data.message
      throw err
    }
  },
  async resetAll({ commit, dispatch }) {
    commit('setUsername', '游客')
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif')
    commit('routes/setRoutes', [], { root: true })
    await dispatch('setToken', '')
    await dispatch('setRefshToken', '')
    await dispatch('setLocalTime', '')
    await dispatch('setMin', '')
    await dispatch('setlhCoCode', '')
    await dispatch('setlhSysCode', '')
    await dispatch('setlhUserName', '')
    await dispatch('setlhCoCodeName', '')
    await dispatch('permission/setButton', [], { root: true })
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setAbility', [], { root: true })
    await dispatch('tabs/delAllVisitedRoutes', [], { root: true })
    sessionStorage.clear()
    removeToken()
    removeButtonsKey()
  },
  async getUserInfo({ commit, dispatch }) {
    // const data = await getUserInfo()
    const data = await getSystem()
    if (
      (data.username && !isString(data.username)) ||
      (data.data && !isArray(data.data))
    ) {
      const err = 'getUserInfo核心接口异常，请检查返回JSON格式是否正确'
      throw err
    } else {
      // 如不使用username用户名,可删除以下代码
      if (data.username) {
        // commit('setUsername', data.username)
        // commit('setlhUserName', data.username)
      }
      // 如不使用avatar头像,可删除以下代码
      if (data.avatar)
        commit(
          'setAvatar',
          'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif'
        )
      if (data.data) {
        commit('setRouterLink', data.data)
        // commit('setRouter', data.data)
      }
      return data
    }
  },
  async logout({ dispatch }, userInfo) {
    const data = await logout(userInfo)
    if (data.code === 200) {
      await dispatch('resetAll')
    }
  },
  async refreshToken({ commit }, param) {
    const data = await refreshToken(param)
    const access_token = data.data.access_token
    const refresh_token = data.data.refresh_token
    const local = new Date().getTime()
    const expires_in = 5 * 1000 * 60
    if (access_token) {
      commit('setToken', access_token)
      commit('setRefshToken', refresh_token)
      commit('setLocalTime', local)
      commit('setMin', expires_in)
      return data
    } else {
      const err = `登录接口异常`
      // Vue.prototype.$baseMessage(err, 'error')
      throw err
    }
  },
  concatRoutes({ commit }, rules) {
    console.log(rules);
    return new Promise((resolve, reject) => {
      try {
        let routerList = [];
        // console.log(Object.entries(rules));
        /*
        ["Form", true]
        ["List", false]
        ["About", false]
        */
        if (Object.entries(rules).every((item) => item[1])) {
          routerList = asyncRoutes;
        } else {
          // 递归asyncRoutes，看是否有权限访问
          routerList = getAccesRouterList(asyncRoutes, rules);
          // console.log(routerList);
        }
        commit("CONCAT_ROUTES", routerList);
        // console.log(routerList);
        resolve(state.routers);
      } catch (err) {
        reject(err);
      }
    });
  },
}
export default globalStoreActions
