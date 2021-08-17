import request from '@/utils/request'
import { prefixBusiness } from '@/config' //接口前缀的名称 会更改
/**
 * @description 出厂通知单管理接口
 */
//查询出厂通知单
export function getOutFacInformedList(data) {
  return request({
    url: prefixBusiness + '/co/outFacInformed/query',
    method: 'post',
    data,
  })
}
//新增出厂通知单
export function addOutFacInformed(data) {
  return request({
    url: prefixBusiness + '/co/outFacInformed/add',
    method: 'post',
    data,
  })
}
//修改出厂通知单
export function editOutFacInformed(data) {
  return request({
    url: prefixBusiness + '/co/outFacInformed/update',
    method: 'post',
    data,
  })
}
//删除出厂通知单
export function delOutFacInformed(data) {
  return request({
    url: prefixBusiness + '/co/outFacInformed/delete',
    method: 'post',
    data,
  })
}
//审核通过出厂单
export function delOutFacInformedVaild(data) {
  return request({
    url: prefixBusiness + '/co/outFacInformed/valid',
    method: 'post',
    data,
  })
}
//审核不通过出厂单
export function delOutFacInformedInVaild(data) {
  return request({
    url: prefixBusiness + '/co/outFacInformed/inValid',
    method: 'post',
    data,
  })
}
//启用出厂单
export function openOutFacInformed(data) {
  return request({
    url: prefixBusiness + '/co/outFacInformed/open',
    method: 'post',
    data,
  })
}
//禁用出厂单
export function closeOutFacInformed(data) {
  return request({
    url: prefixBusiness + '/co/outFacInformed/close',
    method: 'post',
    data,
  })
}
