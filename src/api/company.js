import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改
/**
 * @description 企业管理接口
 */
//查询企业
export function getCompanyList(data) {
  return request({
    url: prefixBs + '/company/query',
    method: 'post',
    data,
  })
}
//根据公司类型查询公司
export function getCompanyListBySendcons(data) {
  return request({
    url: prefixBs + '/company/queryBySendcons',
    method: 'post',
    data,
  })
}
//新增企业
export function addCompany(data) {
  return request({
    url: prefixBs + '/company/add',
    method: 'post',
    data,
  })
}
//修改企业
export function editCompany(data) {
  return request({
    url: prefixBs + '/company/edit',
    method: 'post',
    data,
  })
}
//删除企业
export function delCompany(data) {
  return request({
    url: prefixBs + '/company/delete',
    method: 'post',
    data,
  })
}
//修改企业状态
export function updateCompanyStatus(data) {
  return request({
    url: prefixBs + '/company/updateStatus',
    method: 'post',
    data,
  })
}
//获取系统
export function getSystem(data) {
  return request({
    url: prefixBs + '/system/getTreeList',
    method: 'post',
    data,
  })
}
//修改企业绑定系统
export function updateCompanySystem(data) {
  return request({
    url: prefixBs + '/company/companyBindingSystem',
    method: 'post',
    data,
  })
}
