import request from "../utils/request";
import { prefixBs } from "../config"; //接口前缀的名称 会更改
/**
 * @description 仓库管理接口
 */
//查询仓库
export function getWarehouseList(data) {
  return request({
    url: prefixBs + "/warehouse/query",
    method: "post",
    data,
  });
}
//查询仓库不分页
export function getWarehouseListSaleOrder(data) {
  return request({
    url: prefixBs + "/warehouse/getList",
    method: "post",
    data,
  });
}
//新增仓库
export function addWarehouse(data) {
  return request({
    url: prefixBs + "/warehouse/add",
    method: "post",
    data,
  });
}
//修改仓库
export function editWarehouse(data) {
  return request({
    url: prefixBs + "/warehouse/update",
    method: "post",
    data,
  });
}
//删除仓库
export function delWarehouse(data) {
  return request({
    url: prefixBs + "/warehouse/del",
    method: "post",
    data,
  });
}
