import { getSystem, login, logout, refreshToken } from '@/api/user.js'
export default {
  setToken({ commit }: any, token: any) {
    commit('setToken', token)
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
      const hour = new Date().getHours()

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
      // Vue.prototype.$baseMessage(err, 'error')
      throw err
    }
  },
}