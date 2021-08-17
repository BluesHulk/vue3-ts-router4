
import { createStore } from "vuex";
import actions from "./module/action";
import getters from "./module/getter";
import mutations from "./module/mutations";
import state from "./module/state";
export default createStore({
  state,
  mutations,
  actions,
  getters,
});
