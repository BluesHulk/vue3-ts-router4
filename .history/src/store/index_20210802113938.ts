// import { createStore } from "vuex";
// import actions from "./module/action";
import globalStoreGetters from './module/getter'
import globalStoreState from "./module/state";
// import mutations from './module/mutations'
// export default createStore({
//   state,
//   mutations,
//   actions,
//   getters,
// });
import { InjectionKey } from 'vue';
import { ActionTree, createStore, GetterTree, MutationTree, Store, StoreOptions } from 'vuex';

// Declare state struct
declare interface globalStore {
  fakeName: string;
}

// Define All params of StoreOptions
// const globalStoreState: globalStore = {
//   fakeName: 'Fake Name',
// };

const globalStoreGetters: GetterTree<globalStore, any> = {
  fakeName: (state) => state.fakeName,
};

const globalStoreMutations: MutationTree<globalStore> = {
  UPDATE_FAKE_NAME(state, payload) {
    state.fakeName = payload;
  },
};

const globalStoreActions: ActionTree<globalStore, any> = {
  updateFakeName({ commit }, payload) {
    commit('UPDATE_FAKE_NAME', payload);
  },
};

// Define StoreOptions
const globalStoreOption: StoreOptions<globalStore> = {
  state: globalStoreState,
  getters: globalStoreGetters,
  mutations: globalStoreMutations,
  actions: globalStoreActions,
};

// Defind current store key
export const globalStoreKey: InjectionKey<Store<globalStore>> = Symbol();

export default createStore<globalStore>(globalStoreOption);
