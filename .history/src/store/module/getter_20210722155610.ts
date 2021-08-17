export default {
  token: (state: { token: any; }) => state.token,
  refshToken: (state: { refshToken: any; }) => state.refshToken,
  username: (state: { username: any; }) => state.username,
  avatar: (state: { avatar: any; }) => state.avatar,
  routerLink: (state: { routerLink: any; }) => state.routerLink,
  idIndex: (state: { idIndex: any; }) => state.idIndex,
  lhUserName: (state: { lhUserName: any; }) => state.lhUserName,
  lhSysCode: (state) => state.lhSysCode,
  lhCoCode: (state) => state.lhCoCode,
  lhCoCodeName: (state) => state.lhCoCodeName,
  localTime: (state) => state.localTime,
  stepMin: (state) => state.stepMin,
}