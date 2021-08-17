import { getSystem, login, logout, refreshToken } from '@/api/user.js'
export default {
  setToken({ commit }: any, token: any) {
    commit('setToken', token)
  },
}