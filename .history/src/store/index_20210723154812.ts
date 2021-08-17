import { createStore } from "vuex";
import actions from "./module/action";
import getters from './module/getter'
import state from "./module/state";
import mutations from './module/mutations'
export default createStore({
  state,
  mutations,
  actions,
  getters,
});
