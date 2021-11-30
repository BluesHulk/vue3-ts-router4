import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改

export function getMenuTreeBySystemCode(data) {
  return request({
    url: prefixBs + '/tenant/user/getMenuTreeBySystemCode', //getMenuTreeBySystemCode
    method: 'post',
    data,
  })
}

export function MenuTreeBySystemCode(data) {
  return request({
    url: prefixBs + '/menu/getMenuTreeByRoleCode', //getMenuTreeByRoleCode
    method: 'post',
    data,
  })
}
//组织机构树
// export function departmentDataRuleTree(data) {
//   return request({
//     url: prefixBs + '/departmentDataRule/dataRuleTree',
//     method: 'post',
//     data,
//   })
// }
//组织机构树 传code的
// export function departmentDataRuleTree(data) {
//   return request({
//     url: prefixBs + '/departmentDataRule/getDataRuleTreeByJobCode',
//     method: 'post',
//     data,
//   })
// }

//组织机构树全部的  不传参的
export function departmentDataRuleTree(data) {
  return request({
    url: prefixBs + '/departmentDataRule/getDataRuleTree',
    method: 'post',
    data,
  })
}

//根据岗位获取菜单树
export function getMenuTreeByJobCode(data) {
  return request({
    url: prefixBs + '/menu/getMenuTreeByJobCode',
    method: 'post',
    data,
  })
}

//根据岗位获取菜单树 之后的功能
export function tenantGetFunctionByDeptCode(data) {
  return request({
    url: prefixBs + '/tenant/tenantGetFunctionByDeptCode',
    method: 'post',
    data,
  })
}

//根据组织管理树 编辑
export function departmentDataRuleAdd(data) {
  return request({
    url: prefixBs + '/departmentDataRule/addBatch',
    method: 'post',
    data,
  })
}

//根据组织管理树 编辑
export function departmentToFunc(data) {
  return request({
    url: prefixBs + '/departmentToFunc/addBatch',
    method: 'post',
    data,
  })
}

//查询二级权限规则
export function getFuncRuleLevel(data) {
  return request({
    url: prefixBs + '/departmentFuncRule/getList',
    method: 'post',
    data,
  })
}

//获取岗位信息
export function getUserDept(data) {
  return request({
    url: prefixBs + '/tenant/user/getUserDept',
    method: 'post',
    data,
  })
}

//获取岗位信息
export function getTreeListByTenant(data) {
  return request({
    url: prefixBs + '/system/getTreeListByTenant',
    method: 'post',
    data,
  })
}
