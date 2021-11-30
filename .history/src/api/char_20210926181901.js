import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改
export function rolePageList(data) {
  return request({
    url: prefixBs + '/tenant/role/query',
    method: 'post',
    data,
  })
}
export function roleEdit(data) {
  return request({
    url: prefixBs + '/tenant/role/edit',
    method: 'post',
    data,
  })
}
export function roleAdd(data) {
  return request({
    url: prefixBs + '/tenant/role/add',
    method: 'post',
    data,
  })
}

export function roleDel(data) {
  return request({
    url: prefixBs + '/tenant/role/del',
    method: 'post',
    data,
  })
}

export function addRoleMenu(data) {
  return request({
    url: prefixBs + '/tenant/role/addRoleMenu',
    method: 'post',
    data,
  })
}

export function getFunctionTreeByMenuCode(data) {
  return request({
    url: prefixBs + '/function/tenantGetFunctionTreeByMenuCode',
    method: 'post',
    data,
  })
}

export function addRoleMenuFunc(data) {
  return request({
    url: prefixBs + '/menu/addRoleMenu',
    method: 'post',
    data,
  })
}
// 保存功能权限
export function addRoleMenuFunction(data) {
  return request({
    url: prefixBs + '/menu/addRoleMenuFunction',
    method: 'post',
    data,
  })
}
