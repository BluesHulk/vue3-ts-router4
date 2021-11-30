import { storage, tokenTableName } from "../config/index.js";
import { storage, tokenTableName, storages } from "@/config";
import cookie from "js-cookie";
const refreshTokenKey = "LH_REFRESH_TOKEN";
/**
 * @description 获取token
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getToken() {
  // debugger
  if (storages) {
    if ("localStorage" === storages) {
      return localStorage.getItem(tokenTableName);
    } else if ("sessionStorage" === storages) {
      return sessionStorage.getItem(tokenTableName);
    } else if ("cookie" === storages) {
      return cookie.get(tokenTableName);
    } else {
      return localStorage.getItem(tokenTableName);
    }
  } else {
    return localStorage.getItem(tokenTableName);
  }
}

/**
 * @description 存储token
 * @param token
 * @returns {void|*}
 */
export function setToken(token) {
  if (storages) {
    if ("localStorage" === storages) {
      return localStorage.setItem(tokenTableName, token);
    } else if ("sessionStorage" === storages) {
      return sessionStorage.setItem(tokenTableName, token);
    } else if ("cookie" === storages) {
      return cookie.set(tokenTableName, token);
    } else {
      return localStorage.setItem(tokenTableName, token);
    }
  } else {
    return localStorage.setItem(tokenTableName, token);
  }
}

/**
 * @description 移除token
 * @returns {void|Promise<void>}
 */
export function removeToken() {
  if (storages) {
    if ("localStorage" === storages) {
      return localStorage.removeItem(tokenTableName);
    } else if ("sessionStorage" === storages) {
      return sessionStorage.clear();
    } else if ("cookie" === storages) {
      return cookie.remove(tokenTableName);
    } else {
      return localStorage.removeItem(tokenTableName);
    }
  } else {
    return localStorage.removeItem(tokenTableName);
  }
}

/**
 * @description 获取lhUserName
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getlhUserName() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("lhUserName");
    }
  } else {
    return localStorage.getItem("lhUserName");
  }
}

/**
 * @description 存储lhUserName
 * @param lhUserName
 * @returns {void|*}
 */
export function setlhUserName(lhUserName) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("lhUserName", lhUserName);
    }
  } else {
    return localStorage.setItem("lhUserName", lhUserName);
  }
}

/**
 * @description 移除lhUserName
 * @returns {void|Promise<void>}
 */
export function removelhUserName() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem("lhUserName");
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove("lhUserName");
    } else {
      return localStorage.removeItem("lhUserName");
    }
  } else {
    return localStorage.removeItem("lhUserName");
  }
}

/**
 * @description 获取lhSysCode
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getlhSysCode() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("lhSysCode");
    }
  } else {
    return localStorage.getItem("lhSysCode");
  }
}

/**
 * @description 存储lhSysCode
 * @param lhSysCode
 * @returns {void|*}
 */
export function setlhSysCode(lhSysCode) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("lhSysCode", lhSysCode);
    }
  } else {
    return localStorage.setItem("lhSysCode", lhSysCode);
  }
}

/**
 * @description 移除lhSysCode
 * @returns {void|Promise<void>}
 */
export function removelhSysCode() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem("lhSysCode");
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove("lhSysCode");
    } else {
      return localStorage.removeItem("lhSysCode");
    }
  } else {
    return localStorage.removeItem("lhSysCode");
  }
}

/**
 * @description 获取lhCoCode
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getlhCoCode() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("lhCoCode");
    }
  } else {
    return localStorage.getItem("lhCoCode");
  }
}

/**
 * @description 存储lhCoCode
 * @param lhCoCode
 * @returns {void|*}
 */
export function setlhCoCode(lhCoCode) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("lhCoCode", lhCoCode);
    }
  } else {
    return localStorage.setItem("lhCoCode", lhCoCode);
  }
}

/**
 * @description 移除lhCoCode
 * @returns {void|Promise<void>}
 */
export function removelhCoCode() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem("lhCoCode");
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove("lhCoCode");
    } else {
      return localStorage.removeItem("lhCoCode");
    }
  } else {
    return localStorage.removeItem("lhCoCode");
  }
}

/**
 * @description 获取lhCoCodeName
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getlhCoCodeName() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("lhCoCodeName");
    }
  } else {
    return localStorage.getItem("lhCoCodeName");
  }
}

/**
 * @description lhCoCodeName
 * @param lhCoCodeName
 * @returns {void|*}
 */
export function setlhCoCodeName(lhCoCodeName) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("lhCoCodeName", lhCoCodeName);
    }
  } else {
    return localStorage.setItem("lhCoCodeName", lhCoCodeName);
  }
}

/**
 * @description 获取lhTenantCode
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getlhTenantCode() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("lhTenantCode");
    }
  } else {
    return localStorage.getItem("lhTenantCode");
  }
}

/**
 * @description lhTenantCode
 * @param lhTenantCode
 * @returns {void|*}
 */

export function setlhTenantCode(lhTenantCode) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("lhTenantCode", lhTenantCode);
    }
  } else {
    return localStorage.setItem("lhTenantCode", lhTenantCode);
  }
}

/**
 * @description 移除lhCoCode
 * @returns {void|Promise<void>}
 */
