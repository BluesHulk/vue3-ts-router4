import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改
/**
 * @description 租户管理接口
 */
//查询租户
export function getTenantList(data) {
  return request({
    url: prefixBs + '/tenant/query',
    method: 'post',
    data,
  })
}
//新增租户
export function addTenant(data) {
  return request({
    url: prefixBs + '/tenant/add',
    method: 'post',
    data,
  })
}
//修改租户
export function editTenant(data) {
  return request({
    url: prefixBs + '/tenant/edit',
    method: 'post',
    data,
  })
}
//审核通过
export function auditTenantSuccess(data) {
  return request({
    url: prefixBs + '/tenant/auditSuccess',
    method: 'post',
    data,
  })
}
//审核通过
export function auditTenantFailed(data) {
  return request({
    url: prefixBs + '/tenant/auditFailed',
    method: 'post',
    data,
  })
}
//启用租户
export function activateTenant(data) {
  return request({
    url: prefixBs + '/tenant/activate',
    method: 'post',
    data,
  })
}
//启用租户
export function lockTenant(data) {
  return request({
    url: prefixBs + '/tenant/lock',
    method: 'post',
    data,
  })
}
//租户分配系统
export function bindingTenantSystem(data) {
  return request({
    url: prefixBs + '/tenant/bindingSystem',
    method: 'post',
    data,
  })
}
//租户分配功能
export function bindingTenantFunction(data) {
  return request({
    url: prefixBs + '/tenant/bindingFunction',
    method: 'post',
    data,
  })
}
//租户分配菜单
export function bindingTenantMenu(data) {
  return request({
    url: prefixBs + '/tenant/bindingMenu',
    method: 'post',
    data,
  })
}
//租户分配数据字典
export function bindingTenantItem(data) {
  return request({
    url: prefixBs + '/tenant/bindingItem',
    method: 'post',
    data,
  })
}
//根据菜单获取功能树
export function getFunctionTreeBySystemCode(data) {
  return request({
    // url: prefixBs + '/tenant/getFunctionTreeBySystemCode',
    url: prefixBs + '/tenant/tenantGetFunctionTreeBySystemCode',
    method: 'post',
    data,
  })
}
//根据租户拥有的系统
export function getTenantSystem(data) {
  return request({
    url: prefixBs + '/tenant/getTenantSystem',
    method: 'post',
    data,
  })
}
//根据系统获取菜单
export function getMenuBySystem(data) {
  return request({
    url: prefixBs + '/tenant/getMenuTreeBySystemCode',
    method: 'post',
    data,
  })
}
