// import { createStore } from "vuex";
import globalStoreActions from "./module/action";
import globalStoreGetters from './module/getter'
import globalStoreState from "./module/state";
import globalStore from './module/declare'
import globalStoreMutations from './module/mutations'
// export default createStore({
//   state,
//   mutations,
//   actions,
//   getters,
// });
import { InjectionKey } from 'vue';
import { ActionTree, createStore, Store, StoreOptions } from 'vuex';

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
