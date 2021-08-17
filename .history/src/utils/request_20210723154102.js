import axios from "axios";
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
import { useStore } from '@/store'
let loadingInstance;
console.log(store);
// 操作正常Code数组
const codeVerificationArray = isArray(successCode)
  ? [...successCode]
  : [...[successCode]];

const handleData = ({ config, data, status, statusText }) => {
  if (loadingInstance) loadingInstance.close();
  // 若data.code存在，覆盖默认code
  let code = data && data[statusName] ? data[statusName] : status;
  // 若code属于操作正常code，则status修改为200
  if (codeVerificationArray.indexOf(data[statusName]) + 1) code = 200;
  console.log(config);
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
