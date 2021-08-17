import { createStore } from "vuex";
import action from "./module/action";
import getter from "./module/getter";
import mutations from "./module/mutations";
export default createStore({
  state,
  mutations,
  action,
  getter,
});
