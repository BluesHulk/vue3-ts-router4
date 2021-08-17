// export default {
//   token: (state: { token: any; }) => state.token,
//   refshToken: (state: { refshToken: any; }) => state.refshToken,
//   username: (state: { username: any; }) => state.username,
//   avatar: (state: { avatar: any; }) => state.avatar,
//   routerLink: (state: { routerLink: any; }) => state.routerLink,
//   idIndex: (state: { idIndex: any; }) => state.idIndex,
//   lhUserName: (state: { lhUserName: any; }) => state.lhUserName,
//   lhSysCode: (state: { lhSysCode: any; }) => state.lhSysCode,
//   lhCoCode: (state: { lhCoCode: any; }) => state.lhCoCode,
//   lhCoCodeName: (state: { lhCoCodeName: any; }) => state.lhCoCodeName,
//   localTime: (state: { localTime: any; }) => state.localTime,
//   stepMin: (state: { stepMin: any; }) => state.stepMin,
// }
import { GetterTree } from 'vuex';
// Declare state struct
declare interface globalStore {
  fakeName: string;
  token: string;
  refshToken: string;
  username: string;
  avatar: string;
  routerLink: object;
  router: object;
  idIndex: string | number;
  lhUserName: string;
  lhSysCode: string;
  lhCoCode: string;
  lhCoCodeName: string;
  localTime: string;
  stepMin: string;
  sidebarMenu: object;
  currentMenu: string
  // routerArr: object;
}
const globalStoreGetters: GetterTree<globalStore, any> = {
  token: (state) => state.token,
  refshToken: (state) => state.refshToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  routerLink: (state) => state.routerLink,
  router: (state) => state.router,
  idIndex: (state) => state.idIndex,
  lhUserName: (state) => state.lhUserName,
  lhSysCode: (state) => state.lhSysCode,
  lhCoCode: (state) => state.lhCoCode,
  lhCoCodeName: (state) => state.lhCoCodeName,
  localTime: (state) => state.localTime,
  stepMin: (state) => state.stepMin,
  // routerArr: (state) => state.routerArr,
};
export default globalStoreGetters