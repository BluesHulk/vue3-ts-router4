import { storage, tokenTableName } from '@/config'
import cookie from 'js-cookie'
const refreshTokenKey = 'LH_REFRESH_TOKEN'
/**
 * @description 获取token
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getToken() {
  // debugger
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(tokenTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(tokenTableName)
    } else if ('cookie' === storage) {
      return cookie.get(tokenTableName)
    } else {
      return localStorage.getItem(tokenTableName)
    }
  } else {
    return localStorage.getItem(tokenTableName)
  }
}

/**
 * @description 存储token
 * @param token
 * @returns {void|*}
 */
export function setToken(token: string) {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(tokenTableName, token)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(tokenTableName, token)
    } else if ('cookie' === storage) {
      return cookie.set(tokenTableName, token)
    } else {
      return localStorage.setItem(tokenTableName, token)
    }
  } else {
    return localStorage.setItem(tokenTableName, token)
  }
}

/**
 * @description 移除token
 * @returns {void|Promise<void>}
 */
export function removeToken() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(tokenTableName)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove(tokenTableName)
    } else {
      return localStorage.removeItem(tokenTableName)
    }
  } else {
    return localStorage.removeItem(tokenTableName)
  }
}

/**
 * @description 获取lhUserName
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getlhUserName() {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.getItem('lhUserName')
    }
  } else {
    return localStorage.getItem('lhUserName')
  }
}

/**
 * @description 存储lhUserName
 * @param lhUserName
 * @returns {void|*}
 */
export function setlhUserName(lhUserName: string) {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.setItem('lhUserName', lhUserName)
    }
  } else {
    return localStorage.setItem('lhUserName', lhUserName)
  }
}

/**
 * @description 移除lhUserName
 * @returns {void|Promise<void>}
 */
export function removelhUserName() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('lhUserName')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove('lhUserName')
    } else {
      return localStorage.removeItem('lhUserName')
    }
  } else {
    return localStorage.removeItem('lhUserName')
  }
}

/**
 * @description 获取lhSysCode
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getlhSysCode() {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.getItem('lhSysCode')
    }
  } else {
    return localStorage.getItem('lhSysCode')
  }
}

/**
 * @description 存储lhSysCode
 * @param lhSysCode
 * @returns {void|*}
 */
export function setlhSysCode(lhSysCode: string) {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.setItem('lhSysCode', lhSysCode)
    }
  } else {
    return localStorage.setItem('lhSysCode', lhSysCode)
  }
}

/**
 * @description 移除lhSysCode
 * @returns {void|Promise<void>}
 */
export function removelhSysCode() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('lhSysCode')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove('lhSysCode')
    } else {
      return localStorage.removeItem('lhSysCode')
    }
  } else {
    return localStorage.removeItem('lhSysCode')
  }
}

/**
 * @description 获取lhCoCode
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getlhCoCode() {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.getItem('lhCoCode')
    }
  } else {
    return localStorage.getItem('lhCoCode')
  }
}

/**
 * @description 存储lhCoCode
 * @param lhCoCode
 * @returns {void|*}
 */
export function setlhCoCode(lhCoCode: string) {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.setItem('lhCoCode', lhCoCode)
    }
  } else {
    return localStorage.setItem('lhCoCode', lhCoCode)
  }
}

/**
 * @description 移除lhCoCode
 * @returns {void|Promise<void>}
 */
export function removelhCoCode() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('lhCoCode')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove('lhCoCode')
    } else {
      return localStorage.removeItem('lhCoCode')
    }
  } else {
    return localStorage.removeItem('lhCoCode')
  }
}

/**
 * @description 获取lhCoCodeName
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getlhCoCodeName() {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.getItem('lhCoCodeName')
    }
  } else {
    return localStorage.getItem('lhCoCodeName')
  }
}

/**
 * @description lhCoCodeName
 * @param lhCoCodeName
 * @returns {void|*}
 */
export function setlhCoCodeName(lhCoCodeName: string) {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.setItem('lhCoCodeName', lhCoCodeName)
    }
  } else {
    return localStorage.setItem('lhCoCodeName', lhCoCodeName)
  }
}

/**
 * @description 移除lhCoCode
 * @returns {void|Promise<void>}
 */
export function removelhCoCodeName() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('lhCoCodeName')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove('lhCoCodeName')
    } else {
      return localStorage.removeItem('lhCoCodeName')
    }
  } else {
    return localStorage.removeItem('lhCoCodeName')
  }
}

export function getRefreshToken() {
  return window.localStorage.getItem(refreshTokenKey)
}

export function setRefreshToken(token: string) {
  window.localStorage.setItem(refreshTokenKey, token)
}

export function removeRefreshToken() {
  return window.localStorage.removeItem(refreshTokenKey)
}

/**
 * @description 获取LocalTime
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getLocalTime() {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.getItem('LocalTime')
    }
  } else {
    return localStorage.getItem('LocalTime')
  }
}

/**
 * @description 存储LocalTime
 * @param LocalTime
 * @returns {void|*}
 */
export function setLocalTime(LocalTime: string) {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.setItem('LocalTime', LocalTime)
    }
  } else {
    return localStorage.setItem('LocalTime', LocalTime)
  }
}

/**
 * @description 移除LocalTime
 * @returns {void|Promise<void>}
 */
export function removeLocalTime() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('LocalTime')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove('LocalTime')
    } else {
      return localStorage.removeItem('LocalTime')
    }
  } else {
    return localStorage.removeItem('LocalTime')
  }
}

/**
 * @description 获取TimeStep
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getTimeStep() {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.getItem('TimeStep')
    }
  } else {
    return localStorage.getItem('TimeStep')
  }
}

/**
 * @description 存储TimeStep
 * @param TimeStep
 * @returns {void|*}
 */
export function setTimeStep(TimeStep: string) {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.setItem('TimeStep', TimeStep)
    }
  } else {
    return localStorage.setItem('TimeStep', TimeStep)
  }
}

/**
 * @description 移除TimeStep
 * @returns {void|Promise<void>}
 */
export function removeTimeStep() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('TimeStep')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove('TimeStep')
    } else {
      return localStorage.removeItem('TimeStep')
    }
  } else {
    return localStorage.removeItem('TimeStep')
  }
}

/**
 * @description 获取ButtonsKey
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getButtonsKey() {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.getItem('BUTTONS')
    }
  } else {
    return localStorage.getItem('BUTTONS')
  }
}

/**
 * @description 存储ButtonsKey
 * @param ButtonsKey
 * @returns {void|*}
 */
export function setButtonsKey(ButtonsKey: string) {
  if (storage) {
    if ('localStorage' === storage) {
      return sessionStorage.setItem('BUTTONS', ButtonsKey)
    }
  } else {
    return localStorage.setItem('BUTTONS', ButtonsKey)
  }
}

/**
 * @description 移除ButtonsKey
 * @returns {void|Promise<void>}
 */
export function removeButtonsKey() {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem('BUTTONS')
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else if ('cookie' === storage) {
      return cookie.remove('BUTTONS')
    } else {
      return localStorage.removeItem('BUTTONS')
    }
  } else {
    return localStorage.removeItem('BUTTONS')
  }
}
