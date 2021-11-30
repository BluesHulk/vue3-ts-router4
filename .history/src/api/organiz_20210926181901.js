import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改
//DeptController 部门控制层
//根据公司获取销售区域树
export function getDeptTreeByCoCode(data) {
  return request({
    url: prefixBs + '/dept/getDeptTreeByCoCode',
    method: 'post',
    data,
  })
}
export function getDeptAdd(data) {
  return request({
    url: prefixBs + '/dept/add',
    method: 'post',
    data,
  })
}
export function getDeptDel(data) {
  return request({
    url: prefixBs + '/dept/delete',
    method: 'post',
    data,
  })
}
export function getDeptEdit(data) {
  return request({
    url: prefixBs + '/dept/edit',
    method: 'post',
    data,
  })
}
//获取部门详情
export function getDeptDetail(data) {
  return request({
    url: prefixBs + '/dept/detail',
    method: 'post',
    data,
  })
}
//组织机构企业列表
export function queryByOrganization(data) {
  return request({
    url: prefixBs + '/tenantOrganization/queryByOrganization',
    method: 'post',
    data,
  })
}

//组织机构部门列表
export function queryByDepartment(data) {
  return request({
    url: prefixBs + '/tenantOrganization/queryByDepartment',
    method: 'post',
    data,
  })
}
//组织机构用户列表
export function queryByBindingList(data) {
  return request({
    url: prefixBs + '/tenantOrganization/queryByBindingList',
    method: 'post',
    data,
  })
}
//组织机构岗位列表
export function queryByStation(data) {
  return request({
    url: prefixBs + '/tenantOrganization/queryByStation',
    method: 'post',
    data,
  })
}
//组织机构未绑定用户列表
export function queryByUnindingList(data) {
  return request({
    url: prefixBs + '/tenantOrganization/queryByUnindingList',
    method: 'post',
    data,
  })
}
//岗位详情
export function stationDetail(data) {
  return request({
    url: prefixBs + '/tenantOrganization/stationDetail',
    method: 'post',
    data,
  })
}
//组织机构岗位绑定用户
export function userBind(data) {
  return request({
    url: prefixBs + '/tenantOrganization/userBind',
    method: 'post',
    data,
  })
}
//组织机构岗位解绑用户
export function userUnbind(data) {
  return request({
    url: prefixBs + '/tenantOrganization/userUnbind',
    method: 'post',
    data,
  })
}
//查询企业不分页
export function getCompanyList(data) {
  return request({
    url: prefixBs + '/tenantOrganization/getCompanyList',
    method: 'post',
    data,
  })
}
//编辑岗位
export function editStation(data) {
  return request({
    url: prefixBs + '/tenantOrganization/editStation',
    method: 'post',
    data,
  })
}
//组织机构部门-岗位启用禁用
export function editDeptStatus(data) {
  return request({
    url: prefixBs + '/tenantOrganization/editDeptStatus',
    method: 'post',
    data,
  })
}
//新增岗位
export function addStation(data) {
  return request({
    url: prefixBs + '/tenantOrganization/addStation',
    method: 'post',
    data,
  })
}

//查询角色不分页
export function getRoleList(data) {
  return request({
    url: prefixBs + '/tenantOrganization/getRoleList',
    method: 'post',
    data,
  })
}
