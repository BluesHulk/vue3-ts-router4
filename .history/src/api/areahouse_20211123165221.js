import request from "../utils/request";
import { prefixBs } from "../config"; //接口前缀的名称 会更改
/**
 * @description 仓库区域管理接口
 */
//查询仓库区域
export function getAreahouseList(data) {
  return request({
    url: prefixBs + "/areahouse/query",
    method: "post",
    data,
  });
}
//新增仓库区域
export function addAreahouse(data) {
  return request({
    url: prefixBs + "/areahouse/add",
    method: "post",
    data,
  });
}
//修改仓库区域
export function editAreahouse(data) {
  return request({
    url: prefixBs + "/areahouse/update",
    method: "post",
    data,
  });
}
//删除仓库区域
export function delAreahouse(data) {
  return request({
    url: prefixBs + "/areahouse/del",
    method: "post",
    data,
  });
}
//查询仓库区域详情
export function getProductDetail(data) {
  return request({
    url: prefixBs + "/areahouse/detail",
    method: "post",
    data,
  });
}

//查询仓库区域不分页
export function AreahouseList(data) {
  return request({
    url: prefixBs + "/areahouse/getList",
    method: "post",
    data,
  });
}
