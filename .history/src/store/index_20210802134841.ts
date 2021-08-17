// import { createStore } from "vuex";
// import actions from "./module/action";
// import globalStoreGetters from './module/getter'
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
  token: string;
  refshToken: string;
  username: string;
  avatar: string;
  routerLink: object;
  idIndex: string | number;
  lhUserName: string;
  lhSysCode: string;
  lhCoCode: string;
  lhCoCodeName: string;
  localTime: string;
  stepMin: string;
}

// Define All params of StoreOptions
// const globalStoreState: globalStore = {
//   fakeName: 'Fake Name',
// };

// const globalStoreGetters: GetterTree<globalStore, any> = {
//   fakeName: (state) => state.fakeName,
// };
const globalStoreGetters: GetterTree<globalStore, any> = {
  token: (state) => state.token,
  refshToken: (state) => state.refshToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  routerLink: (state) => state.routerLink,
  idIndex: (state) => state.idIndex,
  lhUserName: (state) => state.lhUserName,
  lhSysCode: (state) => state.lhSysCode,
  lhCoCode: (state) => state.lhCoCode,
  lhCoCodeName: (state) => state.lhCoCodeName,
  localTime: (state) => state.localTime,
  stepMin: (state) => state.stepMin,
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
