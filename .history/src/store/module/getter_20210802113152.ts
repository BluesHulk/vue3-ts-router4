export default {
  token: (state: { token: any; }) => state.token,
  refshToken: (state: { refshToken: any; }) => state.refshToken,
  username: (state: { username: any; }) => state.username,
  avatar: (state: { avatar: any; }) => state.avatar,
  routerLink: (state: { routerLink: any; }) => state.routerLink,
  idIndex: (state: { idIndex: any; }) => state.idIndex,
  lhUserName: (state: { lhUserName: any; }) => state.lhUserName,
  lhSysCode: (state: { lhSysCode: any; }) => state.lhSysCode,
  lhCoCode: (state: { lhCoCode: any; }) => state.lhCoCode,
  lhCoCodeName: (state: { lhCoCodeName: any; }) => state.lhCoCodeName,
  localTime: (state: { localTime: any; }) => state.localTime,
  stepMin: (state: { stepMin: any; }) => state.stepMin,
}
const globalStoreGetters: GetterTree<globalStore, any> = {
  fakeName: (state) => state.fakeName,
};