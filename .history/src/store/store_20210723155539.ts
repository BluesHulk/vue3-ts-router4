
import { createStore, createLogger } from 'vuex'
import { store as user, UserStore, UserState } from './module/user'

export interface RootState {
  permission: PermissionState
  user: UserState
}

export type Store = UserStore<Pick<RootState, 'user'>>

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export const store = createStore({
  plugins,
  modules: {
    user,
  }
})

export function useStore(): Store {
  return store as Store
}
