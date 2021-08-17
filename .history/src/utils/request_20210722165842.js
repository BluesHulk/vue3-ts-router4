import axios from "axios";
import qs from "qs";
import { isArray } from "@/utils/validate";
let loadingInstance: { close: () => void; };
const baseURL = process.env.NODE_ENV === "development" ? "" : "";
const contentType = "application/json;charset=UTF-8"
// 最长请求时间
const requestTimeout = 10000
// 操作正常code，支持String、Array、int多种类型
const successCode = [200, 0, "200", "0"]
// 数据状态的字段名称
const statusName = "code"
// 操作正常Code数组
const codeVerificationArray = isArray(successCode)
  ? [...successCode]
  : [...[successCode]];

const handleData = (data: any, status: any) => {
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
    if (
      config.data &&
      config.headers["Content-Type"] ===
      "application/x-www-form-urlencoded;charset=UTF-8"
    )
      config.data = qs.stringify(config.data);
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
    return handleData(response.data, response.status);
  },
  (error) => {
    const { response } = error;
    if (response === undefined) {
      return {};
    } else {
      console.log(response);
      return handleData(response.data, response.status);
    }
  }
);

export default instance;
