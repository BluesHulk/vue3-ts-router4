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
  lhTenantCode: string;
  lhCoCodeName: string;
  localTime: string;
  stepMin: string;
  sidebarMenu: object;
  currentMenu: string;
}
export default globalStore;
