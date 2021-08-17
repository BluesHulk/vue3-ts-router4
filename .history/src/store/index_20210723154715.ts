import { createStore } from "vuex";
import actions from "./module/action";
import getters from './module/getter'
import state from "./module/state";
import mutations from './module/mutations'
export const store = createStore({
  state,
  mutations,
  actions,
  getters,
});

export function useStore(): Store {
  return store as Store
}