import { getSystem, login, logout, refreshToken } from '@/api/user.js'
import { isArray, isString } from '../../utils/validate.js'
// import { title, tokenName } from '../../config'
import {
  removeToken,
  removeButtonsKey,
} from '../../utils/token.js'
import { ActionTree, createStore, Store, StoreOptions } from 'vuex';
const globalStoreActions: ActionTree<globalStore, any> = {
  setToken({ commit }: any, token: any) {
    commit('setToken', token)
  },

  setRefshToken({ commit }: any, token: any) {
    commit('setRefshToken', token)
  },
  /**
   * @description 设置头像
   * @param {*} { commit }
   * @param {*} avatar
   */
  setAvatar({ commit }: any, avatar: any) {
    commit('setAvatar', avatar)
  },
  setIndex({ commit }: any, idIndex: any) {
    commit('initIndex', idIndex)
  },
  setlhSysCode({ commit }: any, lhSysCode: any) {
    commit('setlhSysCode', lhSysCode)
  },
  setlhCoCode({ commit }: any, lhcoCode: any) {
    commit('setlhCoCode', lhcoCode)
  },
  setlhCoCodeName({ commit }: any, lhcoCodeName: any) {
    commit('setlhCoCodeName', lhcoCodeName)
  },
  setLocalTime({ commit }: any, lhcoCode: any) {
    commit('setLocalTime', lhcoCode)
  },
  setMin({ commit }: any, stepMin: any) {
    commit('setMin', stepMin)
  },
  setlhUserName({ commit }: any, lhUserName: any) {
    commit('setlhUserName', lhUserName)
  },
  async login({ commit }: any, userInfo: any) {
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
  async resetAll({ commit, dispatch }: any) {
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
  async getUserInfo({ commit, dispatch }: any) {
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
      if (data.data) commit('setRouterLink', data.data)
      return data
    }
  },
  async logout({ dispatch }: any, userInfo: any) {
    const data = await logout(userInfo)
    if (data.code === 200) {
      await dispatch('resetAll')
    }
  },
  async refreshToken({ commit }: any, param: any) {
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
}
export default globalStoreActions
