import request from "../utils/request";
import { prefixBs } from "../config"; //接口前缀的名称 会更改
/**
 * @description 企业管理接口
 */
//查询企业
export function getCompanyList(data) {
  return request({
    url: prefixBs + "/company/query",
    method: "post",
    data,
  });
}
//根据公司类型查询公司
export function getCompanyListBySendcons(data) {
  return request({
    url: prefixBs + "/company/queryBySendcons",
    method: "post",
    data,
  });
}
//新增企业
export function addCompany(data) {
  return request({
    url: prefixBs + "/company/add",
    method: "post",
    data,
  });
}
//修改企业
export function editCompany(data) {
  return request({
    url: prefixBs + "/company/edit",
    method: "post",
    data,
  });
}
//删除企业
export function delCompany(data) {
  return request({
    url: prefixBs + "/company/delete",
    method: "post",
    data,
  });
}
//修改企业状态
export function updateCompanyStatus(data) {
  return request({
    url: prefixBs + "/company/updateStatus",
    method: "post",
    data,
  });
}
//获取系统
export function getSystem(data) {
  return request({
    url: prefixBs + "/system/getTreeList",
    method: "post",
    data,
  });
}
//修改企业绑定系统
export function updateCompanySystem(data) {
  return request({
    url: prefixBs + "/company/companyBindingSystem",
    method: "post",
    data,
  });
}
//获取企业拥有的系统
export function getCompanySystem(data) {
  return request({
    url: prefixBs + "/company/getCompanySystem",
    method: "post",
    data,
  });
}
//企业分配系统
export function bindingCompanySystem(data) {
  return request({
    url: prefixBs + "/company/bindingSystem",
    method: "post",
    data,
  });
}
//根据系统获取菜单
export function getMenuBySystem(data) {
  return request({
    url: prefixBs + "/menu/getMenuTreeBySystemCode",
    method: "post",
    data,
  });
}
//企业分配菜单
export function bindingCompanyMenu(data) {
  return request({
    url: prefixBs + "/company/bindingMenu",
    method: "post",
    data,
  });
}
//企业分配功能
export function bindingCompanyFunction(data) {
  return request({
    url: prefixBs + "/company/bindingFunction",
    method: "post",
    data,
  });
}
//企业分配功能
export function bindingCompanyItem(data) {
  return request({
    url: prefixBs + "/company/bindingItem",
    method: "post",
    data,
  });
}
//根据菜单获取功能
export function getFunctionTreeBySystenCode(data) {
  return request({
    url: prefixBs + "/company/getFunctionTreeBySystenCode",
    method: "post",
    data,
  });
}
//获取租户拥有系统
export function getTenantSystem(data) {
  return request({
    url: prefixBs + "/company/getTenantSystem",
    method: "post",
    data,
  });
}
//查询水泥厂
export function getListByCompany(data) {
  return request({
    url: prefixBs + "/company/getListByCompany",
    method: "post",
    data,
  });
}

//查询水泥厂 分页
export function queryByCompany(data) {
  return request({
    url: prefixBs + "/company/queryByCompany",
    method: "post",
    data,
  });
}

//查询客户
export function getListByCustomer(data) {
  return request({
    url: prefixBs + "/company/getListByCustomer",
    method: "post",
    data,
  });
}
//查询供应商不分页
export function getListBySupplier(data) {
  return request({
    url: prefixBs + "/company/getListBySupplier",
    method: "post",
    data,
  });
}
