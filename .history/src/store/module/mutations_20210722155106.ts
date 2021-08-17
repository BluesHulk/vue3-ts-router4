import {
  setToken,
} from '../../utils/token'
export default {
  setToken(state: { token: any }, token: any) {
    state.token = token
    setToken(token)
  },
}