export function removelhCoCodeName() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem("lhCoCodeName");
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove("lhCoCodeName");
    } else {
      return localStorage.removeItem("lhCoCodeName");
    }
  } else {
    return localStorage.removeItem("lhCoCodeName");
  }
}

export function getRefreshToken() {
  return window.localStorage.getItem(refreshTokenKey);
}

export function setRefreshToken(token) {
  window.localStorage.setItem(refreshTokenKey, token);
}

export function removeRefreshToken() {
  return window.localStorage.removeItem(refreshTokenKey);
}

/**
 * @description 获取LocalTime
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getLocalTime() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("LocalTime");
    }
  } else {
    return localStorage.getItem("LocalTime");
  }
}

/**
 * @description 存储LocalTime
 * @param LocalTime
 * @returns {void|*}
 */
export function setLocalTime(LocalTime) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("LocalTime", LocalTime);
    }
  } else {
    return localStorage.setItem("LocalTime", LocalTime);
  }
}

/**
 * @description 移除LocalTime
 * @returns {void|Promise<void>}
 */
export function removeLocalTime() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem("LocalTime");
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove("LocalTime");
    } else {
      return localStorage.removeItem("LocalTime");
    }
  } else {
    return localStorage.removeItem("LocalTime");
  }
}

/**
 * @description 获取TimeStep
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getTimeStep() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("TimeStep");
    }
  } else {
    return localStorage.getItem("TimeStep");
  }
}

/**
 * @description 存储TimeStep
 * @param TimeStep
 * @returns {void|*}
 */
export function setTimeStep(TimeStep) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("TimeStep", TimeStep);
    }
  } else {
    return localStorage.setItem("TimeStep", TimeStep);
  }
}

/**
 * @description 移除TimeStep
 * @returns {void|Promise<void>}
 */
export function removeTimeStep() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem("TimeStep");
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove("TimeStep");
    } else {
      return localStorage.removeItem("TimeStep");
    }
  } else {
    return localStorage.removeItem("TimeStep");
  }
}

/**
 * @description 获取ButtonsKey
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getButtonsKey() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("BUTTONS");
    }
  } else {
    return localStorage.getItem("BUTTONS");
  }
}

/**
 * @description 存储ButtonsKey
 * @param ButtonsKey
 * @returns {void|*}
 */
export function setButtonsKey(ButtonsKey) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("BUTTONS", ButtonsKey);
    }
  } else {
    return localStorage.setItem("BUTTONS", ButtonsKey);
  }
}

/**
 * @description 移除ButtonsKey
 * @returns {void|Promise<void>}
 */
export function removeButtonsKey() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem("BUTTONS");
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove("BUTTONS");
    } else {
      return localStorage.removeItem("BUTTONS");
    }
  } else {
    return localStorage.removeItem("BUTTONS");
  }
}

/**
 * @description 获取lhCoCode
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getlhDeptCode() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("lhDeptCode");
    }
  } else {
    return localStorage.getItem("lhDeptCode");
  }
}

/**
 * @description 存储lhCoCode
 * @param lhDeptCode
 * @returns {void|*}
 */
export function setlhDeptCode(lhDeptCode) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("lhDeptCode", lhDeptCode);
    }
  } else {
    return localStorage.setItem("lhDeptCode", lhDeptCode);
  }
}

/**
 * @description 移除lhCoCode
 * @returns {void|Promise<void>}
 */
export function removelhDeptCode() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem("lhDeptCode");
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove("lhDeptCode");
    } else {
      return localStorage.removeItem("lhDeptCode");
    }
  } else {
    return localStorage.removeItem("lhDeptCode");
  }
}

/**
 * @description 获取ButtonsKey
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getButtonsKeyLevel() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("limitBTN");
    }
  } else {
    return localStorage.getItem("limitBTN");
  }
}

/**
 * @description 存储ButtonsKey
 * @param ButtonsKey
 * @returns {void|*}
 */
export function setButtonsKeyLevel(ButtonsKey) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("limitBTN", ButtonsKey);
    }
  } else {
    return localStorage.setItem("limitBTN", ButtonsKey);
  }
}

/**
 * @description 移除ButtonsKey
 * @returns {void|Promise<void>}
 */
export function removeButtonsKeyLevel() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem("limitBTN");
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove("limitBTN");
    } else {
      return localStorage.removeItem("limitBTN");
    }
  } else {
    return localStorage.removeItem("limitBTN");
  }
}
/**
 * @description 获取fullName
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getFullName() {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.getItem("fullName");
    }
  } else {
    return localStorage.getItem("fullName");
  }
}

/**
 * @description 存储fullName
 * @param ButtonsKey
 * @returns {void|*}
 */
export function setFullName(fullName) {
  if (storage) {
    if ("localStorage" === storage) {
      return sessionStorage.setItem("fullName", fullName);
    }
  } else {
    return localStorage.setItem("fullName", fullName);
  }
}

/**
 * @description 移除fullName
 * @returns {void|Promise<void>}
 */
export function removeFullName() {
  if (storage) {
    if ("localStorage" === storage) {
      return localStorage.removeItem("fullName");
    } else if ("sessionStorage" === storage) {
      return sessionStorage.clear();
    } else if ("cookie" === storage) {
      return cookie.remove("fullName");
    } else {
      return localStorage.removeItem("fullName");
    }
  } else {
    return localStorage.removeItem("fullName");
  }
}
