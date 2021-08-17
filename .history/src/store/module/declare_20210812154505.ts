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
  // router: object;
}
export default globalStore