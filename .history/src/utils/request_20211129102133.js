import axios from "axios";
import qs from "qs";
import {
  baseURL,
  contentType,
  requestTimeout,
  statusName,
  successCode,
  /* tokenName, */
} from "../config/index.js";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { isArray } from "./validate.js";
import store from "../store";
let loadingInstance;
// 操作正常Code数组
// console.log(store);
const codeVerificationArray = isArray(successCode)
  ? [...successCode]
  : [...[successCode]];

const handleData = ({ config, data, status, statusText }) => {
  if (loadingInstance) loadingInstance.close();
  // 若data.code存在，覆盖默认code
  let code = data && data[statusName] ? data[statusName] : status;
  // 若code属于操作正常code，则status修改为200
  if (codeVerificationArray.indexOf(data[statusName]) + 1) code = 200;
  switch (code) {
    case 200:
      return data ? { ...data, code } : data;
  }
};

/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL,
  timeout: requestTimeout,
  headers: {
    "Content-Type": contentType,
  },
});

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    const token = store.getters["user/token"];
    const lhUserName = store.getters["user/lhUserName"];
    const lhSysCode = store.getters["user/lhSysCode"];
    const lhCoCode = store.getters["user/lhCoCode"];
    const lhTenantCode = store.getters["user/lhTenantCode"];
    const deptCoCode = store.getters["user/deptCoCode"];
    // 不规范写法 可根据setting.config.js tokenName配置随意自定义headers
    // if (token) config.headers[tokenName] = token
    // 规范写法 不可随意自定义
    if (token) {
      // config.headers['Authorization'] = `Bearer ${token}`
      config.headers["lhToken"] = `${token}`;
    }
    if (lhUserName) {
      config.headers["lhUserName"] = lhUserName;
    }
    if (lhCoCode) {
      config.headers["lhCoCode"] = lhCoCode;
    }
    if (deptCoCode) {
      config.headers["lhDeptCode"] = deptCoCode;
    }
    if (lhTenantCode) {
      config.headers["lhTenantCode"] = lhTenantCode;
    }
    if (lhSysCode) {
      config.headers["lhSysCode"] = lhSysCode;
    }

    if (
      config.data &&
      config.headers["Content-Type"] ===
        "application/x-www-form-urlencoded;charset=UTF-8"
    )
      config.data = qs.stringify(config.data);
    if (debounce.some((item) => config.url.includes(item)))
      loadingInstance = Vue.prototype.$baseLoading();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
/**
 * @description axios响应拦截器
 */

instance.interceptors.response.use(
  (response) => {
    // const localTime = store.getters.localTime;
    // const stepMin = store.getters.stepMin;
    // const refshToken = store.getters.refshToken;
    // const lhUserName = store.getters.lhUserName;
    return handleData(response);
  },
  (error) => {
    const { response } = error;
    if (response === undefined) {
      return {};
    } else return handleData(response);
  }
);

export default instance;
