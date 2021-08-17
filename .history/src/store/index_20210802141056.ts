import globalStoreActions from "./module/action";
import globalStoreGetters from './module/getter'
import globalStoreState from "./module/state";
import globalStore from './module/declare'
import globalStoreMutations from './module/mutations'
import { InjectionKey } from 'vue';
import { createStore, Store, StoreOptions } from 'vuex';

const globalStoreOption: StoreOptions<globalStore> = {
  state: globalStoreState,
  getters: globalStoreGetters,
  mutations: globalStoreMutations,
  actions: globalStoreActions,
};

// Defind current store key
export const globalStoreKey: InjectionKey<Store<globalStore>> = Symbol();

export const store = createStore<globalStore>(globalStoreOption);
